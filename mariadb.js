async function main() {
  const mariadb = require('mysql2/promise');

  const connection = await mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dateStrings : true
  });
  const dotenv = require('dotenv');
  dotenv.config();
  
  return conn;

  module.exports = connection
}


