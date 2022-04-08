const { Client } = require('pg');

const { config } = require("./../config/config");

async function getConnection() {
  const client = new Client({
    user: config.dbUser, 
    host: config.dbHost,
    database: config.dbName,
    password: config.dbPassword,
    port: config.dbPort,
  });
  await client.connect();
  return client;
}

module.exports = getConnection;