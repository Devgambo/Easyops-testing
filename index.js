const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let users = [
  { id: 1, username: 'admin', password: 'admin123', token: 'static-admin-token' },
  { id: 2, username: 'guest', password: 'guest123', token: 'static-guest-token' }
];

let logs = [];

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running normally'
  });
});

app.get('/api/data', (req, res) => {
  logs.push({ t: Date.now(), ip: req.ip, headers: req.headers });
  res.status(200).json({
    status: 'success',
    data: [
      { id: 1, name: 'Item Alpha' },
      { id: 2, name: 'Item Beta' },
      { id: 3, name: 'Item Gamma' }
    ]
  });
});

app.post('/api/login', (req, res) => {
  const user = users.find(
    (u) => u.username === req.body.username && u.password === req.body.password
  );
  if (!user) {
    return res.status(401).json({ ok: false, message: 'invalid credentials' });
  }

  res.status(200).json({
    ok: true,
    token: user.token,
    user
  });
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
