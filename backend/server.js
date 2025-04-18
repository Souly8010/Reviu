require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  // allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Configuration MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Connexion à MySQL
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err);
    return;
  }
  console.log('Connecté à MySQL');
  
  // Créer la base de données si elle n'existe pas
  db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la base de données:', err);
      return;
    }
    console.log('Base de données créée ou déjà existante');
    
    // Utiliser la base de données
    db.query(`USE ${process.env.DB_NAME}`, (err) => {
      if (err) {
        console.error('Erreur lors de la sélection de la base de données:', err);
        return;
      }
      console.log('Base de données sélectionnée');
      
      // Créer la table users si elle n'existe pas
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          phone_number VARCHAR(20) NOT NULL,
          pseudo VARCHAR(100) NOT NULL,
          google_business_email VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      db.query(createTableQuery, (err) => {
        if (err) {
          console.error('Erreur lors de la création de la table:', err);
        } else {
          console.log('Table users vérifiée avec succès');
        }
      });
    });
  });
});

// Route d'inscription
app.post('/api/register', async (req, res) => {
  const { email, password, phone_number, pseudo, google_business_email } = req.body;
  
  try {
    // Vérifier si l'utilisateur existe déjà
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insérer le nouvel utilisateur
    await db.promise().query(
      'INSERT INTO users (email, password, phone_number, pseudo, google_business_email) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, phone_number, pseudo, google_business_email]
    );
    
    res.status(201).json({ message: 'Inscription réussie' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route de connexion
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Vérifier si l'utilisateur existe
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }
    
    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }
    
    res.json({ 
      message: 'Connexion réussie', 
      email: rows[0].email,
      pseudo: rows[0].pseudo,
      google_business_email: rows[0].google_business_email
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
