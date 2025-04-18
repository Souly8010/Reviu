import React from 'react';
import { scrollToSection } from '../utils/scroll';
import Navbar from '../components/Layout/Navbar';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  
  const handleStartNowClick = (e) => {
    e.preventDefault();
    scrollToSection('pricing', 1500);
  };

  return (
    <>
      <Navbar />
      
      <section id="hero">
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.description')}</p>
        <a href="#pricing" className="cta-button" data-aos="fade-down" data-aos-delay="100"
           onClick={handleStartNowClick}>
          {t('hero.ctaButton')}
        </a>
      </section>

      <section id="features">
        <h2>Fonctionnalités</h2>
        {/* Contenu des fonctionnalités */}
      </section>

      <section id="pricing">
        <h2>Tarifs</h2>
        {/* Contenu des tarifs */}
      </section>

      <section id="stats">
        <h2>Statistiques</h2>
        {/* Contenu des statistiques */}
      </section>

      <section id="about">
        <h2>À propos</h2>
        {/* Contenu à propos */}
      </section>

      <section id="contact">
        <h2>Contact</h2>
        {/* Contenu contact */}
      </section>

      <footer>
        {t('footer.copyright')}
      </footer>
    </>
  );
};

export default Home;
