const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { createCrudRoutes } = require('../utils/crud');

createCrudRoutes(router, 'commissions', authenticateToken);

// POST /api/commissions/calculate
router.post('/calculate', authenticateToken, (req, res) => {
  const { amount, commissionPercent, brokerSplit } = req.body;
  
  if (!amount || commissionPercent === undefined || brokerSplit === undefined) {
    return res.status(400).json({ error: 'Missing required fields: amount, commissionPercent, brokerSplit' });
  }
  
  const totalCommission = (amount * commissionPercent) / 100;
  const brokerShare = (totalCommission * brokerSplit) / 100;
  const funderShare = totalCommission - brokerShare;
  
  res.json({
    totalCommission,
    brokerShare,
    funderShare
  });
});

module.exports = router;
