import express from 'express';
import redis from 'redis';
import kue from 'kue';
import { promisify } from 'util';

const app = express();
const port = 1245;
const client = redis.createClient();
const queue = kue.createQueue();

// Function to reserve seats
const reserveSeat = (number) => {
  client.set('available_seats', number);
};

// Function to get current available seats
const getCurrentAvailableSeats = async () => {
  const getAsync = promisify(client.get).bind(client);
  const availableSeats = await getAsync('available_seats');
  return parseInt(availableSeats);
};

// Initialize the number of available seats to 50
reserveSeat(50);

// Initialize reservationEnabled to true
let reservationEnabled = true;

// Route to get the number of available seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: numberOfAvailableSeats.toString() });
});

// Route to reserve a seat
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      res.json({ status: 'Reservation failed' });
    } else {
      res.json({ status: 'Reservation in process' });
    }
  });
});

// Route to process the queue and reserve seats
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });
  const currentAvailableSeats = await getCurrentAvailableSeats();
  if (currentAvailableSeats === 0) {
    reservationEnabled = false;
  } else {
    queue.process('reserve_seat', async (job, done) => {
      const availableSeats = await getCurrentAvailableSeats();
      if (availableSeats >= 1) {
        reserveSeat(availableSeats - 1);
        console.log(`Seat reservation job ${job.id} completed`);
        done();
      } else {
        console.log(`Seat reservation job ${job.id} failed: Not enough seats available`);
        done(new Error('Not enough seats available'));
      }
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
