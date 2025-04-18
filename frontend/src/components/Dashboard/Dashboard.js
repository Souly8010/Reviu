import React, { useState, useEffect } from 'react';
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
  Alert
} from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    { id: 1, siteName: 'example1.com', date: '10/04/2025', score: 87 },
    { id: 2, siteName: 'example2.org', date: '05/04/2025', score: 62 },
    { id: 3, siteName: 'example3.net', date: '28/03/2025', score: 93 }
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
  const [error, setError] = useState(null);

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
        pt: 2,
        pb: 6
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ mt: 4, mb: 4 }}
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
            mb: 4,
            textAlign: 'center'
          }}
        >
          {t('dashboard.title', 'Tableau de bord')}
        </Typography>

        {/* Résumé de l'utilisateur */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            mb: 4, 
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
              <Typography variant="h5">{t('dashboard.welcome', 'Bienvenue')}, {userData.userInfo.name}!</Typography>
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
          elevation={2} 
          sx={{ 
            borderRadius: '12px', 
            overflow: 'hidden', 
            mb: 4,
            bgcolor: '#1e2731', // Plus foncé que le fond principal
            color: 'white'
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
                color: 'rgba(255, 255, 255, 0.7)'
              },
              '& .Mui-selected': {
                color: 'white !important'
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#0ea5e9'
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
              {/* Statistiques rapides */}
              <Grid item xs={12} md={4}>
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

              {/* Derniers audits */}
              <Grid item xs={12} md={8}>
                <Card elevation={2} sx={{ borderRadius: '10px', height: '100%', bgcolor: '#1e2731', color: 'white' }}>
                  <CardHeader 
                    title={t('dashboard.recentAudits', 'Audits récents')}
                    titleTypographyProps={{ variant: 'h6', fontWeight: 'bold', color: 'white' }}
                    sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                    action={
                      <Button 
                        color="primary"
                        onClick={handleViewAllAudits}
                        sx={{ color: '#0ea5e9' }}
                      >
                        {t('dashboard.viewAll', 'Voir tout')}
                      </Button>
                    }
                  />
                  <CardContent>
                    {userData.recentAudits.length > 0 ? (
                      <List>
                        {userData.recentAudits.map((audit) => (
                          <React.Fragment key={audit.id}>
                            <ListItem 
                              secondaryAction={
                                <Box 
                                  sx={{ 
                                    bgcolor: audit.score > 80 ? 'rgba(22, 101, 52, 0.2)' : audit.score > 60 ? 'rgba(154, 52, 18, 0.2)' : 'rgba(185, 28, 28, 0.2)',
                                    color: audit.score > 80 ? '#34d399' : audit.score > 60 ? '#fdba74' : '#f87171',
                                    borderRadius: '16px',
                                    px: 2,
                                    py: 0.5,
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {audit.score}%
                                </Box>
                              }
                            >
                              <ListItemText 
                                primary={audit.siteName} 
                                secondary={audit.date}
                                primaryTypographyProps={{ fontWeight: 'medium', color: 'white' }}
                                secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.7)' }}
                              />
                            </ListItem>
                            {audit.id !== userData.recentAudits[userData.recentAudits.length - 1].id && (
                              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                            )}
                          </React.Fragment>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body1" sx={{ textAlign: 'center', py: 3, color: 'white' }}>
                        {t('dashboard.noAuditsYet', "Vous n'avez pas encore d'audits")}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Contenu de l'onglet Mes audits */}
          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card elevation={2} sx={{ borderRadius: '10px', bgcolor: '#1e2731', color: 'white' }}>
                  <CardHeader 
                    title={t('dashboard.allAudits', 'Tous mes audits')}
                    titleTypographyProps={{ variant: 'h6', fontWeight: 'bold', color: 'white' }}
                    sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                  />
                  <CardContent>
                    {userData.recentAudits.length > 0 ? (
                      <List>
                        {userData.recentAudits.map((audit) => (
                          <React.Fragment key={audit.id}>
                            <ListItem 
                              sx={{ 
                                '&:hover': { 
                                  backgroundColor: 'rgba(255, 255, 255, 0.05)' 
                                }
                              }}
                              secondaryAction={
                                <Button 
                                  variant="outlined" 
                                  size="small" 
                                  color="primary"
                                  onClick={() => handleViewAuditDetails(audit.id)}
                                  sx={{ 
                                    borderColor: '#0ea5e9', 
                                    color: '#0ea5e9',
                                    '&:hover': {
                                      borderColor: '#0ea5e9',
                                      backgroundColor: 'rgba(14, 165, 233, 0.1)'
                                    }
                                  }}
                                >
                                  {t('dashboard.viewDetails', 'Détails')}
                                </Button>
                              }
                            >
                              <ListItemText 
                                primary={
                                  <Typography variant="subtitle1" fontWeight="medium" color="white">
                                    {audit.siteName}
                                  </Typography>
                                }
                                secondary={
                                  <Grid container spacing={1} alignItems="center">
                                    <Grid item>
                                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        {audit.date}
                                      </Typography>
                                    </Grid>
                                    <Grid item>
                                      <Box 
                                        component="span" 
                                        sx={{ 
                                          bgcolor: audit.score > 80 ? 'rgba(22, 101, 52, 0.2)' : audit.score > 60 ? 'rgba(154, 52, 18, 0.2)' : 'rgba(185, 28, 28, 0.2)',
                                          color: audit.score > 80 ? '#34d399' : audit.score > 60 ? '#fdba74' : '#f87171',
                                          borderRadius: '16px',
                                          px: 1.5,
                                          py: 0.3,
                                          fontSize: '0.75rem',
                                          fontWeight: 'bold'
                                        }}
                                      >
                                        {audit.score}%
                                      </Box>
                                    </Grid>
                                  </Grid>
                                }
                              />
                            </ListItem>
                            <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                          </React.Fragment>
                        ))}
                      </List>
                    ) : (
                      <Box sx={{ py: 5, textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ mb: 2, color: 'white' }}>
                          {t('dashboard.noAuditsMessage', "Vous n'avez pas encore réalisé d'audit")}
                        </Typography>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={handleStartAudit}
                          sx={{
                            background: 'linear-gradient(90deg, #0ea5e9 0%, #2563eb 100%)',
                            color: 'white',
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
