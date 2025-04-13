import express from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

const client = createClient({ url: 'redis://127.0.0.1:6379' });

app.get('/', function (req, res) {
  console.log('hey there my home point');
  res.send('hellow');
});

app.post('/submit', async function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;

  console.log('Received ', id, name, email);

  try {
    await client.lPush('messageQ', JSON.stringify({ id, name, email }));
    res.status(200).send('Successfully updated in the queue');
  } catch (err) {
    res.status(401).send(err);
  }
});

async function startServer() {
  try {
    await client.connect();
    app.listen(3000, function () {
      console.log('listening on port 3000');
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
