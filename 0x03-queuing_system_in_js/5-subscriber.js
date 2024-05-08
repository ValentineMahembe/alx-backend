import redis from 'redis';

// Create a Redis client
const subscriber = redis.createClient();

// Event handler for successful connection
subscriber.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Event handler for connection error
subscriber.on('error', (err) => {
    console.error('Redis client not connected to the server:', err);
});

// Subscribe to the channel 'holberton school channel'
subscriber.subscribe('holberton school channel');

// Event handler for messages received on the subscribed channel
subscriber.on('message', (channel, message) => {
    console.log(message);
    if (message === 'KILL_SERVER') {
        subscriber.unsubscribe();
        subscriber.quit();
    }
});
