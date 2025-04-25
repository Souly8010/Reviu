import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Features from './components/Features/Features';
import Statistics from './components/Charts/Statistics';
import Pricing from './components/Pricing/Pricing';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import FAQ from './components/FAQ/FAQ';
import Privacy from './components/Privacy/Privacy';
import Terms from './components/Legal/Terms';
import LegalNotice from './components/Legal/LegalNotice';
import CookiesPolicy from './components/Legal/CookiesPolicy';
import Checkout from './components/Checkout/Checkout';
import Dashboard from './components/Dashboard/Dashboard';
import NewAudit from './components/Audit/NewAudit';
import Partnership from './components/Partnership/Partnership';
import { scrollToSection } from './utils/scroll';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const { t } = useTranslation();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
      easing: 'ease-out'
    });
  }, []);

  const handleStartNowClick = (e) => {
    e.preventDefault();
    scrollToSection('pricing', 1500);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/checkout/:plan" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-audit" element={<NewAudit />} />
          <Route path="/audit/:id" element={<Dashboard />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/profile/edit" element={<Dashboard />} />
          <Route path="/profile/change-password" element={<Dashboard />} />
          <Route path="/profile/notifications" element={<Dashboard />} />
          <Route path="/profile/privacy" element={<Dashboard />} />
          <Route path="/profile/delete" element={<Dashboard />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/legal" element={<LegalNotice />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/" element={
            <>
              <section id="hero">
                <h1 data-aos="fade-down" data-aos-duration="1000">{t('hero.title')}</h1>
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                  {t('hero.description')}
                </p>
                <button
                   className="btn1" 
                   data-aos="fade-up" 
                   data-aos-duration="1000" 
                   data-aos-delay="400"
                   onClick={handleStartNowClick}
                   style={{
                     border: 'none',
                     cursor: 'pointer',
                     background: 'linear-gradient(90deg, #0ea5e9 0%, #2563eb 100%)',
                     color: 'white',
                     padding: '12px 24px',
                     borderRadius: '8px',
                     fontWeight: 'bold',
                     fontSize: '16px'
                   }}
                >
                  {t('hero.ctaButton')}
                </button>
              </section>

              <Features />
              <Statistics />
              <Pricing />
              <FAQ />
              <About />
              <Contact />

              <footer style={{
                padding: '40px 20px 20px',
                backgroundColor: '#1e3a8a',
                borderTop: '1px solid #1f2937'
              }}>
                <div style={{
                  maxWidth: '1200px',
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginBottom: '20px',
                    flexWrap: 'wrap'
                  }}>
                    <a href="/privacy" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.9rem' }}>
                      {t('privacy.title', 'Charte de Confidentialité')}
                    </a>
                    <a href="/terms" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.9rem' }}>
                      {t('footer.terms', 'Conditions d\'utilisation')}
                    </a>
                    <a href="/legal" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.9rem' }}>
                      {t('footer.legal', 'Mentions Légales')}
                    </a>
                    <a href="/cookies" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.9rem' }}>
                      {t('footer.cookies', 'Politique des Cookies')}
                    </a>
                  </div>
                  <div style={{ color: '#ffffff', fontSize: '0.85rem' }}>
                    {t('footer.copyright')}
                  </div>
                </div>
              </footer>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
