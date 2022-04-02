const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    user: 'jcastrillong',
    host: 'localhost',
    database: 'jcastrillong',
    password: 'password123',
    port: 5432,
  });
  await client.connect();
  return client;
}

module.exports = getConnection;