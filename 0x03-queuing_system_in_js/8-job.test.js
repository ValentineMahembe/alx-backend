import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    // Create a Kue queue in test mode with authentication details
    queue = kue.createQueue({
      redis: { port: 6379, host: '127.0.0.1', auth: 'password' },
      testMode: true
    });
  });

  afterEach(() => {
    // Clear the queue and exit test mode after each test
    queue.testMode.clear();
    queue.shutdown(5000, (err) => {
      if (err) {
        console.error('Error shutting down Kue queue:', err);
      } else {
        console.log('Kue shutdown');
      }
    });
  });

  it('display a error message if jobs is not an array', () => {
    // Call createPushNotificationsJobs with a non-array argument
    expect(() => createPushNotificationsJobs('not an array', queue)).to.throw('Jobs is not an array');
  });

  it('create two new jobs to the queue', () => {
    // Define an array of jobs
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 5678 to verify your account',
      },
    ];

    // Call the function to create jobs
    createPushNotificationsJobs(jobs, queue);

    // Expect two jobs to be created
    expect(queue.testMode.jobs.length).to.equal(2);
  });
});
