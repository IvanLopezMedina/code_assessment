const express = require('express');
const router = express.Router();

const clientController = require('./clients');

router.get('/', clientController.getClients);
router.get('/:id', clientController.getClientById);
router.get('/name/:name', clientController.getClientByName);

module.exports = router;
