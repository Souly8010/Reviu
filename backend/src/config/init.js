const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const dropTableSQL = 'DROP TABLE IF EXISTS users;';
const createTableSQL = `
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  pseudo VARCHAR(255) NOT NULL,
  google_business_email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
const createIndexSQL = 'CREATE INDEX idx_email ON users(email);';

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err);
    process.exit(1);
  }
  console.log('Connecté à MySQL');

  // Exécuter les requêtes en séquence
  db.query(dropTableSQL, (err) => {
    if (err) {
      console.error('Erreur lors de la suppression de la table:', err);
      process.exit(1);
    }
    console.log('Table supprimée avec succès');

    db.query(createTableSQL, (err) => {
      if (err) {
        console.error('Erreur lors de la création de la table:', err);
        process.exit(1);
      }
      console.log('Table créée avec succès');

      db.query(createIndexSQL, (err) => {
        if (err) {
          console.error('Erreur lors de la création de l\'index:', err);
          process.exit(1);
        }
        console.log('Index créé avec succès');
        process.exit(0);
      });
    });
  });
});
