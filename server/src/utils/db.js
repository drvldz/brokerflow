const { execSync } = require('child_process');

/**
 * Execute a SQL query using the team-db CLI.
 * @param {string} sql - The SQL statement to execute.
 * @returns {Promise<any>} - The parsed JSON result from team-db.
 */
async function query(sql) {
  try {
    // Escape double quotes for the shell command
    const escapedSql = sql.replace(/"/g, '\\"');
    const command = `team-db "${escapedSql}"`;
    const result = execSync(command, { encoding: 'utf8' });
    return JSON.parse(result);
  } catch (error) {
    console.error('Database query error:', error.message);
    throw new Error(error.stdout || error.message);
  }
}

module.exports = { query };
