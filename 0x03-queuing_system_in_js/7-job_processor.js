import kue from 'kue';

// Array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Create a function to send notifications
function sendNotification(phoneNumber, message, job, done) {
    // Track progress of the job
    job.progress(0, 100);

    // Check if phoneNumber is blacklisted
    if (blacklistedNumbers.includes(phoneNumber)) {
        // Fail the job with an Error object
        return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    }

    // Track progress to 50%
    job.progress(50, 100);

    // Log sending notification
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

    // Call done to indicate completion
    done();
}

// Create a queue with Kue
const queue = kue.createQueue({
    concurrency: 2 // Process two jobs at a time
});

// Process jobs from the queue
queue.process('push_notification_code_2', 2, (job, done) => {
    // Extract job data
    const { phoneNumber, message } = job.data;

    // Call sendNotification function
    sendNotification(phoneNumber, message, job, done);
});

console.log('Queue processing jobs...');
