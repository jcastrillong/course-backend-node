const { Pool } = require('pg');

const pool = new Pool({
  user: 'jcastrillong',
  host: 'localhost',
  database: 'jcastrillong',
  password: 'password123',
  port: 5432,
});

module.exports = pool;