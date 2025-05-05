import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';
import QuoteForm from './QuoteForm';

const Pricing = () => {
  const navigate = useNavigate();
  const pricingGridRef = useRef(null);
  const { t } = useTranslation();
  const [isAnnual, setIsAnnual] = useState(false);
  const [quoteFormOpen, setQuoteFormOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(window.innerWidth <= 480 ? 1 : window.innerWidth <= 1024 ? 2 : 3);
  const totalCards = 4; // Nombre total de cartes de tarifs

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: 'mobile' // Désactiver AOS sur mobile pour éviter les bugs d'animation
    });
    
    // Gérer le layout responsive en fonction de la taille de l'écran
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      
      // Définir le nombre de cartes visibles en fonction de la largeur de l'écran
      if (width <= 480) {
        setVisibleCards(1);
      } else if (width <= 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    
    // Appel initial et écouteur d'événement
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Nettoyage
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Solution simplifiée pour changer le mode de tarification
  const setMonthlyPricing = () => {
    console.log('Setting to monthly');
    setIsAnnual(false);
  };

  const setAnnualPricing = () => {
    console.log('Setting to annual');
    setIsAnnual(true);
  };

  const scrollPricing = (direction) => {
    // Sur mobile, on navigue par index plutôt que par scrolling
    if (isMobile) {
      if (direction === 'left') {
        setCurrentCardIndex(prev => Math.max(0, prev - 1));
      } else {
        setCurrentCardIndex(prev => Math.min(totalCards - 1, prev + 1));
      }
      return;
    }
    
    // Sur desktop, utiliser le scrolling fluide
    const container = pricingGridRef.current;
    const cardWidth = 320;
    const gap = 20;
    const scrollAmount = (cardWidth + gap) * visibleCards;
    const start = container.scrollLeft;
    const startTime = performance.now();
    const duration = 600; // Plus rapide pour une meilleure réactivité
    
    // Déterminer si on est à la dernière carte
    const isAtEnd = Math.abs(container.scrollWidth - container.clientWidth - start) < 10;
    const isAtStart = start < 10;
    
    // Calculer la position finale
    let end;
    if (direction === 'left') {
      // Si on est à la fin, retourner au début
      end = isAtEnd ? 0 : Math.max(0, start - scrollAmount);
      // Mettre à jour l'index de la carte actuelle pour l'accessibilité
      setCurrentCardIndex(Math.max(0, currentCardIndex - visibleCards));
    } else {
      // Aller directement à la fin
      end = Math.min(container.scrollWidth - container.clientWidth, start + scrollAmount);
      // Mettre à jour l'index de la carte actuelle pour l'accessibilité
      setCurrentCardIndex(Math.min(totalCards - visibleCards, currentCardIndex + visibleCards));
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(progress);
      
      const newPosition = start + (end - start) * eased;
      container.scrollLeft = newPosition;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  };

  const handleSubscribe = async (plan) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');
    
    if (plan === 'enterprise') {
      setQuoteFormOpen(true);
      return;
    }
    
    if (!isLoggedIn) {
      navigate('/register');
      return;
    }

    if (plan === 'trial') {
      try {
        const response = await fetch('/api/subscriptions/trial', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId })
        });

        const data = await response.json();

        if (response.ok) {
          alert(t('pricing.alerts.trialSuccess'));
          navigate('/dashboard');
        } else {
          if (data.error.includes('déjà utilisé')) {
            alert(t('pricing.alerts.trialAlreadyUsed'));
          } else {
            alert(t('pricing.alerts.trialError'));
          }
        }
      } catch (error) {
        console.error('Erreur lors de l\'activation de la période d\'essai:', error);
        alert(t('pricing.alerts.serverError'));
      }
      return;
    }

    // Pour les autres plans
    navigate(`/checkout/${plan}`);
  };

  // Créer un tableau avec toutes les cartes de tarifs pour faciliter la navigation par index
  const pricingCards = [
    // Carte 1 - Essai gratuit
    <div key="trial" className="feature-card" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="100">
      <h3>{t('pricing.trial.title')}</h3>
      <p>{t('pricing.trial.description')}</p>
      <a href="#" className="btn" onClick={(e) => { e.preventDefault(); handleSubscribe('trial'); }}>
        {t('pricing.trial.button')}
      </a>
    </div>,
    
    // Carte 2 - Basic
    <div key="basic" className="feature-card" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
      <h3>{t('pricing.basic.title')}</h3>
      <p>
        {isAnnual 
          ? t('pricing.basic.annualPrice') 
          : t('pricing.basic.price')} 
        {isAnnual 
          ? t('pricing.basic.annualPeriod') 
          : t('pricing.basic.period')} 
         &nbsp;– &nbsp;{t('pricing.basic.description')}
      </p>
      <a href="#" className="btn" onClick={(e) => { e.preventDefault(); handleSubscribe(isAnnual ? 'basicAnnual' : 'basic'); }}>
        {t('pricing.basic.button')}
      </a>
    </div>,
    
    // Carte 3 - Pro avec badge
    <div 
      key="pro"
      className="feature-card" 
      style={{ border: '2px solid #0ea5e9', position: 'relative' }}
      data-aos="zoom-in" 
      data-aos-duration="1000" 
      data-aos-delay="300"
    >
      <div className="pro-badge">
        {t('pricing.pro.badge')}
      </div>
      <h3>{t('pricing.pro.title')}</h3>
      <p>
        {isAnnual 
          ? t('pricing.pro.annualPrice') 
          : t('pricing.pro.price')} 
        {isAnnual 
          ? t('pricing.pro.annualPeriod') 
          : t('pricing.pro.period')} 
        &nbsp;– &nbsp;{t('pricing.pro.description')}
      </p>
      <a href="#" className="btn" onClick={(e) => { e.preventDefault(); handleSubscribe(isAnnual ? 'proAnnual' : 'pro'); }}>
        {t('pricing.pro.button')}
      </a>
    </div>,

    // Carte 4 - Enterprise
    <div key="enterprise" className="feature-card" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="400">
      <h3>{t('pricing.enterprise.title')}</h3>
      <p>{t('pricing.enterprise.description')}</p>
      <ul style={{ marginBottom: '15px', fontSize: '0.9em', color: '#d1d5db' }}>
      </ul>
      <a href="#" className="btn" onClick={(e) => { e.preventDefault(); handleSubscribe('enterprise'); }}>
        {t('pricing.enterprise.button')}
      </a>
    </div>
  ];

  // Pagination mobile : afficher la position actuelle
  const paginationDots = totalCards => {
    return (
      <div className="pagination-dots">
        {Array.from({ length: totalCards }).map((_, index) => (
          <span 
            key={index} 
            className={`pagination-dot ${index === currentCardIndex ? 'active' : ''}`}
            onClick={() => setCurrentCardIndex(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="pricing">
      <div className="pricing-header" style={{ 
        display: 'flex', 
        alignItems: isMobile ? 'flex-start' : 'center', 
        justifyContent: 'flex-start', 
        gap: '12px', 
        marginBottom: '20px',
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        <h2>{t('pricing.title')}</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: '#0f172a',
            borderRadius: '8px',
            padding: '3px',
            marginTop: isMobile ? '10px' : '0',
          }}
        >
          <button
            onClick={setMonthlyPricing}
            onTouchStart={setMonthlyPricing} /* Ajout de la gestion des événements tactiles */
            style={{
              backgroundColor: !isAnnual ? '#0ea5e9' : 'transparent',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 16px', /* Agrandissement pour faciliter l'interaction tactile */
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.2s',
              WebkitTapHighlightColor: 'transparent', /* Éliminer le flash sur iOS */
              WebkitTouchCallout: 'none', /* Désactiver le menu contextuel sur iOS */
              touchAction: 'manipulation', /* Améliorer la réactivité tactile */
            }}
          >
            Mensuel
          </button>
          <button
            onClick={setAnnualPricing}
            onTouchStart={setAnnualPricing} /* Ajout de la gestion des événements tactiles */
            style={{
              backgroundColor: isAnnual ? '#0ea5e9' : 'transparent',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 16px', /* Agrandissement pour faciliter l'interaction tactile */
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.2s',
              WebkitTapHighlightColor: 'transparent', /* Éliminer le flash sur iOS */
              WebkitTouchCallout: 'none', /* Désactiver le menu contextuel sur iOS */
              touchAction: 'manipulation', /* Améliorer la réactivité tactile */
            }}
          >
            Annuel
          </button>
        </div>
      </div>
    
      <div className={`feature-wrapper ${isMobile ? 'mobile-view' : 'desktop-view'}`}>
        {/* Les boutons de navigation sont visibles dans tous les modes */}
        <button 
          className={`scroll-btn left ${currentCardIndex === 0 ? 'disabled' : ''}`} 
          onClick={() => scrollPricing('left')} 
          aria-label="Voir les tarifs précédents">
          &#8592;
        </button>
    
        {isMobile ? (
          /* Vue mobile : une seule carte à la fois avec navigation par index */
          <div className="feature-mobile-container" aria-live="polite">
            {pricingCards[currentCardIndex]}
            {paginationDots(totalCards)}
            <div className="card-indicator">
              {currentCardIndex + 1}/{totalCards}
            </div>
          </div>
        ) : (
          /* Vue desktop : grid de cartes défilantes */
          <div className="feature-grid" ref={pricingGridRef} id="pricingGrid">
            {pricingCards}
          </div>
        )}
    
        <button 
          className={`scroll-btn right ${isMobile && currentCardIndex === totalCards - 1 ? 'disabled' : ''}`} 
          onClick={() => scrollPricing('right')} 
          aria-label="Voir les tarifs suivants">
          &#8594;
        </button>
      </div>
      
      <QuoteForm 
        open={quoteFormOpen} 
        onClose={() => setQuoteFormOpen(false)} 
      />
      
    </section>
  );
};

export default Pricing;
