import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { smoothScrollTo } from '../../utils/scroll';
import { useTranslation } from 'react-i18next';

// Définir l'URL de l'API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Données de connexion:', formData);
      const response = await axios.post(`${API_URL}/api/login`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 secondes de timeout
      });
      
      if (response.data) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', response.data.email || '');
        localStorage.setItem('userPseudo', response.data.pseudo || '');
        localStorage.setItem('userGoogleEmail', response.data.google_business_email || '');
        
        // Déclencher un événement personnalisé pour notifier la Navbar
        window.dispatchEvent(new Event('userLoginChange'));
        
        alert(t('auth.login.loginSuccess'));
        navigate('/');
      }
    } catch (error) {
      console.error('Erreur:', error.message || 'Erreur inconnue');
      
      if (error.code === 'ECONNABORTED') {
        setError(t('auth.login.errors.timeout'));
      } else if (error.code === 'ERR_NETWORK' || !error.response) {
        setError(t('auth.login.errors.network'));
      } else {
        setError(error.response?.data?.message || t('auth.login.errors.default'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <h1>{t('auth.login.title')}</h1>
      <div className="auth-container">
        <form id="connexionForm" className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="email">{t('auth.login.email')}</label>
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
            <label htmlFor="password">{t('auth.login.password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '15px' }}>
            <Link to="/forgot-password" style={{ color: '#10b981', textDecoration: 'none', fontSize: '0.9rem' }}>
              {t('auth.login.forgotPassword')}
            </Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
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
              {loading ? t('auth.login.loginInProgress') : t('auth.login.loginButton')}
            </button>
          </div>
        </form>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px', marginBottom: '15px' }}>
          <p className="auth-switch">
            {t('auth.login.noAccount')} <Link to="/register" style={{ color: '#3b82f6', fontWeight: 'bold', textDecoration: 'none' }}>{t('auth.login.registerLink')}</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
