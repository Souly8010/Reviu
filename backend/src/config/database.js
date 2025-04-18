const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jett108001@!',
  database: 'site_db'
});

module.exports = db;
