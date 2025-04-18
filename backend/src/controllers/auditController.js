const Audit = require('../models/Audit');

const auditController = {
    getAudits: async (req, res) => {
        try {
            const audits = await Audit.getAudits();
            res.json(audits);
        } catch (error) {
            console.error('Erreur lors de la récupération des audits:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des audits' });
        }
    },

    createAudit: async (req, res) => {
        const { action, details } = req.body;
        const userId = req.user.id;

        try {
            await Audit.create(userId, action, details);
            res.status(201).json({ message: 'Audit enregistré avec succès' });
        } catch (error) {
            console.error('Erreur lors de la création de l\'audit:', error);
            res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'audit' });
        }
    }
};

module.exports = auditController;
