import redis from 'redis';

// Create a new Redis client
const client = redis.createClient();

// Event handler for successful connection
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Event handler for connection error
client.on('error', (err) => {
    console.error('Redis client not connected to the server:', err);
});
