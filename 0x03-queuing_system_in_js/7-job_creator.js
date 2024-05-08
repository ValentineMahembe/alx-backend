import kue from 'kue';

// Array of jobs data
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  // Add other job objects here...
];

// Create a queue with Kue
const queue = kue.createQueue();

// Loop through the jobs array
jobs.forEach((jobData, index) => {
    // Create a new job for each object in the array
    const job = queue.create('push_notification_code_2', jobData);

    // Log job creation success
    job.on('enqueue', () => {
        console.log(`Notification job created: ${job.id}`);
    });

    // Log job completion
    job.on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
    });

    // Log job failure
    job.on('failed', (err) => {
        console.log(`Notification job ${job.id} failed: ${err}`);
    });

    // Log job progress
    job.on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
    });

    // Save the job to the queue
    job.save();
});

console.log('All jobs created and added to the queue.');
