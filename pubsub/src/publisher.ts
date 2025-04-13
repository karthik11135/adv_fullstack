import { createClient } from 'redis';
import express, { urlencoded } from 'express';

const app = express();
app.use(express.json());

const client = createClient({ url: 'redis://127.0.0.1:6379' });

async function connectToRedis() {
  try {
    await client.connect();
    console.log('Connected to the redis container');
    app.listen(3000, function () {
      console.log('Running on port 3000 successfully!');
    });
  } catch (err) {
    console.log('Error occurred in connecting to the database');
  }
}

connectToRedis();

app.post('/publish', async function (req, res) {
  const roomId = req.body.roomId;
  
  const message = req.body.message;

  console.log(roomId, typeof(roomId as string))
  console.log(message)

  try {
    await client.publish((roomId as string), message);
    res.status(200).send("Published successfully")
  } catch (err) {
    console.log('Could not publish to the room', err);
    res.status(400).send("Failed buddy!")
  }
});
