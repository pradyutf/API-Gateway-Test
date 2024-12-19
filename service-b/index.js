const express = require('express');
const app = express();

app.get('/api/service-b', (req, res) => {
  res.json({ message: 'Response from Service B' });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Service B is running on port ${PORT}`);
});
