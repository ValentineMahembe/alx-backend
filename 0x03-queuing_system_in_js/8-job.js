import kue from 'kue';

function createPushNotificationsJobs(jobs, queue) {
    // Check if jobs is an array
    if (!Array.isArray(jobs)) {
        throw new Error('Jobs is not an array');
    }

    // Loop through each job in jobs
    jobs.forEach((jobData, index) => {
        // Create a job in the queue push_notification_code_3
        const job = queue.create('push_notification_code_3', jobData);

        // When job is created
        job.on('enqueue', () => {
            console.log(`Notification job created: ${job.id}`);
        });

        // When job is complete
        job.on('complete', () => {
            console.log(`Notification job ${job.id} completed`);
        });

        // When job fails
        job.on('failed', (err) => {
            console.log(`Notification job ${job.id} failed: ${err}`);
        });

        // When job is making progress
        job.on('progress', (progress) => {
            console.log(`Notification job ${job.id} ${progress}% complete`);
        });

        // Save the job to the queue
        job.save();
    });
}

export default createPushNotificationsJobs;
