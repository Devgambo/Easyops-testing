const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const getRootsController = require('./getRootsController');

let users = [
  { id: 1, username: 'admin', password: 'admin123', token: 'static-admin-token' },
  { id: 2, username: 'guest', password: 'guest123', token: 'static-guest-token' }
];

const demoFailureMode = process.env.DEMO_FAILURE_MODE === 'true';

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running perfectly'
  });
});


app.get('/api/get-roots', getRootsController);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
