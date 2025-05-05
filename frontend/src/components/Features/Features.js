import React, { useRef, useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const featureGridRef = useRef(null);
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(window.innerWidth <= 480 ? 1 : window.innerWidth <= 1024 ? 2 : 3);
  const totalCards = 6; // Total number of feature cards

  // Initialize animations and handle responsive layout
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: 'mobile' // Disable AOS on mobile to prevent animation bugs
    });
    
    // Handle responsive layout based on screen size
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      
      // Set number of visible cards based on screen width
      if (width <= 480) {
        setVisibleCards(1);
      } else if (width <= 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    
    // Initial call and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollFeatures = (direction) => {
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
    const container = featureGridRef.current;
    const cardWidth = 450; // Largeur d'une carte mise à jour pour correspondre au CSS
    const gap = 25; // Espace entre les cartes mis à jour pour correspondre au CSS
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
      // Mettre à jour l'index de la carte actuelle pour l'accessibilité
      setCurrentCardIndex(Math.max(0, currentCardIndex - visibleCards));
    } else {
      newPosition = Math.min(maxScroll, (currentPage + 1) * scrollAmount);
      // Mettre à jour l'index de la carte actuelle pour l'accessibilité
      setCurrentCardIndex(Math.min(totalCards - visibleCards, currentCardIndex + visibleCards));
    }

    // Animation fluide avec easing pour une transition douce
    const startTime = performance.now();
    const duration = 600; // Légèrement plus rapide pour une meilleure réactivité
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

  // Créer un tableau avec toutes les cartes de fonctionnalités pour faciliter la navigation par index
  const featureCards = [
    // Carte 1 - Standard
    <div key="feature1" className="feature-card2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
      <h3>{t('features.feature1.title')}</h3>
      <p>{t('features.feature1.description')}</p>
    </div>,
    
    // Carte 2 - Standard
    <div key="feature2" className="feature-card2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
      <h3>{t('features.feature2.title')}</h3>
      <p>{t('features.feature2.description')}</p>
    </div>,
    
    // Carte 3 - PRO avec liste
    <div key="feature3" className="feature-card2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" style={{ border: '2px solid #0ea5e9', position: 'relative' }}>
      <div className="pro-badge">PRO</div>
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
    </div>,
    
    // Carte 4 - PRO avec liste
    <div key="feature4" className="feature-card2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="900" style={{ border: '2px solid #0ea5e9', position: 'relative' }}>
      <div className="pro-badge">PRO</div>
      <h3>{t('features.feature4.title')}</h3>
      <p>{t('features.feature4.description')}</p>
      <ul>
        <li>{t('features.feature4.list.item1')}</li>
        <li>{t('features.feature4.list.item2')}</li>
        <li>{t('features.feature4.list.item3')}</li>
        <li>{t('features.feature4.list.item4')}</li>
      </ul>
      <p>{t('features.feature4.conclusion')}</p>
    </div>,
    
    // Carte 5 - PRO
    <div key="feature5" className="feature-card4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1100" style={{ border: '2px solid #0ea5e9', position: 'relative' }}>
      <div className="pro-badge">PRO</div>
      <h3>{t('features.feature5.title')}</h3>
      <p>{t('features.feature5.description')}</p>
    </div>,
    
    // Carte 6 - PRO
    <div key="feature6" className="feature-card" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1300" style={{ border: '2px solid #0ea5e9', position: 'relative' }}>
      <div className="pro-badge">PRO</div>
      <h3>{t('features.feature6.title')}</h3>
      <p>{t('features.feature6.description')}</p>
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
    <section id="features">
      <h2>{t('features.title')}</h2>
      
      {/* Espace entre le titre et les cartes */}
      <div style={{ marginBottom: '30px' }}></div>
    
      <div className={`feature-wrapper ${isMobile ? 'mobile-view' : 'desktop-view'}`}>
        {/* Les boutons de navigation sont visibles dans tous les modes */}
        <button 
          className={`scroll-btn left ${currentCardIndex === 0 ? 'disabled' : ''}`} 
          onClick={() => scrollFeatures('left')} 
          aria-label="Voir les fonctionnalités précédentes">
          &#8592;
        </button>
    
        {isMobile ? (
          /* Vue mobile : une seule carte à la fois avec navigation par index */
          <div className="feature-mobile-container" aria-live="polite">
            {featureCards[currentCardIndex]}
            {paginationDots(totalCards)}
            <div className="card-indicator">
              {currentCardIndex + 1}/{totalCards}
            </div>
          </div>
        ) : (
          /* Vue desktop : grid de cartes défilantes */
          <div className="feature-grid" ref={featureGridRef}>
            {featureCards}
          </div>
        )}
    
        <button 
          className={`scroll-btn right ${isMobile && currentCardIndex === totalCards - 1 ? 'disabled' : ''}`} 
          onClick={() => scrollFeatures('right')} 
          aria-label="Voir les fonctionnalités suivantes">
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default Features;
