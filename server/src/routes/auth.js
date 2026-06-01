const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { query } = require('../utils/db');
const { JWT_SECRET } = require('../middleware/auth');

router.post('/login', async (req, res) => {
  const { email } = req.body; // Simplified login: just email for now
  
  try {
    const users = await query(`SELECT * FROM users WHERE email = '${email}'`);
    if (users.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    const user = users[0];
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
    
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
