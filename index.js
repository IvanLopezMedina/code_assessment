const express = require('express');
const bodyParser = require('body-parser');
const client = require('./clients/clients.routes.js');
const policy = require('./policies/policies.routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/clients', client);
app.use('/policies', policy);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`),
);

module.exports = app; // for test purposes
