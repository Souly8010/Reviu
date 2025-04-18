import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { smoothScrollTo } from '../../utils/scroll';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Scroll doux vers le haut de la page quand le composant est monté
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Veuillez saisir votre adresse email.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Cette API doit être implémentée côté backend
      const response = await axios.post(`${API_URL}/api/forgot-password`, { email });
      setSuccess(true);
      setEmail('');
    } catch (err) {
      console.error('Erreur lors de la demande de réinitialisation:', err);
      
      if (err.response) {
        // La requête a été faite et le serveur a répondu avec un code d'état
        // qui n'est pas dans la plage 2xx
        setError(err.response.data.message || 'Une erreur est survenue. Veuillez réessayer.');
      } else if (err.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        setError('Impossible de contacter le serveur. Veuillez vérifier votre connexion.');
      } else {
        // Quelque chose s'est produit lors de la configuration de la requête
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <h1>Récupération de mot de passe</h1>
      <div className="auth-container">
        {success ? (
          <div className="success-message" style={{ 
            backgroundColor: '#d1fae5', 
            color: '#10b981', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <h3>Email envoyé !</h3>
            <p>Si un compte est associé à cette adresse email, vous recevrez un lien de réinitialisation de mot de passe.</p>
            <Link 
              to="/login" 
              style={{ 
                display: 'inline-block', 
                marginTop: '15px',
                color: '#10b981', 
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Retour à la connexion
            </Link>
          </div>
        ) : (
          <>
            <p style={{ textAlign: 'center', marginBottom: '20px' }}>
              Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe.
            </p>
            {error && <div className="error-message" style={{ color: 'red', margin: '10px 0', textAlign: 'center' }}>{error}</div>}
            <form id="forgotPasswordForm" className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                  placeholder="Votre adresse email"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    minWidth: '200px',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
                </button>
              </div>
            </form>
            <p className="auth-switch" style={{ marginTop: '20px' }}>
              <Link to="/login" style={{ marginRight: '20px', color: '#666' }}>Se connecter</Link>
              <Link to="/register" style={{ color: '#666' }}>S'inscrire</Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
