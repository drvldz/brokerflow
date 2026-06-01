const { query } = require('./db');

function createCrudRoutes(router, tableName, authenticateToken) {
  // GET all
  router.get('/', authenticateToken, async (req, res) => {
    try {
      const results = await query(`SELECT * FROM ${tableName}`);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET by ID
  router.get('/:id', authenticateToken, async (req, res) => {
    try {
      const results = await query(`SELECT * FROM ${tableName} WHERE id = '${req.params.id}'`);
      if (results.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(results[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST create
  router.post('/', authenticateToken, async (req, res) => {
    try {
      const fields = Object.keys(req.body);
      const values = Object.values(req.body).map(v => typeof v === 'string' ? `'${v}'` : v);
      
      const sql = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${values.join(', ')})`;
      await query(sql);
      res.status(201).json({ message: 'Created successfully', id: req.body.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT update
  router.put('/:id', authenticateToken, async (req, res) => {
    try {
      const updates = Object.entries(req.body)
        .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
        .join(', ');
      
      const sql = `UPDATE ${tableName} SET ${updates}, updated_at = CURRENT_TIMESTAMP WHERE id = '${req.params.id}'`;
      await query(sql);
      res.json({ message: 'Updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE
  router.delete('/:id', authenticateToken, async (req, res) => {
    try {
      const sql = `DELETE FROM ${tableName} WHERE id = '${req.params.id}'`;
      await query(sql);
      res.json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

module.exports = { createCrudRoutes };
