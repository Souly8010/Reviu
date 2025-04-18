const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        console.log('Vérification de la structure de la base de données...');
        
        // Vérifier si la table users existe
        const [tables] = await connection.query('SHOW TABLES LIKE ?', ['users']);
        if (tables.length === 0) {
            console.log('La table users n\'existe pas. Création de la table...');
            await connection.query(`
                CREATE TABLE users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    pseudo VARCHAR(255) NOT NULL,
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
    } catch (error) {
        console.error('Erreur lors de la vérification de la base de données:', error);
    } finally {
        await connection.end();
    }
}

checkDatabase();
