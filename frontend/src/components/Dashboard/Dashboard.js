import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  Tabs, 
  Tab, 
  CircularProgress, 
  Card, 
  CardContent,
  CardHeader,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Alert,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Tooltip
} from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Enregistrer les composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

// Simuler des données pour le tableau de bord
const mockUserData = {
  userInfo: {
    name: '',
    email: '',
    subscription: 'Gratuit',
    subscriptionExpiry: '31/12/2025',
    remainingAudits: 3
  },
  recentAudits: [
    { id: 1, siteName: 'example1.com', date: '10/04/2025', score: 87, type: 'SEO', status: 'Complété' },
    { id: 2, siteName: 'example2.org', date: '05/04/2025', score: 62, type: 'Performance', status: 'Complété' },
    { id: 3, siteName: 'example3.net', date: '28/03/2025', score: 93, type: 'Accessibilité', status: 'Complété' },
    { id: 4, siteName: 'example4.io', date: '20/03/2025', score: 76, type: 'SEO', status: 'Complété' },
    { id: 5, siteName: 'example5.co', date: '15/03/2025', score: 81, type: 'Performance', status: 'Complété' }
  ],
  notifications: [
    { id: 1, message: 'Votre abonnement sera renouvelé dans 15 jours', isRead: false, date: '12/04/2025' },
    { id: 2, message: 'Nouvel audit disponible pour votre plan', isRead: true, date: '05/04/2025' },
    { id: 3, message: 'Mise à jour des fonctionnalités', isRead: true, date: '01/04/2025' }
  ]
};

// Interface TabPanel pour organiser le contenu par onglets
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterType, setFilterType] = useState('all');
  const chartRef = useRef(null);

  // Vérification de l'authentification
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Initialisation des animations
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true
    });

    // Récupération des données utilisateur (simulation)
    const fetchUserData = async () => {
      try {
        // En production, remplacer par un appel API réel
        // const response = await fetch('/api/user/dashboard');
        // const data = await response.json();
        
        // Simulation de chargement
        setTimeout(() => {
          const mockData = {...mockUserData};
          
          // Personnalisation avec les données du localStorage
          mockData.userInfo.name = localStorage.getItem('userPseudo') || 'Utilisateur';
          mockData.userInfo.email = localStorage.getItem('userEmail') || 'email@example.com';
          
          setUserData(mockData);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError('Impossible de charger les données du tableau de bord');
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleStartAudit = () => {
    // Redirection vers la page d'audit
    navigate('/new-audit');
  };

  const handleViewAllStats = () => {
    // Redirection vers la page des statistiques détaillées
    navigate('/statistics');
  };

  const handleViewAllAudits = () => {
    // Basculer vers l'onglet Mes audits
    setActiveTab(1);
  };

  const handleViewAuditDetails = (auditId) => {
    // Redirection vers la page de détails d'un audit spécifique
    navigate(`/audit/${auditId}`);
  };

  const handleMarkAllAsRead = () => {
    // Marquer toutes les notifications comme lues
    if (userData) {
      const updatedNotifications = userData.notifications.map(notif => ({
        ...notif,
        isRead: true
      }));
      
      setUserData({
        ...userData,
        notifications: updatedNotifications
      });
    }
  };

  const handleEditProfile = () => {
    // Redirection vers la page d'édition du profil
    navigate('/profile/edit');
  };

  const handleUpgradePlan = () => {
    // Redirection vers la page des plans d'abonnement
    navigate('/pricing');
  };

  const handleChangePassword = () => {
    // Redirection vers la page de changement de mot de passe
    navigate('/profile/change-password');
  };

  const handleNotificationSettings = () => {
    // Redirection vers les paramètres de notification
    navigate('/profile/notifications');
  };

  const handlePrivacySettings = () => {
    // Redirection vers les paramètres de confidentialité
    navigate('/profile/privacy');
  };

  const handleDeleteAccount = () => {
    // Redirection vers la page de suppression de compte
    if (window.confirm(t('dashboard.deleteAccountConfirm', 'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'))) {
      navigate('/profile/delete');
    }
  };

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '80vh',
          bgcolor: '#282c34',
          color: 'white'
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ ml: 2, color: 'white' }}>
          Chargement de votre tableau de bord...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, bgcolor: '#282c34', color: 'white', py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Réessayer
        </Button>
      </Container>
    );
  }

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        bgcolor: '#282c34',
        color: 'white',
        minHeight: '100vh',
        pt: 0,
        pb: 2
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{ mt: 1, mb: 1, px: { xs: 1, sm: 2, md: 3 } }}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: 'white',
            mb: 2,
            textAlign: 'center'
          }}
        >
          {t('dashboard.title', 'Tableau de bord')}
        </Typography>

        {/* Résumé de l'utilisateur */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, md: 3 }, 
            mb: 2, 
            background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
            color: 'white',
            borderRadius: '12px'
          }}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h6">{t('dashboard.welcome', 'Bienvenue')}, {userData.userInfo.name}!</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {t('dashboard.subscriptionStatus', 'Votre abonnement')}: <b>{userData.userInfo.subscription}</b>
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {t('dashboard.expiresOn', 'Expire le')}: {userData.userInfo.subscriptionExpiry}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button 
                variant="contained" 
                sx={{ 
                  backgroundColor: 'white', 
                  color: '#2563eb',
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                  fontWeight: 'bold'
                }}
                onClick={handleStartAudit}
              >
                {t('dashboard.newAudit', 'Nouvel audit')}
              </Button>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {t('dashboard.remainingAudits', 'Audits restants')}: {userData.userInfo.remainingAudits}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Onglets principaux */}
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: '12px', 
            overflow: 'hidden', 
            mb: 4,
            bgcolor: '#1e2731', // Plus foncé que le fond principal
            color: 'white',
            minHeight: 'calc(100vh - 120px)'
          }}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            sx={{ 
              backgroundColor: '#1a2027',
              '& .MuiTab-root': {
                fontWeight: 'bold',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1.1rem',
                py: 2
              },
              '& .Mui-selected': {
                color: 'white !important'
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#0ea5e9',
                height: '3px'
              }
            }}
          >
            <Tab label={t('dashboard.tabs.summary', 'Résumé')} />
            <Tab label={t('dashboard.tabs.audits', 'Mes audits')} />
            <Tab label={t('dashboard.tabs.notifications', 'Notifications')} />
            <Tab label={t('dashboard.tabs.account', 'Mon compte')} />
          </Tabs>

          {/* Contenu de l'onglet Résumé */}
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={4}>
              {/* Statistiques rapides - masqué pour donner plus de place à l'historique */}
              <Grid item xs={12} md={4} sx={{ display: 'none' }}>
                <Card elevation={2} sx={{ borderRadius: '10px', height: '100%', bgcolor: '#1e2731', color: 'white' }}>
                  <CardHeader 
                    title={t('dashboard.quickStats', 'Statistiques rapides')}
                    titleTypographyProps={{ variant: 'h6', fontWeight: 'bold', color: 'white' }}
                    sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                  />
                  <CardContent>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#0ea5e9' }}>
                        {userData.recentAudits.length}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {t('dashboard.totalAudits', 'Audits réalisés')}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                        {userData.recentAudits.reduce((acc, audit) => acc + audit.score, 0) / userData.recentAudits.length}%
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {t('dashboard.averageScore', 'Score moyen')}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Button 
                        variant="outlined" 
                        sx={{ 
                          mt: 2, 
                          borderColor: '#0ea5e9', 
                          color: '#0ea5e9',
                          '&:hover': {
                            borderColor: '#0ea5e9',
                            backgroundColor: 'rgba(14, 165, 233, 0.1)'
                          }
                        }}
                        fullWidth
                        onClick={handleViewAllStats}
                      >
                        {t('dashboard.viewAllStats', 'Voir toutes les statistiques')}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Derniers audits - Version améliorée */}
              <Grid item xs={12} md={12}>
                <Card 
                  elevation={3} 
                  sx={{ 
                    borderRadius: '12px', 
                    minHeight: 'calc(100vh - 220px)', 
                    bgcolor: 'rgba(30, 39, 49, 0.8)', 
                    color: 'white',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
                      transform: 'translateY(-4px)'
                    },
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <CardHeader 
                    title={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" color="white" sx={{ mr: 1 }}>
                          {t('dashboard.recentAudits', 'Historique des audits')}
                        </Typography>
                        <Box 
                          sx={{ 
                            bgcolor: '#0ea5e9', 
                            color: 'white', 
                            borderRadius: '8px', 
                            px: 2, 
                            py: 0.5, 
                            fontSize: '1rem', 
                            ml: 1 
                          }}
                        >
                          {userData.recentAudits.length}
                        </Box>
                      </Box>
                    }
                    titleTypographyProps={{ variant: 'h6', fontWeight: 'bold', color: 'white' }}
                    sx={{ 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundImage: 'linear-gradient(to right, rgba(14, 165, 233, 0.15), rgba(30, 39, 49, 0))'
                    }}
                    action={
                      <Button 
                        variant="outlined"
                        onClick={handleViewAllAudits}
                        endIcon={<span>→</span>}
                        sx={{ 
                          color: '#ffffff', 
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          '&:hover': {
                            borderColor: '#0ea5e9',
                            backgroundColor: 'rgba(14, 165, 233, 0.1)'
                          },
                          borderRadius: '8px',
                          fontWeight: 'medium'
                        }}
                      >
                        {t('dashboard.viewAll', 'Voir tout')}
                      </Button>
                    }
                  />
                  <CardContent sx={{ p: 0, maxHeight: '400px', overflowY: 'auto' }}>
                    {userData.recentAudits.length > 0 ? (
                      <List sx={{ p: 0 }}>
                        {userData.recentAudits.map((audit) => (
                          <React.Fragment key={audit.id}>
                            <ListItem 
                              sx={{ 
                                p: 2.5,
                                transition: 'all 0.2s ease',
                                '&:hover': { 
                                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                  cursor: 'pointer'
                                }
                              }}
                              onClick={() => handleViewAuditDetails(audit.id)}
                              secondaryAction={
                                <Box 
                                  sx={{ 
                                    bgcolor: audit.score > 80 ? 'rgba(22, 101, 52, 0.3)' : audit.score > 60 ? 'rgba(154, 52, 18, 0.3)' : 'rgba(185, 28, 28, 0.3)',
                                    color: audit.score > 80 ? '#34d399' : audit.score > 60 ? '#fdba74' : '#f87171',
                                    borderRadius: '20px',
                                    px: 2.5,
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    fontSize: '1.6rem',
                                    minWidth: '110px',
                                    textAlign: 'center',
                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                                    border: audit.score > 80 ? '1px solid rgba(52, 211, 153, 0.3)' : audit.score > 60 ? '1px solid rgba(253, 186, 116, 0.3)' : '1px solid rgba(248, 113, 113, 0.3)'
                                  }}
                                >
                                  {audit.score}%
                                </Box>
                              }
                            >
                              <ListItemText 
                                primary={
                                  <Typography variant="h5" fontWeight="bold" color="white" sx={{ mb: 0.5 }}>
                                    {audit.siteName}
                                  </Typography>
                                }
                                secondary={
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box 
                                      component="span"
                                      sx={{ 
                                        fontSize: '0.9rem',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        '&::before': {
                                          content: '""',
                                          width: '8px',
                                          height: '8px',
                                          borderRadius: '50%',
                                          backgroundColor: '#0ea5e9',
                                          display: 'inline-block',
                                          marginRight: '8px'
                                        }
                                      }}
                                    >
                                      {audit.date}
                                    </Box>
                                  </Box>
                                }
                                primaryTypographyProps={{ fontWeight: 'medium', color: 'white' }}
                                secondaryTypographyProps={{ component: 'div' }}
                              />
                            </ListItem>
                            {audit.id !== userData.recentAudits[userData.recentAudits.length - 1].id && (
                              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                            )}
                          </React.Fragment>
                        ))}
                      </List>
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
                        <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                          {t('dashboard.noAuditsYet', "Vous n'avez pas encore d'audits")}
                        </Typography>
                        <Button 
                          variant="contained"
                          color="primary"
                          sx={{
                            background: 'linear-gradient(90deg, #0ea5e9 0%, #2563eb 100%)',
                            borderRadius: '8px',
                            py: 1.2,
                            fontWeight: 'bold'
                          }}
                          onClick={handleStartAudit}
                        >
                          {t('dashboard.startFirstAudit', 'Lancer votre premier audit')}
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Contenu de l'onglet Mes audits - Amélioré */}
          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={3}>
              {/* Graphique d'évolution des scores */}
              <Grid item xs={12}>
                <Card 
                  elevation={3} 
                  sx={{ 
                    borderRadius: '12px', 
                    bgcolor: 'rgba(30, 39, 49, 0.8)', 
                    color: 'white',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease',
                    mb: 3,
                    '&:hover': {
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)'
                    },
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: { xs: 'none', md: 'block' }, 
                    minHeight: '400px'
                  }}
                >
                  <CardHeader 
                    title={
                      <Typography variant="h5" fontWeight="bold" color="white">
                        {t('dashboard.auditTrends', "Évolution des scores d'audit")}
                      </Typography>
                    }
                    titleTypographyProps={{ variant: 'h6', fontWeight: 'bold', color: 'white' }}
                    sx={{ 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundImage: 'linear-gradient(to right, rgba(14, 165, 233, 0.15), rgba(30, 39, 49, 0))'
                    }}
                  />
                  <CardContent sx={{ p: 3, height: '350px' }}>
                    {userData.recentAudits.length > 0 ? (
                      <Box sx={{ height: '100%', position: 'relative' }}>
                        <Line 
                          ref={chartRef}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                              y: {
                                beginAtZero: true,
                                max: 100,
                                grid: {
                                  color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                  color: 'rgba(255, 255, 255, 0.7)'
                                }
                              },
                              x: {
                                grid: {
                                  color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                  color: 'rgba(255, 255, 255, 0.7)'
                                }
                              }
                            },
                            plugins: {
                              legend: {
                                display: true,
                                labels: {
                                  color: 'rgba(255, 255, 255, 0.9)'
                                }
                              },
                              tooltip: {
                                backgroundColor: 'rgba(30, 39, 49, 0.9)',
                                titleColor: 'white',
                                bodyColor: 'white',
                                borderColor: 'rgba(14, 165, 233, 0.5)',
                                borderWidth: 1,
                                displayColors: false,
                                callbacks: {
                                  label: function(context) {
                                    return context.dataset.label + ': ' + context.raw + '%';
                                  }
                                }
                              }
                            }
                          }}
                          data={{
                            labels: [...userData.recentAudits].sort((a, b) => {
                              // Convertir les dates (format DD/MM/YYYY) en objets Date
                              const [aDay, aMonth, aYear] = a.date.split('/');
                              const [bDay, bMonth, bYear] = b.date.split('/');
                              const dateA = new Date(`${aYear}-${aMonth}-${aDay}`);
                              const dateB = new Date(`${bYear}-${bMonth}-${bDay}`);
                              return dateA - dateB;
                            }).map(audit => audit.date),
                            datasets: [
                              {
                                label: 'Score d\'audit',
                                data: [...userData.recentAudits].sort((a, b) => {
                                  const [aDay, aMonth, aYear] = a.date.split('/');
                                  const [bDay, bMonth, bYear] = b.date.split('/');
                                  const dateA = new Date(`${aYear}-${aMonth}-${aDay}`);
                                  const dateB = new Date(`${bYear}-${bMonth}-${bDay}`);
                                  return dateA - dateB;
                                }).map(audit => audit.score),
                                borderColor: '#0ea5e9',
                                backgroundColor: 'rgba(14, 165, 233, 0.2)',
                                borderWidth: 2,
                                pointBorderColor: '#ffffff',
                                pointBackgroundColor: '#0ea5e9',
                                pointRadius: 5,
                                pointHoverRadius: 7,
                                tension: 0.2,
                                fill: true
                              }
                            ]
                          }}
                        />
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {t('dashboard.noDataForChart', 'Pas de données disponibles pour le graphique')}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Card 
                  elevation={3} 
                  sx={{ 
                    borderRadius: '12px', 
                    bgcolor: 'rgba(30, 39, 49, 0.8)', 
                    color: 'white',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)'
                    },
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <CardHeader 
                    title={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" color="white">
                          {t('dashboard.allAudits', 'Historique complet des audits')}
                        </Typography>
                        <Box 
                          sx={{ 
                            bgcolor: '#0ea5e9', 
                            color: 'white', 
                            borderRadius: '8px', 
                            px: 2, 
                            py: 0.5, 
                            fontSize: '1rem', 
                            ml: 1 
                          }}
                        >
                          {userData.recentAudits.length}
                        </Box>
                      </Box>
                    }
                    titleTypographyProps={{ variant: 'h6', fontWeight: 'bold', color: 'white' }}
                    sx={{ 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundImage: 'linear-gradient(to right, rgba(14, 165, 233, 0.15), rgba(30, 39, 49, 0))'
                    }}
                    action={
                      <Button 
                        variant="outlined" 
                        onClick={handleStartAudit}
                        sx={{ 
                          color: '#ffffff', 
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          '&:hover': {
                            borderColor: '#0ea5e9',
                            backgroundColor: 'rgba(14, 165, 233, 0.1)'
                          },
                          borderRadius: '8px',
                          fontWeight: 'medium'
                        }}
                      >
                        {t('dashboard.newAudit', 'Nouvel audit')}
                      </Button>
                    }
                  />
                  {/* Filtres et options de tri */}
                  <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder={t('dashboard.searchAudits', 'Rechercher des audits...')}
                          value={filterText}
                          onChange={(e) => setFilterText(e.target.value)}
                          InputProps={{
                            sx: {
                              color: 'white',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.3)'
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.5)'
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0ea5e9'
                              }
                            }
                          }}
                          sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <FormControl fullWidth variant="outlined" sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}>
                          <InputLabel id="filter-type-label" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('dashboard.filterType', 'Type')}</InputLabel>
                          <Select
                            labelId="filter-type-label"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            label={t('dashboard.filterType', 'Type')}
                            sx={{ 
                              color: 'white',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.3)'
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.5)'
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0ea5e9'
                              }
                            }}
                          >
                            <MenuItem value="all">{t('dashboard.filterAll', 'Tous')}</MenuItem>
                            <MenuItem value="SEO">SEO</MenuItem>
                            <MenuItem value="Performance">Performance</MenuItem>
                            <MenuItem value="Accessibilité">Accessibilité</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <FormControl fullWidth variant="outlined" sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}>
                          <InputLabel id="sort-by-label" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('dashboard.sortBy', 'Trier par')}</InputLabel>
                          <Select
                            labelId="sort-by-label"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            label={t('dashboard.sortBy', 'Trier par')}
                            sx={{ 
                              color: 'white',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.3)'
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.5)'
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0ea5e9'
                              }
                            }}
                          >
                            <MenuItem value="date">{t('dashboard.sortDate', 'Date')}</MenuItem>
                            <MenuItem value="score">{t('dashboard.sortScore', 'Score')}</MenuItem>
                            <MenuItem value="name">{t('dashboard.sortName', 'Nom du site')}</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={2}>
                        <Button 
                          fullWidth
                          variant="contained"
                          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                          sx={{ 
                            bgcolor: 'rgba(14, 165, 233, 0.2)',
                            color: 'white',
                            '&:hover': {
                              bgcolor: 'rgba(14, 165, 233, 0.3)'
                            },
                            height: '56px'
                          }}
                        >
                          {sortOrder === 'asc' ? '↑ Ascendant' : '↓ Descendant'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  <CardContent sx={{ p: 0, maxHeight: '400px', overflowY: 'auto' }}>
                  
                    {userData.recentAudits.length > 0 ? (
                      <Grid container>
                        {userData.recentAudits
                          .filter(audit => {
                            // Filtrage par texte
                            const textMatch = filterText.trim() === '' || 
                              audit.siteName.toLowerCase().includes(filterText.toLowerCase());
                            
                            // Filtrage par type
                            const typeMatch = filterType === 'all' || audit.type === filterType;
                            
                            return textMatch && typeMatch;
                          })
                          .sort((a, b) => {
                            // Tri par différentes colonnes
                            if (sortBy === 'date') {
                              // Convertir les dates (format DD/MM/YYYY) en objets Date
                              const [aDay, aMonth, aYear] = a.date.split('/');
                              const [bDay, bMonth, bYear] = b.date.split('/');
                              const dateA = new Date(`${aYear}-${aMonth}-${aDay}`);
                              const dateB = new Date(`${bYear}-${bMonth}-${bDay}`);
                              return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
                            } else if (sortBy === 'score') {
                              return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
                            } else if (sortBy === 'name') {
                              return sortOrder === 'asc' 
                                ? a.siteName.localeCompare(b.siteName)
                                : b.siteName.localeCompare(a.siteName);
                            }
                            return 0;
                          })
                          .map((audit) => (
                          <Grid item xs={12} key={audit.id}>
                            <Box 
                              sx={{ 
                                p: 3, 
                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.2s ease',
                                '&:hover': { 
                                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                },
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignItems: { xs: 'flex-start', md: 'center' },
                                justifyContent: 'space-between',
                                gap: 2
                              }}
                            >
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" fontWeight="bold" color="white" sx={{ mb: 1 }}>
                                  {audit.siteName}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                                  <Box 
                                    component="span"
                                    sx={{ 
                                      fontSize: '0.9rem',
                                      color: 'rgba(255, 255, 255, 0.7)',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      '&::before': {
                                        content: '""',
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: '#0ea5e9',
                                        display: 'inline-block',
                                        marginRight: '8px'
                                      }
                                    }}
                                  >
                                    {audit.date}
                                  </Box>
                                  <Box 
                                    component="span"
                                    sx={{ 
                                      fontSize: '0.8rem',
                                      fontWeight: 'medium',
                                      color: 'white',
                                      bgcolor: 'rgba(14, 165, 233, 0.2)',
                                      px: 1.5,
                                      py: 0.5,
                                      borderRadius: '12px',
                                      border: '1px solid rgba(14, 165, 233, 0.3)'
                                    }}
                                  >
                                    {audit.type}
                                  </Box>
                                </Box>
                              </Box>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: { xs: 2, md: 0 } }}>
                                <Box 
                                  sx={{ 
                                    bgcolor: audit.score > 80 ? 'rgba(22, 101, 52, 0.3)' : audit.score > 60 ? 'rgba(154, 52, 18, 0.3)' : 'rgba(185, 28, 28, 0.3)',
                                    color: audit.score > 80 ? '#34d399' : audit.score > 60 ? '#fdba74' : '#f87171',
                                    borderRadius: '20px',
                                    px: 2.5,
                                    py: 1.2,
                                    fontWeight: 'bold',
                                    fontSize: '1.25rem',
                                    minWidth: '80px',
                                    textAlign: 'center',
                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                                    border: audit.score > 80 ? '1px solid rgba(52, 211, 153, 0.3)' : audit.score > 60 ? '1px solid rgba(253, 186, 116, 0.3)' : '1px solid rgba(248, 113, 113, 0.3)'
                                  }}
                                >
                                  {audit.score}%
                                </Box>
                                
                                <Button 
                                  variant="contained" 
                                  onClick={() => handleViewAuditDetails(audit.id)}
                                  sx={{ 
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    color: '#ffffff',
                                    '&:hover': {
                                      backgroundColor: 'rgba(14, 165, 233, 0.3)'
                                    },
                                    borderRadius: '8px',
                                    fontWeight: 'medium',
                                    px: 3
                                  }}
                                >
                                  {t('dashboard.viewDetails', 'Détails')}
                                </Button>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Box sx={{ py: 8, textAlign: 'center', px: 4 }}>
                        <Typography variant="h6" sx={{ mb: 3, color: 'white' }}>
                          {t('dashboard.noAuditsMessage', "Vous n'avez pas encore réalisé d'audit")}
                        </Typography>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={handleStartAudit}
                          sx={{
                            background: 'linear-gradient(90deg, #0ea5e9 0%, #2563eb 100%)',
                            color: 'white',
                            py: 1.5,
                            px: 4,
                            borderRadius: '10px',
                            fontWeight: 'bold',
                            fontSize: '1rem'
                          }}
                        >
                          {t('dashboard.startFirstAudit', 'Démarrer votre premier audit')}
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Contenu de l'onglet Notifications */}
          <TabPanel value={activeTab} index={2}>
            <Card elevation={2} sx={{ borderRadius: '10px', bgcolor: '#1e2731', color: 'white' }}>
              <CardHeader 
                title={t('dashboard.notifications', 'Notifications')}
                titleTypographyProps={{ variant: 'h6', fontWeight: 'bold', color: 'white' }}
                sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                action={
                  <Button 
                    size="small"
                    onClick={handleMarkAllAsRead}
                    sx={{ color: '#0ea5e9' }}
                  >
                    {t('dashboard.markAllAsRead', 'Tout marquer comme lu')}
                  </Button>
                }
              />
              <CardContent>
                {userData.notifications.length > 0 ? (
                  <List sx={{ width: '100%' }}>
                    {userData.notifications.map((notification) => (
                      <React.Fragment key={notification.id}>
                        <ListItem 
                          alignItems="flex-start"
                          sx={{ 
                            backgroundColor: notification.isRead ? 'transparent' : 'rgba(14, 165, 233, 0.1)',
                            transition: 'background-color 0.3s'
                          }}
                        >
                          <ListItemIcon sx={{ mt: 0 }}>
                            <Box 
                              sx={{ 
                                width: 8, 
                                height: 8, 
                                borderRadius: '50%', 
                                bgcolor: notification.isRead ? 'transparent' : '#0ea5e9',
                                mt: 1.5
                              }} 
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={<Typography color="white">{notification.message}</Typography>}
                            secondary={<Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{notification.date}</Typography>}
                          />
                        </ListItem>
                        <Divider component="li" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body1" sx={{ textAlign: 'center', py: 4, color: 'white' }}>
                    {t('dashboard.noNotifications', "Vous n'avez pas de notifications")}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </TabPanel>

          {/* Contenu de l'onglet Mon compte */}
          <TabPanel value={activeTab} index={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card elevation={2} sx={{ borderRadius: '10px', bgcolor: '#1e2731', color: 'white' }}>
                  <CardHeader 
                    title={t('dashboard.accountInfo', 'Informations du compte')}
                    titleTypographyProps={{ variant: 'h6', fontWeight: 'bold', color: 'white' }}
                    sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                  />
                  <CardContent>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary={<Typography color="rgba(255, 255, 255, 0.7)">{t('dashboard.name', 'Nom')}</Typography>}
                          secondary={<Typography color="white">{userData.userInfo.name}</Typography>}
                        />
                      </ListItem>
                      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                      <ListItem>
                        <ListItemText 
                          primary={<Typography color="rgba(255, 255, 255, 0.7)">{t('dashboard.email', 'Email')}</Typography>}
                          secondary={<Typography color="white">{userData.userInfo.email}</Typography>}
                        />
                      </ListItem>
                      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                      <ListItem>
                        <ListItemText 
                          primary={<Typography color="rgba(255, 255, 255, 0.7)">{t('dashboard.subscription', 'Abonnement')}</Typography>}
                          secondary={<Typography color="white">{userData.userInfo.subscription}</Typography>}
                        />
                      </ListItem>
                      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                      <ListItem>
                        <ListItemText 
                          primary={<Typography color="rgba(255, 255, 255, 0.7)">{t('dashboard.expiryDate', "Date d'expiration")}</Typography>}
                          secondary={<Typography color="white">{userData.userInfo.subscriptionExpiry}</Typography>}
                        />
                      </ListItem>
                    </List>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                      <Button 
                        variant="outlined" 
                        sx={{ 
                          mr: 1,
                          borderColor: '#0ea5e9', 
                          color: '#0ea5e9',
                          '&:hover': {
                            borderColor: '#0ea5e9',
                            backgroundColor: 'rgba(14, 165, 233, 0.1)'
                          }
                        }}
                        onClick={handleEditProfile}
                      >
                        {t('dashboard.editProfile', 'Modifier le profil')}
                      </Button>
                      <Button 
                        variant="contained" 
                        sx={{ 
                          background: 'linear-gradient(90deg, #0ea5e9 0%, #2563eb 100%)',
                          color: 'white',
                        }}
                        onClick={handleUpgradePlan}
                      >
                        {t('dashboard.upgradePlan', 'Mettre à niveau')}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card elevation={2} sx={{ borderRadius: '10px', height: '100%', bgcolor: '#1e2731', color: 'white' }}>
                  <CardHeader 
                    title={t('dashboard.accountSettings', 'Paramètres du compte')}
                    titleTypographyProps={{ variant: 'h6', fontWeight: 'bold', color: 'white' }}
                    sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                  />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      sx={{ 
                        justifyContent: 'flex-start', 
                        py: 1.5,
                        borderColor: 'rgba(255, 255, 255, 0.23)', 
                        color: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                      onClick={handleChangePassword}
                    >
                      {t('dashboard.changePassword', 'Changer le mot de passe')}
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      sx={{ 
                        justifyContent: 'flex-start', 
                        py: 1.5,
                        borderColor: 'rgba(255, 255, 255, 0.23)', 
                        color: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                      onClick={handleNotificationSettings}
                    >
                      {t('dashboard.notificationSettings', 'Paramètres de notification')}
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      sx={{ 
                        justifyContent: 'flex-start', 
                        py: 1.5,
                        borderColor: 'rgba(255, 255, 255, 0.23)', 
                        color: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                      onClick={handlePrivacySettings}
                    >
                      {t('dashboard.privacySettings', 'Paramètres de confidentialité')}
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error"
                      fullWidth
                      sx={{ 
                        justifyContent: 'flex-start', 
                        py: 1.5, 
                        mt: 'auto',
                        borderColor: 'rgba(244, 67, 54, 0.5)', 
                        color: '#f44336',
                        '&:hover': {
                          borderColor: '#f44336',
                          backgroundColor: 'rgba(244, 67, 54, 0.1)'
                        }
                      }}
                      onClick={handleDeleteAccount}
                    >
                      {t('dashboard.deleteAccount', 'Supprimer le compte')}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
