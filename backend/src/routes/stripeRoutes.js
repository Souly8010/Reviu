const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

// Route pour créer un paiement
router.post('/create-payment', stripeController.createPaymentIntent);

// Webhook Stripe
router.post('/webhook', express.raw({type: 'application/json'}), stripeController.handleWebhook);

module.exports = router;
