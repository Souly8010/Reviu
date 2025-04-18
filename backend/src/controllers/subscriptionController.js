const TrialManager = require('../utils/trialManager');
const db = require('../config/database');

class SubscriptionController {
  static async startTrial(req, res) {
    const { userId } = req.body;

    try {
      // Vérifier si l'utilisateur a déjà eu une période d'essai
      const existingTrial = await db.query(
        'SELECT * FROM subscriptions WHERE user_id = ? AND plan_type = "trial"',
        [userId]
      );

      if (existingTrial.length > 0) {
        return res.status(400).json({
          error: 'Vous avez déjà utilisé votre période d\'essai'
        });
      }

      // Créer une nouvelle période d'essai
      const trial = TrialManager.createTrialSubscription(userId);
      
      // Sauvegarder dans la base de données
      await db.query(
        `INSERT INTO subscriptions 
        (user_id, plan_type, start_date, end_date, has_professional_access)
        VALUES (?, ?, ?, ?, ?)`,
        [
          trial.userId,
          trial.planType,
          trial.startDate,
          trial.endDate,
          trial.hasProfessionalAccess
        ]
      );

      res.json({
        message: 'Période d\'essai activée avec succès',
        trial
      });
    } catch (error) {
      console.error('Erreur lors de l\'activation de la période d\'essai:', error);
      res.status(500).json({
        error: 'Erreur lors de l\'activation de la période d\'essai'
      });
    }
  }

  static async checkTrialStatus(req, res) {
    const { userId } = req.params;

    try {
      const [subscription] = await db.query(
        'SELECT * FROM subscriptions WHERE user_id = ? AND plan_type = "trial"',
        [userId]
      );

      if (!subscription) {
        return res.json({
          isActive: false,
          message: 'Aucune période d\'essai trouvée'
        });
      }

      const isActive = TrialManager.isTrialActive(subscription);
      const remainingDays = TrialManager.getRemainingDays(subscription);

      res.json({
        isActive,
        remainingDays,
        subscription
      });
    } catch (error) {
      console.error('Erreur lors de la vérification de la période d\'essai:', error);
      res.status(500).json({
        error: 'Erreur lors de la vérification de la période d\'essai'
      });
    }
  }
}

module.exports = SubscriptionController;
