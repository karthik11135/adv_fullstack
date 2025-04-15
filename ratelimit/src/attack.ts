import axios from 'axios';


async function attackApp() {
  for (let i = 0; i < 1000; i++) {
    const res = await axios.post('http://localhost:3000/verify_otp', {
      email: 'email@gmail.com',
      otp: 'random',
    });
    console.log('Iteration count ', i);
  }
}

attackApp();

