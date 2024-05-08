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

// Function to set a new school value in Redis
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

// Function to display the value of a school from Redis
function displaySchoolValue(schoolName) {
    client.get(schoolName, (err, reply) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(reply);
    });
}

// Call the functions as required
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
