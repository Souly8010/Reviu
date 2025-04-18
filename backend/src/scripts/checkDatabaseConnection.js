const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkDatabaseConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        console.log('Connexion à MySQL réussie');

        // Vérifier si la base de données existe
        const [databases] = await connection.query('SHOW DATABASES LIKE ?', [process.env.DB_NAME]);
        if (databases.length === 0) {
            console.log('La base de données n\'existe pas. Création de la base de données...');
            await connection.query(`CREATE DATABASE ${process.env.DB_NAME}`);
            console.log('Base de données créée avec succès.');
        }

        // Sélectionner la base de données
        await connection.query(`USE ${process.env.DB_NAME}`);

        // Vérifier si la table users existe
        const [tables] = await connection.query('SHOW TABLES LIKE ?', ['users']);
        if (tables.length === 0) {
            console.log('La table users n\'existe pas. Création de la table...');
            await connection.query(`
                CREATE TABLE users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    pseudo VARCHAR(100) NOT NULL,
                    phone_number VARCHAR(20) NOT NULL,
                    google_business_email VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `);
            console.log('Table users créée avec succès.');
        } else {
            console.log('La table users existe déjà.');
            
            // Vérifier la structure de la table
            const [columns] = await connection.query('DESCRIBE users');
            console.log('Structure de la table users:', columns);
        }

        await connection.end();
        console.log('Connexion fermée avec succès.');
    } catch (error) {
        console.error('Erreur lors de la vérification de la base de données:', error);
    }
}

checkDatabaseConnection();
