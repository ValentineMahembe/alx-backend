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

// Function to set hash values in Redis
function createHash() {
    client.hset(
        'HolbertonSchools',
        'Portland',
        50,
        redis.print
    );
    client.hset(
        'HolbertonSchools',
        'Seattle',
        80,
        redis.print
    );
    client.hset(
        'HolbertonSchools',
        'New York',
        20,
        redis.print
    );
    client.hset(
        'HolbertonSchools',
        'Bogota',
        20,
        redis.print
    );
    client.hset(
        'HolbertonSchools',
        'Cali',
        40,
        redis.print
    );
    client.hset(
        'HolbertonSchools',
        'Paris',
        2,
        redis.print
    );
}

// Function to display hash values from Redis
function displayHash() {
    client.hgetall('HolbertonSchools', (err, reply) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(reply);
    });
}

// Call the functions as required
createHash();
displayHash();
