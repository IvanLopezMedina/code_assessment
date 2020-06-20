const express = require('express');
const router = express.Router();
const {isAdmin} = require('../middlewares/auth');

const policiesController = require('./policies');

router.get('/name/:name', isAdmin, policiesController.getPoliciesByUsername);
router.get('/:id', isAdmin, policiesController.getUserByPolicyNumber);

module.exports = router;
