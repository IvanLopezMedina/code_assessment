const express = require('express');
const router = express.Router();

const policiesController = require('./policies');

router.get('/', policiesController.getPolicies);
router.get('/name/:name', policiesController.getPoliciesByUsername);
router.get('/:id', policiesController.getUserByPolicyNumber);

module.exports = router;
