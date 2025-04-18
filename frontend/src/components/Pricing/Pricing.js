import React, { useRef, useEffect, useState } from 'react';
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const togglePricingPeriod = () => {
    setIsAnnual(!isAnnual);
  };

  const scrollPricing = (direction) => {
    const container = pricingGridRef.current;
    const cardWidth = 320;
    const gap = 20;
    const start = container.scrollLeft;
    const startTime = performance.now();
    const duration = 800;
    
    // Déterminer si on est à la dernière carte
    const isAtEnd = Math.abs(container.scrollWidth - container.clientWidth - start) < 10;
    const isAtStart = start < 10;
    
    // Calculer la position finale
    let end;
    if (direction === 'left') {
      // Si on est à la fin, retourner au début
      end = isAtEnd ? 0 : Math.max(0, start - (cardWidth + gap));
    } else {
      // Aller directement à la fin
      end = container.scrollWidth - container.clientWidth;
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

  return (
    <section id="pricing">
      <div className="pricing-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '12px', marginBottom: '20px' }}>
        <h2>{t('pricing.title')}</h2>
        <button 
          onClick={togglePricingPeriod} 
          className="btn" 
          style={{ 
            backgroundColor: '#0ea5e9', 
            color: 'white', 
            padding: '3px 8px', 
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'inline-block',
            alignItems: 'center',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            minWidth: 'auto',
            lineHeight: '1.2',
            maxWidth: '110px',
            textAlign: 'center'
          }}
        >
          {isAnnual ? t('pricing.switchToMonthly') : t('pricing.switchToAnnual')}
        </button>
      </div>
    
      <div className="feature-wrapper">
        <button className="scroll-btn left" onClick={() => scrollPricing('left')}>&#8592;</button>
    
        <div className="feature-grid" ref={pricingGridRef} id="pricingGrid">
          <div className="feature-card" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="100">
            <h3>{t('pricing.trial.title')}</h3>
            <p>{t('pricing.trial.description')}</p>
            <a href="#" className="btn" onClick={(e) => handleSubscribe('trial')}>
              {t('pricing.trial.button')}
            </a>
          </div>
    
          <div className="feature-card" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
            <h3>{t('pricing.basic.title')}</h3>
            <p>
              {isAnnual 
                ? t('pricing.basic.annualPrice') 
                : t('pricing.basic.price')} 
              {isAnnual 
                ? t('pricing.basic.annualPeriod') 
                : t('pricing.basic.period')} 
              – {t('pricing.basic.description')}
            </p>
            <a href="#" className="btn" onClick={(e) => handleSubscribe(isAnnual ? 'basicAnnual' : 'basic')}>
              {t('pricing.basic.button')}
            </a>
          </div>
    
          <div 
            className="feature-card" 
            style={{ border: '2px solid #0ea5e9', position: 'relative' }}
            data-aos="zoom-in" 
            data-aos-duration="1000" 
            data-aos-delay="300"
          >
            <div style={{
              position: 'absolute',
              top: '-1px',
              right: '0px',
              backgroundColor: '#0ea5e9',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '8px 8px 8px 8px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
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
              – {t('pricing.pro.description')}
            </p>
            <a href="#" className="btn" onClick={(e) => handleSubscribe(isAnnual ? 'proAnnual' : 'pro')}>
              {t('pricing.pro.button')}
            </a>
          </div>

          <div className="feature-card" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="400">
            <h3>{t('pricing.enterprise.title')}</h3>
            <p>{t('pricing.enterprise.description')}</p>
            <ul style={{ marginBottom: '15px', fontSize: '0.9em', color: '#d1d5db' }}>
            </ul>
            <a href="#" className="btn" onClick={(e) => { e.preventDefault(); handleSubscribe('enterprise'); }}>
              {t('pricing.enterprise.button')}
            </a>
          </div>
        </div>
        <button className="scroll-btn right" onClick={() => scrollPricing('right')}>&#8594;</button>
      </div>
      
      <QuoteForm 
        open={quoteFormOpen} 
        onClose={() => setQuoteFormOpen(false)} 
      />
      
    </section>
  );
};

export default Pricing;
