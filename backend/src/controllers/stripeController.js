// Initialisation de Stripe avec gestion d'erreur
let stripe;
try {
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    console.log('Stripe initialisé avec succès');
  } else {
    console.log('ATTENTION: Clé Stripe non définie - fonctionnalités de paiement désactivées');
    stripe = null;
  }
} catch (error) {
  console.error('Erreur lors de l\'initialisation de Stripe:', error.message);
  stripe = null;
}
const Payment = require('../models/Payment');

const stripeController = {
    createPaymentIntent: async (req, res) => {
        // Si Stripe n'est pas initialisé, renvoyer une erreur
        if (!stripe) {
            return res.status(503).json({ 
                success: false, 
                message: 'Le service de paiement est temporairement indisponible. Veuillez réessayer plus tard.'
            });
        }

        const { paymentMethodId, plan, userId } = req.body;

        try {
            // Créer un client Stripe si l'utilisateur n'existe pas déjà
            const customer = await stripe.customers.create({
                metadata: { userId: userId },
            });

            // Créer un paiement
            const paymentIntent = await stripe.paymentIntents.create({
                amount: getPlanAmount(plan),
                currency: 'eur',
                customer: customer.id,
                payment_method: paymentMethodId,
                confirm: true,
            });

            if (paymentIntent.status === 'succeeded') {
                // Enregistrer le paiement dans la base de données
                await Payment.create({
                    user_id: userId,
                    payment_intent_id: paymentIntent.id,
                    amount: paymentIntent.amount / 100, // Convertir les centimes en euros
                    status: paymentIntent.status,
                    payment_method: 'card'
                });

                // Créer l'abonnement
                const endDate = getSubscriptionEndDate(plan);
                await Payment.createSubscription({
                    user_id: userId,
                    plan: plan,
                    status: 'active',
                    end_date: endDate
                });
                
                res.json({
                    success: true,
                    subscription: {
                        plan: plan,
                        status: 'active',
                        end_date: endDate
                    }
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: 'Le paiement a échoué'
                });
            }
        } catch (error) {
            console.error('Erreur Stripe:', error);
            res.status(500).json({
                success: false,
                error: 'Erreur lors du traitement du paiement'
            });
        }
    },

    // Webhook pour gérer les événements Stripe
    handleWebhook: async (req, res) => {
        // Si Stripe n'est pas initialisé, renvoyer une erreur
        if (!stripe) {
            return res.status(503).json({ 
                success: false, 
                message: 'Le service de paiement est temporairement indisponible.'
            });
        }
        
        const sig = req.headers['stripe-signature'];
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        try {
            const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data.object;
                    const userId = paymentIntent.metadata.userId;
                    await Payment.updateSubscriptionStatus(userId, 'active');
                    break;
                case 'payment_intent.payment_failed':
                    // Gérer l'échec du paiement
                    break;
            }

            res.json({ received: true });
        } catch (err) {
            console.error('Erreur webhook:', err);
            res.status(400).send(`Webhook Error: ${err.message}`);
        }
    }
};

// Fonction pour obtenir le montant du plan
function getPlanAmount(plan) {
    switch (plan) {
        case 'basic':
            return 1000; // 10.00 EUR
        case 'premium':
            return 2000; // 20.00 EUR
        case 'pro':
            return 3000; // 30.00 EUR
        default:
            return 1000;
    }
}

// Fonction pour calculer la date de fin d'abonnement
function getSubscriptionEndDate(plan) {
    const date = new Date();
    switch (plan) {
        case 'basic':
            date.setMonth(date.getMonth() + 1);
            break;
        case 'premium':
            date.setMonth(date.getMonth() + 3);
            break;
        case 'pro':
            date.setMonth(date.getMonth() + 12);
            break;
        default:
            date.setMonth(date.getMonth() + 1);
    }
    return date;
}

module.exports = stripeController;
