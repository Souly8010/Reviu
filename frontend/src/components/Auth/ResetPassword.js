import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Vérifier la validité du token
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/verify-reset-token/${token}`);
        setTokenValid(response.data.valid);
      } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
        setTokenValid(false);
      } finally {
        setTokenChecked(true);
      }
    };

    if (token) {
      verifyToken();
    }

    // Scroll vers le haut
    window.scrollTo(0, 0);
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation des champs
    if (!formData.password || !formData.confirmPassword) {
      setError('Tous les champs sont obligatoires');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/api/reset-password`, {
        token,
        password: formData.password
      });
      
      setSuccess(true);
      setFormData({
        password: '',
        confirmPassword: ''
      });
      
      // Rediriger vers la page de connexion après 3 secondes
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', err);
      
      if (err.response) {
        setError(err.response.data.message || 'Une erreur est survenue. Veuillez réessayer.');
      } else if (err.request) {
        setError('Impossible de contacter le serveur. Veuillez vérifier votre connexion.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Afficher un message d'erreur si le token est invalide
  if (tokenChecked && !tokenValid) {
    return (
      <section className="auth-section">
        <h1>Réinitialisation de mot de passe</h1>
        <div className="auth-container">
          <div className="error-message" style={{ 
            backgroundColor: '#fee2e2', 
            color: '#ef4444', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <h3>Lien invalide ou expiré</h3>
            <p>Le lien de réinitialisation est invalide ou a expiré. Veuillez demander un nouveau lien.</p>
            <Link 
              to="/forgot-password" 
              style={{ 
                display: 'inline-block', 
                marginTop: '15px',
                color: '#10b981', 
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Demander un nouveau lien
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-section">
      <h1>Réinitialisation de mot de passe</h1>
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
            <h3>Mot de passe réinitialisé !</h3>
            <p>Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion.</p>
          </div>
        ) : (
          <>
            <p style={{ textAlign: 'center', marginBottom: '20px' }}>
              Entrez votre nouveau mot de passe ci-dessous.
            </p>
            {error && <div className="error-message" style={{ color: 'red', margin: '10px 0', textAlign: 'center' }}>{error}</div>}
            <form id="resetPasswordForm" className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="password">Nouveau mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Votre nouveau mot de passe"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirmer votre nouveau mot de passe"
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
                  {loading ? 'Réinitialisation en cours...' : 'Réinitialiser le mot de passe'}
                </button>
              </div>
            </form>
            <p className="auth-switch" style={{ marginTop: '20px' }}>
              <Link to="/login" style={{ color: '#666' }}>Retour à la connexion</Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default ResetPassword;
