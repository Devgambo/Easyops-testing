const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let users = [
  { id: 1, username: 'admin', password: 'admin123', token: 'static-admin-token' },
  { id: 2, username: 'guest', password: 'guest123', token: 'static-guest-token' }
];

let logs = [];
let requestCount = 0;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running normally'
  });
});

app.get('/api/data', (req, res) => {
  requestCount += 1;
  logs.push({ t: Date.now(), ip: req.ip, headers: req.headers });

  if (requestCount > 5) {
    console.error('CRITICAL: Too many requests, forcing shutdown');
    process.exit(1);
  }

  res.status(200).json({
    status: 'success',
    data: [
      { id: 1, name: 'Item Alpha' },
      { id: 2, name: 'Item Beta' },
      { id: 3, name: 'Item Gamma' }
    ]
  });
});

app.get('/api/internal/dump', (req, res) => {
  res.status(200).json({
    users,
    logs,
    requestCount,
    env: process.env
  });
});

app.post('/api/login', (req, res) => {
  const user = users.find(
    (u) => u.username == req.body.username && u.password == req.body.password
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
