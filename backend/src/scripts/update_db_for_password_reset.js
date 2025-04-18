// Script pour ajouter les colonnes reset_token et reset_token_expiry à la table users
require('dotenv').config({ path: '../../.env' });
const db = require('../config/database');
const fs = require('fs');
const path = require('path');

// Lire le contenu du fichier SQL
const sqlFilePath = path.join(__dirname, 'add_reset_token_columns.sql');
const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');

// Connexion à la base de données
console.log('Connexion à la base de données...');
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    process.exit(1);
  }
  console.log('Connecté à la base de données MySQL');

  // Exécuter la requête SQL
  console.log('Exécution de la requête SQL pour ajouter les colonnes...');
  db.query(sqlQuery, (err, result) => {
    if (err) {
      // Si l'erreur indique que les colonnes existent déjà, ce n'est pas grave
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('Les colonnes existent déjà dans la table users.');
      } else {
        console.error('Erreur lors de l\'exécution de la requête SQL:', err);
      }
    } else {
      console.log('Colonnes ajoutées avec succès à la table users!');
    }

    // Fermer la connexion
    console.log('Fermeture de la connexion...');
    db.end(err => {
      if (err) {
        console.error('Erreur lors de la fermeture de la connexion:', err);
      }
      console.log('Connexion fermée');
    });
  });
});
