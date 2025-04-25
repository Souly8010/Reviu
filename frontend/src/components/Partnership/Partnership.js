import React, { useEffect } from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Partnership = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Initialiser les animations AOS
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true
    });

    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        minHeight: '100vh',
        backgroundColor: '#282c34',
        color: 'white',
        pt: 8,
        pb: 8,
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            textAlign: 'center',
            mb: 6
          }}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(45deg, #0ea5e9 30%, #2563eb 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('navbar.partnership')}
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              fontWeight: 'light'
            }}
          >
            Rejoignez notre réseau de partenaires et développez votre activité
          </Typography>
        </Box>

        <Paper 
          elevation={4}
          sx={{ 
            p: 6,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(30, 39, 49, 0.9) 0%, rgba(21, 27, 34, 0.8) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            maxWidth: '900px',
            mx: 'auto',
            position: 'relative',
            overflow: 'hidden'
          }}
          data-aos="zoom-in"
          data-aos-duration="1200"
        >
          {/* Overlay graphique */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120%',
              height: '120%',
              opacity: '0.07',
              zIndex: 0,
              backgroundImage: 'url(/images/logo.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(5px)'
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                mb: 5,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Coming Soon
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4,
                textAlign: 'center',
                fontWeight: 'normal',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.85)'
              }}
            >
              Notre programme de partenariat est en cours de développement et sera bientôt disponible. 
              Restez à l'écoute pour découvrir comment vous pourrez collaborer avec nous et bénéficier 
              d'avantages exclusifs.
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                gap: 3,
                mt: 5,
                textAlign: 'center'
              }}
            >
              <Button 
                component={Link}
                to="/"
                variant="contained"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1rem',
                  background: 'linear-gradient(45deg, #0ea5e9 30%, #2563eb 90%)',
                  borderRadius: '8px',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 16px rgba(14, 165, 233, 0.3)',
                  '&:hover': {
                    boxShadow: '0 12px 20px rgba(14, 165, 233, 0.4)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Retour à l'accueil
              </Button>
              
              <Button 
                component={Link}
                to="/contact"
                variant="outlined"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1rem',
                  borderRadius: '8px',
                  color: '#0ea5e9',
                  borderColor: '#0ea5e9',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Nous contacter
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Partnership;
