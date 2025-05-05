import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { scrollToSection } from '../../utils/scroll';
import HamburgerMenu from './HamburgerMenu';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPseudo, setUserPseudo] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Vérifier si on est sur une page d'authentification
  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].some(
    path => location.pathname.startsWith(path)
  );

  // Fonction pour vérifier l'état de connexion
  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const pseudo = localStorage.getItem('userPseudo');
    setIsLoggedIn(loggedIn);
    setUserPseudo(pseudo || '');
  };

  useEffect(() => {
    // Initialisation d'AOS pour les animations
    AOS.init({
      duration: 1000,
      once: true, // L'animation ne se joue qu'une fois
      mirror: false
    });
    
    // Vérifier l'état au chargement de la page
    checkLoginStatus();
    
    // Ajouter un écouteur d'événements pour détecter les changements dans localStorage
    window.addEventListener('storage', checkLoginStatus);
    
    // Configurer un intervalle pour vérifier régulièrement le statut (en cas de modification directe du localStorage)
    const intervalId = setInterval(checkLoginStatus, 1000);
    
    // Créer un événement personnalisé pour la connexion/déconnexion
    const handleLoginEvent = () => checkLoginStatus();
    window.addEventListener('userLoginChange', handleLoginEvent);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('userLoginChange', handleLoginEvent);
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPseudo');
    localStorage.removeItem('userGoogleEmail');
    
    // Déclencher l'événement de changement
    window.dispatchEvent(new Event('userLoginChange'));
    
    setIsLoggedIn(false);
    setUserPseudo('');
    navigate('/');
  };

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId, 1500);
    setIsMobileMenuOpen(false); // Fermer le menu mobile après clic
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const newState = !prev;
      setTimeout(() => {
        AOS.refresh(); // Rafraîchir AOS uniquement lors de l'ouverture/fermeture du menu mobile
      }, 300);
      return newState;
    });
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        {/* Sélecteur de langue à gauche du logo */}
        <div className="language-container">
          <LanguageSwitcher />
        </div>

        {/* Logo */}
        <div className="nav-logo">
          <Link to="/">
            <img 
              src="/images/logo.png" 
              alt="Reviu Logo"
              data-aos="fade-down" 
              data-aos-duration="3000"
            />
          </Link>
        </div>
        
        {/* Navigation links centrés - non affichés sur les pages d'authentification */}
        {!isAuthPage && (
          <div className="navbar-nav-items" data-aos="fade-down" data-aos-duration="2000">
            <button
              onClick={(e) => handleSectionClick(e, 'features')}
              className="nav-btn"
            >
              {t('navbar.features')}
            </button>
            <button
              onClick={(e) => handleSectionClick(e, 'pricing')}
              className="nav-btn"
            >
              {t('navbar.pricing')}
            </button>
            <button
              onClick={(e) => handleSectionClick(e, 'stats')}
              className="nav-btn"
            >
              {t('navbar.stats')}
            </button>
            <button
              onClick={(e) => handleSectionClick(e, 'about')}
              className="nav-btn"
            >
              {t('navbar.about')}
            </button>
            <button
              onClick={(e) => handleSectionClick(e, 'contact')}
              className="nav-btn"
            >
              {t('navbar.contact')}
            </button>
            <Link
              to="/partnership"
              className="nav-btn"
              style={{ color: '#0ea5e9' }}
            >
              {t('navbar.partnership')}
            </Link>
          </div>
        )}
        
        {/* Boutons d'authentification à droite ou bouton "Retour à l'accueil" sur les pages d'auth */}
        <div className="navbar-buttons" data-aos="fade-down" data-aos-duration="2000">
          {isAuthPage ? (
            <Link
              to="/"
              className="btn"
            >
              {t('navbar.backToHome')}
            </Link>
          ) : isLoggedIn ? (
            <>
              <div className="user-info">
                <span>{t('navbar.hello')}, {localStorage.getItem('userPseudo')}</span>
              </div>
              <Link
                to="/dashboard"
                className="btn1"
              >
                {t('navbar.dashboard')}
              </Link>
              {location.pathname.startsWith('/checkout') ? (
                <Link
                  to="/"
                  className="btn"
                >
                  Retour au menu principal
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="btn"
                >
                  {t('navbar.logout')}
                </button>
              )
              }
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-btn"
              >
                {t('navbar.login')}
              </Link>
              <Link
                to="/register"
                className="btn1"
              >
                {t('navbar.register')}
              </Link>
            </>
          )}
        </div>
        
        {/* Menu hamburger pour mobile - non affiché sur les pages d'authentification */}
        {!isAuthPage && (
          <div className="d-only-mobile">
            <HamburgerMenu 
              isOpen={isMobileMenuOpen} 
              toggleMenu={toggleMobileMenu} 
              isLoggedIn={isLoggedIn} 
              handleLogout={handleLogout} 
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
