const express = require('express');
// const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse json requests
app.use(express.json());

// API 1: Healthcheck endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running normally'
  });
});

// API 2: Data endpoint
app.get('/api/data', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: [
      { id: 1, name: 'Item Alpha' },
      { id: 2, name: 'Item Beta' },
      { id: 3, name: 'Item Gamma' }
    ]
  });
});

app.get('/api/data2', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: [
      { id: 1, name: 'Jai shree ram' }
    ]
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
