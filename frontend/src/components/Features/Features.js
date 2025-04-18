import React, { useRef } from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const featureGridRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const scrollFeatures = (direction) => {
    const container = featureGridRef.current;
    const cardWidth = 450; // Largeur d'une carte mise à jour pour correspondre au CSS
    const gap = 25; // Espace entre les cartes mis à jour pour correspondre au CSS
    const visibleCards = 2; // Nombre de cartes visibles réduit pour s'adapter à la largeur plus grande
    const scrollAmount = (cardWidth + gap) * visibleCards;
    
    const currentScroll = container.scrollLeft;
    const totalWidth = container.scrollWidth;
    const containerWidth = container.clientWidth;
    
    // Calculer le nombre de "pages" total
    const maxScroll = totalWidth - containerWidth;
    const currentPage = Math.round(currentScroll / scrollAmount);
    
    // Calculer la nouvelle position
    let newPosition;
    if (direction === 'left') {
      newPosition = Math.max(0, (currentPage - 1) * scrollAmount);
    } else {
      newPosition = Math.min(maxScroll, (currentPage + 1) * scrollAmount);
    }

    // Animation fluide
    const startTime = performance.now();
    const duration = 800;
    const startPosition = currentScroll;
    const distance = newPosition - startPosition;

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(progress);
      
      container.scrollLeft = startPosition + (distance * eased);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  };

  return (
    <section id="features">
      <h2>{t('features.title')}</h2>
    
      <div className="feature-wrapper">
        <button className="scroll-btn left" onClick={() => scrollFeatures('left')}>&#8592;</button>
    
        <div className="feature-grid" ref={featureGridRef}>
          <div className="feature-card2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
            <h3>{t('features.feature1.title')}</h3>
            <p>{t('features.feature1.description')}</p>
          </div>

          

          <div className="feature-card2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
            <h3>{t('features.feature2.title')}</h3>
            <p>{t('features.feature2.description')}</p>
          </div>
    
          <div className="feature-card2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" style={{ border: '2px solid #0ea5e9', position: 'relative' }}>
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
            }}>PRO</div>
            <h3>{t('features.feature3.title')}</h3>
            <p>{t('features.feature3.description')}</p>
            <ul>
              <li>{t('features.feature3.list.item1')}</li>
              <li>{t('features.feature3.list.item2')}</li>
              <li>{t('features.feature3.list.item3')}</li>
              <li>{t('features.feature3.list.item4')}</li>
              <li>{t('features.feature3.list.item5')}</li>
            </ul>
            <p>{t('features.feature3.conclusion')}</p>
          </div>

          <div className="feature-card2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="900" style={{ border: '2px solid #0ea5e9', position: 'relative' }}>
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
            }}>PRO</div>
            <h3>{t('features.feature4.title')}</h3>
            <p>{t('features.feature4.description')}</p>
            <ul>
              <li>{t('features.feature4.list.item1')}</li>
              <li>{t('features.feature4.list.item2')}</li>
              <li>{t('features.feature4.list.item3')}</li>
              <li>{t('features.feature4.list.item4')}</li>
            </ul>
            <p>{t('features.feature4.conclusion')}</p>
          </div>

          <div className="feature-card4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1100" style={{ border: '2px solid #0ea5e9', position: 'relative' }}>
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
            }}>PRO</div>
            <h3>{t('features.feature5.title')}</h3>
            <p>{t('features.feature5.description')}</p>
          </div>
    
          <div className="feature-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1300" style={{ border: '2px solid #0ea5e9', position: 'relative' }}>
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
            }}>PRO</div>
            <h3>{t('features.feature6.title')}</h3>
            <p>{t('features.feature6.description')}</p>
          </div>
        </div>
    
        <button className="scroll-btn right" onClick={() => scrollFeatures('right')}>&#8594;</button>
      </div>
    </section>
  );
};

export default Features;
