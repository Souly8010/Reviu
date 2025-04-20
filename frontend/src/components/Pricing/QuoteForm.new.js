import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const QuoteForm = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '',
    establishments: '',
    location: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.companyName.trim()) newErrors.companyName = t('quoteForm.errors.required');
    if (!formData.location.trim()) newErrors.location = t('quoteForm.errors.required');
    if (!formData.establishments.trim()) newErrors.establishments = t('quoteForm.errors.required');
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('quoteForm.errors.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('quoteForm.errors.emailInvalid');
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = t('quoteForm.errors.required');
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t('quoteForm.errors.phoneInvalid');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulation d'une API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simuler l'enregistrement des données
      console.log('Formulaire de devis soumis:', formData);
      
      // Marquer comme soumis
      setSubmitted(true);
      
      // Dans un environnement réel, nous enverrions les données au backend:
      // const response = await fetch('/api/quotes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();
      
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      alert(t('quoteForm.errors.submission'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    // Réinitialiser le formulaire pour une nouvelle soumission
    setFormData({
      companyName: '',
      establishments: '',
      location: '',
      email: '',
      phone: '',
    });
    setSubmitted(false);
  };

  return (
    <Dialog 
      open={open} 
      onClose={submitted ? null : onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          backgroundColor: '#0f0f0f',
          color: '#ffffff',
          maxWidth: '900px',
          margin: 'auto'
        }
      }}
    >
      <DialogTitle sx={{ 
        backgroundColor: '#0ea5e9', 
        color: 'white',
        py: 3,
        px: 4,
        fontWeight: 'bold',
        fontSize: '1.6rem',
        textAlign: 'center'
      }}>
        {submitted ? t('quoteForm.successTitle') : t('quoteForm.title')}
      </DialogTitle>
      
      <DialogContent sx={{ pt: 4, pb: 3, px: 4 }}>
        {submitted ? (
          <Box textAlign="center" py={6}>
            <Typography variant="h4" sx={{ color: '#0ea5e9', mb: 3, fontWeight: 'bold' }}>
              {t('quoteForm.thankYou')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#f3f4f6', fontSize: '1.1rem', lineHeight: 1.6 }}>
              {t('quoteForm.successMessage')}
            </Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Typography variant="body1" sx={{ mb: 4, color: '#f3f4f6', fontSize: '1.1rem', lineHeight: 1.6, textAlign: 'center' }}>
              {t('quoteForm.description')}
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 4, mb: 3, color: '#0ea5e9', fontSize: '1.3rem', fontWeight: 'bold', borderBottom: '2px solid #0ea5e9', paddingBottom: '8px' }}>
              {t('quoteForm.companyInfo')}
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('quoteForm.companyName')}
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  error={!!errors.companyName}
                  helperText={errors.companyName}
                  InputLabelProps={{
                    style: { color: '#f3f4f6', fontSize: '1.1rem' }
                  }}
                  InputProps={{
                    style: { color: '#ffffff', fontSize: '1.1rem' }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: '65px',
                      '& fieldset': {
                        borderColor: '#4b5563',
                        borderWidth: '2px'
                      },
                      '&:hover fieldset': {
                        borderColor: '#0ea5e9',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0ea5e9',
                      },
                    },
                    mb: 1
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('quoteForm.establishments')}
                  name="establishments"
                  type="number"
                  value={formData.establishments}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  error={!!errors.establishments}
                  helperText={errors.establishments}
                  inputProps={{ min: 1 }}
                  InputLabelProps={{
                    style: { color: '#f3f4f6', fontSize: '1.1rem' }
                  }}
                  InputProps={{
                    style: { color: '#ffffff', fontSize: '1.1rem' }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: '65px',
                      '& fieldset': {
                        borderColor: '#4b5563',
                        borderWidth: '2px'
                      },
                      '&:hover fieldset': {
                        borderColor: '#0ea5e9',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0ea5e9',
                      },
                    },
                    mb: 1
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('quoteForm.location')}
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  error={!!errors.location}
                  helperText={errors.location}
                  InputLabelProps={{
                    style: { color: '#f3f4f6', fontSize: '1.1rem' }
                  }}
                  InputProps={{
                    style: { color: '#ffffff', fontSize: '1.1rem' }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: '65px',
                      '& fieldset': {
                        borderColor: '#4b5563',
                        borderWidth: '2px'
                      },
                      '&:hover fieldset': {
                        borderColor: '#0ea5e9',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0ea5e9',
                      },
                    },
                    mb: 1
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('quoteForm.email')}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email}
                  InputLabelProps={{
                    style: { color: '#f3f4f6', fontSize: '1.1rem' }
                  }}
                  InputProps={{
                    style: { color: '#ffffff', fontSize: '1.1rem' }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: '65px',
                      '& fieldset': {
                        borderColor: '#4b5563',
                        borderWidth: '2px'
                      },
                      '&:hover fieldset': {
                        borderColor: '#0ea5e9',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0ea5e9',
                      },
                    },
                    mb: 1
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('quoteForm.phone')}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  error={!!errors.phone}
                  helperText={errors.phone}
                  InputLabelProps={{
                    style: { color: '#f3f4f6', fontSize: '1.1rem' }
                  }}
                  InputProps={{
                    style: { color: '#ffffff', fontSize: '1.1rem' }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: '65px',
                      '& fieldset': {
                        borderColor: '#4b5563',
                        borderWidth: '2px'
                      },
                      '&:hover fieldset': {
                        borderColor: '#0ea5e9',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0ea5e9',
                      },
                    },
                    mb: 1
                  }}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </DialogContent>
      
      <DialogActions sx={{ px: 4, pb: 4, justifyContent: submitted ? 'center' : 'flex-end' }}>
        {submitted ? (
          <Button 
            variant="contained" 
            onClick={() => { onClose(); handleReset(); }}
            sx={{ 
              bgcolor: '#0ea5e9',
              color: '#ffffff',
              '&:hover': {
                bgcolor: '#0284c7'
              },
              fontSize: '1.1rem',
              padding: '12px 36px',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            {t('quoteForm.close')}
          </Button>
        ) : (
          <>
            <Button 
              variant="outlined" 
              onClick={onClose}
              disabled={isSubmitting}
              sx={{ 
                borderColor: '#4b5563',
                borderWidth: '2px',
                color: '#f3f4f6',
                '&:hover': {
                  borderColor: '#f3f4f6',
                  background: 'rgba(243, 244, 246, 0.08)'
                },
                fontSize: '1.1rem',
                padding: '12px 36px',
                borderRadius: '8px',
                fontWeight: 'bold',
                mr: 2
              }}
            >
              {t('quoteForm.cancel')}
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              disabled={isSubmitting}
              sx={{ 
                bgcolor: '#0ea5e9',
                color: '#ffffff',
                '&:hover': {
                  bgcolor: '#0284c7'
                },
                fontSize: '1.1rem',
                padding: '12px 36px',
                borderRadius: '8px',
                fontWeight: 'bold'
              }}
              startIcon={isSubmitting ? <CircularProgress size={24} color="inherit" /> : null}
            >
              {isSubmitting ? t('quoteForm.submitting') : t('quoteForm.submit')}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default QuoteForm;
