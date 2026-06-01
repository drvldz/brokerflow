const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { createCrudRoutes } = require('../utils/crud');

createCrudRoutes(router, 'deals', authenticateToken);

module.exports = router;
