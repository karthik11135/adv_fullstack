import { createClient } from 'redis';

const client = createClient({ url: 'redis://127.0.0.1:6379' });

(async () => {
  try {
    await client.connect();
    console.log('Conneceted to redis');
  } catch (err) {
    console.log('Couldn not connect to redis');
  }
})();

(async () => {
  try {
    await client.subscribe('123', (message) => {
      console.log('Sending to the correct subscriber : ', message);
    });
  } catch (err) {
    console.log('Subscriber failed');
  }
})();
