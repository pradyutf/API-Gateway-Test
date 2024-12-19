const express = require('express');
const app = express();

app.get('/api/service-a', (req, res) => {
  res.json({ message: 'Response from Service A' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Service A is running on port ${PORT}`);
});
