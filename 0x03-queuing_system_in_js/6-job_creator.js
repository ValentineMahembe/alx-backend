import kue from 'kue';

// Create a job queue named 'push_notification_code'
const queue = kue.createQueue();

// Create an object containing the Job data
const jobData = {
    phoneNumber: '1234567890',
    message: 'This is a test notification message',
};

// Create a job and enqueue it
const job = queue.create('push_notification_code', jobData);

// Event handler for successful job creation
job.on('enqueue', () => {
    console.log(`Notification job created: ${job.id}`);
});

// Event handler for job completion
job.on('complete', () => {
    console.log('Notification job completed');
});

// Event handler for job failure
job.on('failed', () => {
    console.log('Notification job failed');
});

// Save the job to the queue
job.save();
