const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { query } = require('../utils/db');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const activeDealsResult = await query(`SELECT COUNT(*) as count FROM deals WHERE status != 'closed' AND status != 'funded'`);
    const totalFundedResult = await query(`SELECT SUM(amount) as total FROM deals WHERE status = 'funded'`);
    const pendingCommissionsResult = await query(`SELECT SUM(total_commission) as total FROM commissions WHERE status = 'pending'`);
    const totalLeadsResult = await query(`SELECT COUNT(*) as count FROM leads`);
    const fundedDealsCountResult = await query(`SELECT COUNT(*) as count FROM deals WHERE status = 'funded'`);

    const activeDeals = activeDealsResult[0]?.count || 0;
    const totalFunded = totalFundedResult[0]?.total || 0;
    const pendingCommissions = pendingCommissionsResult[0]?.total || 0;
    const totalLeads = totalLeadsResult[0]?.count || 0;
    const fundedDealsCount = fundedDealsCountResult[0]?.count || 0;

    const leadConversion = totalLeads > 0 ? (fundedDealsCount / totalLeads) * 100 : 0;

    res.json({
      activeDeals,
      totalFunded,
      pendingCommissions,
      leadConversion: parseFloat(leadConversion.toFixed(2))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
