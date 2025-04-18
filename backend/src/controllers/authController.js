const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const { sendPasswordResetEmail } = require('../utils/emailService');

exports.register = (req, res) => {
  const { email, password, pseudo, google_business_email, phone_number } = req.body;
  
  User.findByEmail(email)
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }
      
      bcrypt.hash(password, 10)
        .then(hashedPassword => {
          User.create({
            email,
            password: hashedPassword,
            pseudo,
            google_business_email,
            phone_number
          })
          .then(user => {
            res.status(201).json({
              message: 'Inscription réussie',
              email: user.email,
              pseudo: user.pseudo,
              google_business_email: user.google_business_email
            });
          })
          .catch(error => {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
            res.status(500).json({ message: 'Erreur lors de la création du compte' });
          });
        })
        .catch(error => {
          console.error('Erreur lors du hashage du mot de passe:', error);
          res.status(500).json({ message: 'Erreur lors de la création du compte' });
        });
    })
    .catch(error => {
      console.error('Erreur lors de la vérification de l\'email:', error);
      res.status(500).json({ message: 'Erreur lors de la création du compte' });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  
  User.findByEmail(email)
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }
      
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
          }
          
          res.status(200).json({
            message: 'Connexion réussie',
            email: user.email,
            pseudo: user.pseudo
          });
        })
        .catch(error => {
          console.error('Erreur lors de la comparaison des mots de passe:', error);
          res.status(500).json({ message: 'Erreur lors de la connexion' });
        });
    })
    .catch(error => {
      console.error('Erreur lors de la recherche de l\'utilisateur:', error);
      res.status(500).json({ message: 'Erreur lors de la connexion' });
    });
};

exports.forgotPassword = async (req, res) => {
  try {
    console.log('Réception d\'une demande de réinitialisation de mot de passe:', req.body);
    const { email } = req.body;
    
    if (!email) {
      console.log('Email manquant dans la requête');
      return res.status(400).json({ message: 'L\'adresse email est requise' });
    }

    console.log('Recherche de l\'utilisateur avec l\'email:', email);
    // Vérifier si l'utilisateur existe
    const user = await User.findByEmail(email);
    
    console.log('Utilisateur trouvé:', user ? 'Oui' : 'Non');
    // Si aucun utilisateur n'est trouvé, nous renvoyons quand même un succès pour des raisons de sécurité
    // Cela empêche les attaquants de déterminer quels emails sont enregistrés
    if (!user) {
      return res.status(200).json({ message: 'Si l\'email existe, un lien de réinitialisation a été envoyé.' });
    }
    
    // Générer un token unique
    const token = crypto.randomBytes(32).toString('hex');
    console.log('Token généré:', token.substring(0, 5) + '...');
    
    // Calculer la date d'expiration (1 heure)
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);
    console.log('Date d\'expiration:', expiryDate);
    
    try {
      // Sauvegarder le token dans la base de données
      console.log('Sauvegarde du token dans la base de données pour:', email);
      await User.saveResetToken(email, token, expiryDate);
      console.log('Token sauvegardé avec succès');
      
      // Envoyer l'email de réinitialisation
      console.log('Tentative d\'envoi d\'email...');
      await sendPasswordResetEmail(email, token);
      console.log('Email envoyé avec succès');
      
      res.status(200).json({ message: 'Si l\'email existe, un lien de réinitialisation a été envoyé.' });
    } catch (dbError) {
      console.error('Erreur lors de la sauvegarde du token ou de l\'envoi de l\'email:', dbError);
      throw dbError;
    }
    
  } catch (error) {
    console.error('Erreur détaillée lors de la demande de réinitialisation:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ message: 'Une erreur est survenue lors du traitement de votre demande.' });
  }
};

exports.verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;
    
    // Vérifier si le token existe et est valide
    const user = await User.findByResetToken(token);
    
    if (!user) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Le lien de réinitialisation est invalide ou a expiré.' 
      });
    }
    
    res.status(200).json({ 
      valid: true, 
      message: 'Token valide.' 
    });
    
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    res.status(500).json({ 
      valid: false, 
      message: 'Une erreur est survenue lors de la vérification du token.' 
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    // Vérifier si le token existe et est valide
    const user = await User.findByResetToken(token);
    
    if (!user) {
      return res.status(400).json({ message: 'Le lien de réinitialisation est invalide ou a expiré.' });
    }
    
    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Mettre à jour le mot de passe et supprimer le token
    await User.updatePassword(user.id, hashedPassword);
    
    res.status(200).json({ message: 'Votre mot de passe a été réinitialisé avec succès.' });
    
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la réinitialisation du mot de passe.' });
  }
};
