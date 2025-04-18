const db = require('../config/database');

class Payment {
    static async create(paymentData) {
        const { user_id, payment_intent_id, amount, status, payment_method } = paymentData;
        
        try {
            const [result] = await db.execute(
                'INSERT INTO payments (user_id, payment_intent_id, amount, status, payment_method) VALUES (?, ?, ?, ?, ?)',
                [user_id, payment_intent_id, amount, status, payment_method]
            );
            return result.insertId;
        } catch (error) {
            console.error('Erreur lors de la création du paiement:', error);
            throw error;
        }
    }

    static async createSubscription(subscriptionData) {
        const { user_id, plan, status, end_date } = subscriptionData;
        
        try {
            const [result] = await db.execute(
                'INSERT INTO subscriptions (user_id, plan, status, end_date) VALUES (?, ?, ?, ?)',
                [user_id, plan, status, end_date]
            );
            return result.insertId;
        } catch (error) {
            console.error('Erreur lors de la création de l\'abonnement:', error);
            throw error;
        }
    }

    static async updateSubscriptionStatus(userId, status) {
        try {
            await db.execute(
                'UPDATE subscriptions SET status = ? WHERE user_id = ? AND status = "active"',
                [status, userId]
            );
            return true;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut:', error);
            throw error;
        }
    }

    static async getUserSubscription(userId) {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM subscriptions WHERE user_id = ? AND status = "active"',
                [userId]
            );
            return rows[0];
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'abonnement:', error);
            throw error;
        }
    }
}

module.exports = Payment;
