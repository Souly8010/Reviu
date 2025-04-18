import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button,
  CircularProgress,
  Grid,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';

const NewAudit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [auditResult, setAuditResult] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  // Étapes du processus d'audit
  const steps = [
    t('audit.steps.enterUrl', 'Entrer URL'),
    t('audit.steps.analyzing', 'Analyse en cours'),
    t('audit.steps.results', 'Résultats')
  ];

  const validateUrl = (value) => {
    // Expression régulière simple pour valider une URL
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    
    if (!value) {
      return t('audit.urlRequired', 'URL requise');
    }

    if (!urlPattern.test(value)) {
      return t('audit.invalidUrl', 'URL invalide');
    }

    return '';
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    
    // Validation en temps réel
    if (value) {
      setUrlError(validateUrl(value));
    } else {
      setUrlError('');
    }
  };

  const handleStartAudit = () => {
    const error = validateUrl(url);
    setUrlError(error);
    
    if (!error) {
      setIsLoading(true);
      setActiveStep(1);

      // Simuler un délai d'analyse
      setTimeout(() => {
        setActiveStep(2);
        setIsLoading(false);
        
        // Résultat d'audit simulé
        setAuditResult({
          url: url,
          score: Math.floor(Math.random() * 100),
          date: new Date().toLocaleDateString(),
          issues: [
            { id: 1, severity: 'high', description: 'Temps de chargement élevé', impact: 'Performance' },
            { id: 2, severity: 'medium', description: 'Images non optimisées', impact: 'SEO' },
            { id: 3, severity: 'low', description: 'Meta description manquante', impact: 'SEO' }
          ],
          recommendations: [
            'Optimiser les images pour le web',
            'Ajouter des balises meta appropriées',
            'Utiliser la mise en cache du navigateur'
          ]
        });
      }, 3000);
    }
  };

  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              {t('audit.enterUrl', 'Entrez l\'URL du site à auditer')}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="https://example.com"
              value={url}
              onChange={handleUrlChange}
              error={!!urlError}
              helperText={urlError}
              sx={{ 
                mt: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0ea5e9',
                  },
                  color: 'white'
                },
                '& .MuiFormHelperText-root': {
                  color: 'error.main'
                }
              }}
            />
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                onClick={handleReturnToDashboard}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                {t('common.back', 'Retour')}
              </Button>
              <Button 
                variant="contained" 
                onClick={handleStartAudit}
                disabled={!url || !!urlError}
                sx={{
                  background: 'linear-gradient(90deg, #0ea5e9 0%, #2563eb 100%)',
                  color: 'white',
                  '&.Mui-disabled': {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    color: 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                {t('audit.startAudit', 'Démarrer l\'audit')}
              </Button>
            </Box>
          </Box>
        );
      
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
            <CircularProgress size={60} sx={{ color: '#0ea5e9' }} />
            <Typography variant="h6" sx={{ mt: 4 }}>
              {t('audit.analyzing', 'Analyse en cours...')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
              {t('audit.pleaseWait', 'Veuillez patienter pendant que nous analysons votre site')}
            </Typography>
          </Box>
        );
      
      case 2:
        return auditResult && (
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    flexDirection: 'column',
                    mb: 4
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 150,
                      height: 150,
                      borderRadius: '50%',
                      mb: 2,
                      background: `radial-gradient(circle, rgba(40, 44, 52, 0.5) 60%, ${getScoreColor(auditResult.score)} 60%)`
                    }}
                  >
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: getScoreColor(auditResult.score)
                      }}
                    >
                      {auditResult.score}
                    </Typography>
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    {auditResult.score > 80 
                      ? t('audit.results.excellent', 'Excellent !') 
                      : auditResult.score > 60 
                        ? t('audit.results.good', 'Bon') 
                        : t('audit.results.needsImprovement', 'Besoin d\'améliorations')}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {t('audit.url', 'URL')}: {auditResult.url}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
                    {t('audit.date', 'Date')}: {auditResult.date}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, bgcolor: '#1e2731', height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', pb: 1 }}>
                    {t('audit.issues', 'Problèmes détectés')}
                  </Typography>
                  {auditResult.issues.map((issue) => (
                    <Box key={issue.id} sx={{ mt: 2, pb: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            bgcolor: issue.severity === 'high' ? '#ef4444' : issue.severity === 'medium' ? '#f59e0b' : '#10b981',
                            mr: 1 
                          }} 
                        />
                        <Typography variant="subtitle1">
                          {issue.description}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', ml: 3 }}>
                        {t('audit.impact', 'Impact')}: {issue.impact}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, bgcolor: '#1e2731', height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', pb: 1 }}>
                    {t('audit.recommendations', 'Recommandations')}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {auditResult.recommendations.map((recommendation, index) => (
                      <Typography component="li" key={index} sx={{ mt: 2 }}>
                        {recommendation}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                onClick={handleReturnToDashboard}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                {t('audit.backToDashboard', 'Retour au tableau de bord')}
              </Button>
              <Button 
                variant="contained" 
                sx={{
                  background: 'linear-gradient(90deg, #0ea5e9 0%, #2563eb 100%)',
                  color: 'white'
                }}
                onClick={() => {
                  // Télécharger le rapport (simulation)
                  alert(t('audit.downloadStarted', 'Téléchargement du rapport démarré...'));
                }}
              >
                {t('audit.downloadReport', 'Télécharger le rapport')}
              </Button>
            </Box>
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        bgcolor: '#282c34',
        color: 'white',
        minHeight: '100vh',
        pt: 2,
        pb: 6
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: 'white',
            mb: 4,
            textAlign: 'center',
            pt: 2
          }}
        >
          {t('audit.title', 'Nouvel audit de site')}
        </Typography>

        <Paper 
          elevation={3}
          sx={{ 
            p: 4, 
            bgcolor: '#1e2731',
            color: 'white',
            borderRadius: '12px'
          }}
        >
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel
            sx={{ 
              mb: 4,
              '& .MuiStepLabel-label': {
                color: 'rgba(255, 255, 255, 0.5)',
                marginTop: 1
              },
              '& .MuiStepLabel-label.Mui-active': {
                color: 'white'
              },
              '& .MuiStepLabel-label.Mui-completed': {
                color: 'rgba(255, 255, 255, 0.7)'
              },
              '& .MuiStepIcon-root': {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              '& .MuiStepIcon-root.Mui-active': {
                color: '#0ea5e9'
              },
              '& .MuiStepIcon-root.Mui-completed': {
                color: '#0ea5e9'
              }
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent()}
        </Paper>
      </Container>
    </Box>
  );
};

export default NewAudit;
