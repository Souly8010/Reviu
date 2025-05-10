const mysql = require('mysql2');

// Configuration pour la base de données Hostinger
const db = mysql.createConnection({
  host: 'srv1705.hstgr.io',  // Serveur MySQL Hostinger
  port: 3306,
  user: 'u449192225_souly',
  password: 'Jett108001@!',
  database: 'u449192225_auth'
});

module.exports = db;
