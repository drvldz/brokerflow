const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { createCrudRoutes } = require('../utils/crud');

createCrudRoutes(router, 'users', authenticateToken);

module.exports = router;
