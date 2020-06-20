const express = require('express');
const router = express.Router();
const {isUser, isAdmin} = require('../middlewares/auth');

const clientController = require('./clients');

router.get('/', clientController.getClients);
router.get('/:id', isUser, clientController.getClientById);
router.get('/name/:name', clientController.getClientByName);

module.exports = router;
