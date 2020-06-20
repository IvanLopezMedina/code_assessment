const express = require('express');
const router = express.Router();
const {isUserOrAdmin} = require('../middlewares/auth');

const clientController = require('./clients');

router.get('/:id', isUserOrAdmin, clientController.getClientById);
router.get('/name/:name', isUserOrAdmin, clientController.getClientByName);

module.exports = router;
