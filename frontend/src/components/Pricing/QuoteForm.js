import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const countries = [
  'France', 'Belgique', 'Suisse', 'Luxembourg', 'Canada', 'États-Unis', 
  'Allemagne', 'Espagne', 'Italie', 'Royaume-Uni', 'Pays-Bas', 'Autre'
];

const companyTypes = [
  'PME (1-50 employés)',
  'Entreprise moyenne (51-250 employés)',
  'Grande entreprise (251-1000 employés)',
  'Groupe international (1000+ employés)',
  'Franchise',
  'Institution publique',
  'Association/ONG'
];

const budgetRanges = [
  'Moins de 1000€',
  '1000€ - 5000€',
  '5000€ - 10000€',
  'Plus de 10000€',
  'À déterminer'
];

const QuoteForm = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    country: '',
    address: '',
    postalCode: '',
    city: '',
    companyType: '',
    employees: '',
    budget: '',
    message: '',
    newsletter: true
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
    if (!formData.firstName.trim()) newErrors.firstName = t('quoteForm.errors.required');
    if (!formData.lastName.trim()) newErrors.lastName = t('quoteForm.errors.required');
    if (!formData.companyName.trim()) newErrors.companyName = t('quoteForm.errors.required');
    if (!formData.country) newErrors.country = t('quoteForm.errors.required');
    
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
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyName: '',
      country: '',
      address: '',
      postalCode: '',
      city: '',
      companyType: '',
      employees: '',
      budget: '',
      message: '',
      newsletter: true
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
              {t('quoteForm.contactInfo')}
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('quoteForm.firstName')}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  error={!!errors.firstName}
                  helperText={errors.firstName}
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
                  label={t('quoteForm.lastName')}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
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
            
            <Typography variant="h6" sx={{ mt: 5, mb: 3, color: '#0ea5e9', fontSize: '1.3rem', fontWeight: 'bold', borderBottom: '2px solid #0ea5e9', paddingBottom: '8px' }}>
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
                <FormControl fullWidth required error={!!errors.country} 
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
                >
                  <InputLabel sx={{ color: '#f3f4f6', fontSize: '1.1rem' }}>{t('quoteForm.country')}</InputLabel>
                  <Select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    label={t('quoteForm.country')}
                    sx={{ 
                      color: '#ffffff', 
                      fontSize: '1.2rem',
                      '.MuiSelect-select': {
                        paddingTop: '15px',
                        paddingBottom: '15px',
                        minWidth: '300px',
                        whiteSpace: 'normal',
                        overflow: 'visible'
                      },
                      '& .MuiSelect-icon': {
                        right: '12px'
                      },
                      width: '100%'
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: '#1f2937',
                          '& .MuiMenuItem-root': {
                            fontSize: '1.1rem',
                            color: '#f3f4f6',
                            '&:hover': {
                              bgcolor: '#0ea5e9',
                              color: 'white'
                            },
                            '&.Mui-selected': {
                              bgcolor: '#0284c7',
                              color: 'white'
                            }
                          }
                        }
                      }
                    }}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t('quoteForm.address')}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder={t('quoteForm.addressPlaceholder')}
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
                  label={t('quoteForm.postalCode')}
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
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
                  label={t('quoteForm.city')}
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
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
            
            <Typography variant="h6" sx={{ mt: 5, mb: 3, color: '#0ea5e9', fontSize: '1.3rem', fontWeight: 'bold', borderBottom: '2px solid #0ea5e9', paddingBottom: '8px' }}>
              {t('quoteForm.projectInfo')}
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth 
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
                >
                  <InputLabel sx={{ color: '#f3f4f6', fontSize: '1.1rem' }}>{t('quoteForm.companyType')}</InputLabel>
                  <Select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    label={t('quoteForm.companyType')}
                    sx={{ 
                      color: '#ffffff', 
                      fontSize: '1.2rem',
                      '.MuiSelect-select': {
                        paddingTop: '15px',
                        paddingBottom: '15px',
                        minWidth: '300px',
                        whiteSpace: 'normal',
                        overflow: 'visible'
                      },
                      '& .MuiSelect-icon': {
                        right: '12px'
                      },
                      width: '100%'
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: '#1f2937',
                          '& .MuiMenuItem-root': {
                            fontSize: '1.1rem',
                            color: '#f3f4f6',
                            '&:hover': {
                              bgcolor: '#0ea5e9',
                              color: 'white'
                            },
                            '&.Mui-selected': {
                              bgcolor: '#0284c7',
                              color: 'white'
                            }
                          }
                        }
                      }
                    }}
                  >
                    {companyTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('quoteForm.employees')}
                  name="employees"
                  type="number"
                  value={formData.employees}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  inputProps={{ min: 1 }}
                  placeholder={t('quoteForm.employeesPlaceholder')}
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
                <FormControl fullWidth 
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
                >
                  <InputLabel sx={{ color: '#f3f4f6', fontSize: '1.1rem' }}>{t('quoteForm.budget')}</InputLabel>
                  <Select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    label={t('quoteForm.budget')}
                    sx={{ 
                      color: '#ffffff', 
                      fontSize: '1.2rem',
                      '.MuiSelect-select': {
                        paddingTop: '15px',
                        paddingBottom: '15px',
                        minWidth: '300px',
                        whiteSpace: 'normal',
                        overflow: 'visible'
                      },
                      '& .MuiSelect-icon': {
                        right: '12px'
                      },
                      width: '100%'
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: '#1f2937',
                          '& .MuiMenuItem-root': {
                            fontSize: '1.1rem',
                            color: '#f3f4f6',
                            '&:hover': {
                              bgcolor: '#0ea5e9',
                              color: 'white'
                            },
                            '&.Mui-selected': {
                              bgcolor: '#0284c7',
                              color: 'white'
                            }
                          }
                        }
                      }
                    }}
                  >
                    {budgetRanges.map((range) => (
                      <MenuItem key={range} value={range}>
                        {range}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t('quoteForm.message')}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={7}
                  variant="outlined"
                  placeholder={t('quoteForm.messagePlaceholder')}
                  InputLabelProps={{
                    style: { color: '#f3f4f6', fontSize: '1.1rem' }
                  }}
                  InputProps={{
                    style: { color: '#ffffff', fontSize: '1.1rem' }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
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
                    mb: 1,
                    width: '100%'
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
