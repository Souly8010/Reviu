import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { smoothScrollTo } from '../../utils/scroll';
import { useTranslation } from 'react-i18next';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    password: '',
    passwordConfirm: '',
    google_business_email: '',
    phone_number: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Scroll doux vers le haut de la page quand le composant est monté
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérifier que les mots de passe correspondent
    if (formData.password !== formData.passwordConfirm) {
      setError(t('auth.register.errors.passwordMismatch'));
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Créer une copie sans le champ de confirmation
    const submitData = { ...formData };
    delete submitData.passwordConfirm;
    
    try {
      console.log('Données d\'inscription:', submitData);
      console.log('URL API:', `${API_URL}/api/register`);
      const response = await axios.post(`${API_URL}/api/register`, submitData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 secondes de timeout
      });
      console.log('Réponse du serveur:', response.data);
      
      if (response.data) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', response.data.email || '');
        localStorage.setItem('userPseudo', response.data.pseudo || '');
        localStorage.setItem('userGoogleEmail', response.data.google_business_email || '');
        
        // Déclencher un événement personnalisé pour notifier la Navbar
        window.dispatchEvent(new Event('userLoginChange'));
        
        alert(t('auth.register.registerSuccess'));
        navigate('/');
      }
    } catch (error) {
      console.error('Erreur:', error.message || 'Erreur inconnue');
      
      if (error.code === 'ECONNABORTED') {
        setError(t('auth.register.errors.timeout'));
      } else if (error.code === 'ERR_NETWORK' || !error.response) {
        setError(t('auth.register.errors.network'));
      } else {
        setError(error.response?.data?.message || t('auth.register.errors.default'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <h1>{t('auth.register.title')}</h1>
      <div className="auth-container">
        {error && <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>{error}</div>}
        <form id="inscriptionForm" className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group pseudo-field">
            <label htmlFor="pseudo">{t('auth.register.pseudo')}</label>
            <input
              type="text"
              id="pseudo"
              name="pseudo"
              value={formData.pseudo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t('auth.register.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t('auth.register.password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirm">{t('auth.register.confirmPassword')}</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">{t('auth.register.phoneNumber')}</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="google_business_email">{t('auth.register.googleBusinessEmail')}</label>
            <input
              type="email"
              id="google_business_email"
              name="google_business_email"
              value={formData.google_business_email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
            <button 
              type="submit" 
              className="btn" 
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
              {loading ? t('auth.register.registerInProgress') : t('auth.register.registerButton')}
            </button>
          </div>
        </form>
        <p className="auth-switch">
          {t('auth.register.alreadyAccount')} <Link to="/login">{t('auth.register.loginLink')}</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
