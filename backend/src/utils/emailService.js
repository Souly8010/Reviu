const nodemailer = require('nodemailer');

// Mode test pour éviter d'envoyer réellement des emails pendant le développement
const TEST_MODE = true; // Mettre à false pour envoyer de vrais emails

// Configuration du transporteur d'emails
const transporter = TEST_MODE ? 
  // Transporteur de test qui simule l'envoi d'emails
  {
    sendMail: (mailOptions) => {
      console.log('MODE TEST ACTIVÉ: L\'email aurait été envoyé avec les détails suivants:');
      console.log('De:', mailOptions.from);
      console.log('À:', mailOptions.to);
      console.log('Sujet:', mailOptions.subject);
      console.log('Lien de réinitialisation inclus dans l\'email');
      
      // Simuler un envoi réussi
      return Promise.resolve({
        messageId: 'test-message-id-' + Date.now(),
        response: 'Test email envoyé avec succès'
      });
    }
  } : 
  // Vrai transporteur SMTP
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'soulaymaneakchiou19@gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'false',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    debug: true,
    logger: true
  });

// Afficher les détails de configuration pour le débogage
console.log('Configuration du transporteur d\'email :', {
  mode: TEST_MODE ? 'TEST (pas d\'envoi réel)' : 'PRODUCTION',
  host: process.env.EMAIL_HOST || 'soulaymaneakchiou19@gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'false',
  user: process.env.EMAIL_USER ? '✓ Défini' : '✗ Non défini',
  pass: process.env.EMAIL_PASS ? '✓ Défini' : '✗ Non défini'
});

/**
 * Envoie un email de réinitialisation de mot de passe
 * @param {string} to - L'adresse email du destinataire
 * @param {string} resetToken - Le token de réinitialisation
 * @returns {Promise} - Une promesse qui se résout lorsque l'email est envoyé
 */
const sendPasswordResetEmail = async (to, resetToken) => {
  console.log(`Tentative d'envoi d'email à : ${to} avec token : ${resetToken.substring(0, 5)}...`);
  
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;
  console.log('URL de réinitialisation :', resetUrl);
  
  const mailOptions = {
    from: `"Reviu" <${process.env.EMAIL_USER || 'noreply@reviu.com'}>`,
    to,
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">Réinitialisation de votre mot de passe</h2>
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe :</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Réinitialiser mon mot de passe
          </a>
        </div>
        <p>Ce lien expirera dans 1 heure.</p>
        <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #666;">
          Reviu - Tous droits réservés
        </p>
      </div>
    `
  };

  console.log('Options d\'email configurées :', { 
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject
  });

  try {
    console.log('Envoi de l\'email en cours...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès: %s', info.messageId);
    
    // Si nous sommes en mode test, afficher l'URL de réinitialisation dans la console
    if (TEST_MODE) {
      console.log('\n==========================================================');
      console.log('LIEN DE RÉINITIALISATION (COPIEZ-LE DANS VOTRE NAVIGATEUR):');
      console.log(resetUrl);
      console.log('==========================================================\n');
    }
    
    return info;
  } catch (error) {
    console.error('Erreur détaillée lors de l\'envoi de l\'email:', error);
    if (error.code) console.error('Code d\'erreur:', error.code);
    if (error.command) console.error('Commande ayant échoué:', error.command);
    if (error.response) console.error('Réponse du serveur SMTP:', error.response);
    throw error;
  }
};

module.exports = {
  sendPasswordResetEmail
};
