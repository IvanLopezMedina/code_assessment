const express = require('express');
const bodyParser = require('body-parser');
const client = require('./clients/clients.routes.js');

const app = express();
const port = 3000;

/*app.get('/', async (req, res) => {
  res.data('Hello World');
});*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/clients', client);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`),
);

module.exports = app; // for test purposes
