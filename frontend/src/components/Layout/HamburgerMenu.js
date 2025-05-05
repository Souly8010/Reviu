import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { scrollToSection } from '../../utils/scroll';

const HamburgerMenu = ({ isOpen, toggleMenu, isLoggedIn, handleLogout }) => {
  const { t } = useTranslation();

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId, 1500);
    toggleMenu();
  };

  return (
    <>
      {/* Icône du menu hamburger */}
      <div className={`hamburger-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Menu" role="button" tabIndex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menu mobile qui s'affiche lorsque hamburger-menu est actif */}
      <div className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="close-button" onClick={toggleMenu}>&times;</div>
        </div>

        <div className="mobile-menu-content">
          <button
            onClick={(e) => handleSectionClick(e, 'features')}
            className="mobile-nav-btn"
          >
            {t('navbar.features')}
          </button>
          
          <button
            onClick={(e) => handleSectionClick(e, 'pricing')}
            className="mobile-nav-btn"
          >
            {t('navbar.pricing')}
          </button>
          
          <button
            onClick={(e) => handleSectionClick(e, 'stats')}
            className="mobile-nav-btn"
          >
            {t('navbar.stats')}
          </button>
          
          <button
            onClick={(e) => handleSectionClick(e, 'about')}
            className="mobile-nav-btn"
          >
            {t('navbar.about')}
          </button>
          
          <button
            onClick={(e) => handleSectionClick(e, 'contact')}
            className="mobile-nav-btn"
          >
            {t('navbar.contact')}
          </button>
          
          <Link
            to="/partnership"
            className="mobile-nav-btn special"
            onClick={toggleMenu}
          >
            {t('navbar.partnership')}
          </Link>

          <div className="mobile-menu-auth">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="mobile-btn" onClick={toggleMenu}>
                  {t('navbar.dashboard')}
                </Link>
                <button onClick={() => { handleLogout(); toggleMenu(); }} className="mobile-btn">
                  {t('navbar.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-btn" onClick={toggleMenu}>
                  {t('navbar.login')}
                </Link>
                <Link to="/register" className="mobile-btn highlight" onClick={toggleMenu}>
                  {t('navbar.tryFree')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
