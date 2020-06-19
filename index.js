const express = require('express');
const app = express();
const port = 3000;
const provider = require('./provider');

app.get('/', async (req, res) => {
  let data = await provider.clients;
  res.json(data);
});

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`),
);

module.exports = app; // for test purposes
