import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(express.json());


const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false,
    message: "Too many requests" // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// app.use(limiter)

const otpStore: Record<string, string> = {};

app.post('/generate_otp', (req: express.Request, res: express.Response) => {
  const email = req.body.email;
  const otp = Math.floor(Math.random() * 100000) + 100000;
  otpStore[email] = otp.toString();
  res.status(200).json({ otp: otp });
});

app.post('/verify_otp', (req, res) => {
    console.log("Reached verification endpoint")
  const otp = req.body.otp;
  const email = req.body.email;
  if (otp == otpStore[email]) {
    delete otpStore[email];
    res.status(200).send('Success');
  } else {
    console.log("Did not match")
    res.json({message: 'Wrong otp'});
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
