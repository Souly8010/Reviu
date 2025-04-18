const mysql = require('../config/database');

class Audit {
    static async create(userId, action, details) {
        const query = 'INSERT INTO audits (user_id, action, details, timestamp) VALUES (?, ?, ?, NOW())';
        try {
            const [result] = await mysql.execute(query, [userId, action, details]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getAudits(limit = 100) {
        const query = `
            SELECT a.*, u.username 
            FROM audits a 
            LEFT JOIN users u ON a.user_id = u.id 
            ORDER BY a.timestamp DESC 
            LIMIT ?
        `;
        try {
            const [rows] = await mysql.execute(query, [limit]);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Audit;
