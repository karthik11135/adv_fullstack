import { createClient } from 'redis';

const client = createClient({ url: 'redis://127.0.0.1:6379' });

async function connectToRedis() {
  try {
    await client.connect();
  } catch (err) {
    console.log("Couldn't connect to redis");
  }
}

connectToRedis()

async function getData() {
  while (1) {
    const mySubmission = await client.brPop('messageQ', 10);
    console.log(mySubmission);

    await new Promise((res) => setTimeout(res, 1000));
  }
}

getData();
