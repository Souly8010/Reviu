import React from 'react';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CookiesPolicy = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: 8, backgroundColor: '#0f0f0f' }}>
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            textAlign: 'center',
            mb: 6
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              color: '#ffffff',
              mb: 2
            }}
          >
            {t('cookies.title', 'Politique des Cookies')}
          </Typography>
          <Typography 
            variant="subtitle1"
            sx={{ 
              fontSize: '1.1rem',
              color: '#94a3b8',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            {t('cookies.subtitle', 'Dernière mise à jour : 20 avril 2025')}
          </Typography>
        </Box>

        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)',
            backgroundColor: '#0f0f0f',
            color: '#ffffff'
          }}
        >
          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
            {t('cookies.introduction', "Chez Reviu, nous utilisons des cookies et autres technologies similaires pour améliorer votre expérience sur notre site et nos applications. Cette politique de cookies explique comment et pourquoi nous utilisons ces technologies et les choix qui s'offrent à vous.")}
          </Typography>

          <section>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                color: '#0ea5e9',
                mb: 2,
                mt: 4
              }}
            >
              {t('cookies.what.title', '1. Qu\'est-ce qu\'un cookie ?')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('cookies.what.content', "Un cookie est un petit fichier texte qu'un site web sauvegarde sur votre ordinateur ou appareil mobile lorsque vous visitez ce site. Il permet au site de mémoriser vos actions et préférences (comme la langue, la taille de la police et d'autres paramètres d'affichage) pendant un certain temps, afin que vous n'ayez pas à les réindiquer à chaque fois que vous visitez le site ou naviguez d'une page à une autre.")}
            </Typography>
          </section>

          <Divider sx={{ my: 4, borderColor: 'rgba(148, 163, 184, 0.2)' }} />

          <section>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                color: '#0ea5e9',
                mb: 2
              }}
            >
              {t('cookies.types.title', '2. Types de cookies que nous utilisons')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('cookies.types.content', "Nous utilisons différents types de cookies pour diverses raisons :")}
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                <strong>{t('cookies.types.essential', 'Cookies essentiels')} : </strong>
                {t('cookies.types.essentialDesc', 'Ces cookies sont nécessaires au fonctionnement du site. Ils vous permettent de naviguer sur le site et d\'utiliser ses fonctionnalités, comme l\'accès aux zones sécurisées. Sans ces cookies, les services que vous avez demandés, comme l\'accès à votre compte, ne peuvent pas être fournis.')}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                <strong>{t('cookies.types.preferences', 'Cookies de préférences')} : </strong>
                {t('cookies.types.preferencesDesc', 'Ces cookies permettent au site de mémoriser les choix que vous avez faits (comme votre nom d\'utilisateur, votre langue ou la région où vous vous trouvez) et fournissent des fonctionnalités améliorées et plus personnalisées.')}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                <strong>{t('cookies.types.analytics', 'Cookies statistiques')} : </strong>
                {t('cookies.types.analyticsDesc', 'Ces cookies recueillent des informations sur la façon dont vous utilisez un site web, par exemple quelles pages vous visitez le plus souvent et si vous recevez des messages d\'erreur. Ils nous aident à comprendre comment les visiteurs interagissent avec le site, ce qui nous permet d\'améliorer son fonctionnement.')}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                <strong>{t('cookies.types.marketing', 'Cookies marketing')} : </strong>
                {t('cookies.types.marketingDesc', 'Ces cookies sont utilisés pour suivre les visiteurs sur les sites web. L\'intention est d\'afficher des publicités qui sont pertinentes et intéressantes pour l\'utilisateur individuel et donc plus précieuses pour les éditeurs et les annonceurs tiers.')}
              </Typography>
            </Box>
          </section>

          <Divider sx={{ my: 4, borderColor: 'rgba(148, 163, 184, 0.2)' }} />

          <section>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                color: '#0ea5e9',
                mb: 2
              }}
            >
              {t('cookies.thirdParty.title', '3. Cookies tiers')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('cookies.thirdParty.content1', "En plus de nos propres cookies, nous pouvons également utiliser diverses technologies tierces pour améliorer votre expérience et nos services. Ces technologies peuvent inclure :")}
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('cookies.thirdParty.item1', 'Google Analytics pour nous aider à comprendre comment nos clients utilisent le site.')}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('cookies.thirdParty.item2', 'Des réseaux sociaux tels que Facebook et Twitter, qui peuvent utiliser des cookies sur notre site pour la personnalisation et la publicité.')}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('cookies.thirdParty.item3', 'Des partenaires publicitaires qui peuvent utiliser des cookies pour collecter des informations sur vos activités sur notre site et d\'autres sites afin de vous fournir des publicités ciblées.')}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('cookies.thirdParty.content2', "Ces services tiers ont leurs propres politiques de confidentialité et peuvent être amenés à utiliser les informations collectées pour leurs propres finalités.")}
            </Typography>
          </section>

          <Divider sx={{ my: 4, borderColor: 'rgba(148, 163, 184, 0.2)' }} />

          <section>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                color: '#0ea5e9',
                mb: 2
              }}
            >
              {t('cookies.control.title', '4. Comment contrôler les cookies')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('cookies.control.content1', "Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies déjà présents sur votre appareil et vous pouvez configurer la plupart des navigateurs pour qu'ils les bloquent. Mais si vous faites cela, vous devrez peut-être ajuster manuellement certaines préférences chaque fois que vous visiterez un site, et certains services et fonctionnalités risquent de ne pas fonctionner.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('cookies.control.content2', "Vous pouvez généralement modifier les paramètres de votre navigateur pour refuser les cookies. Voici comment faire dans différents navigateurs :")}
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                <strong>Chrome : </strong>
                {t('cookies.control.chrome', 'Menu > Paramètres > Afficher les paramètres avancés > Confidentialité > Paramètres de contenu > Cookies')}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                <strong>Firefox : </strong>
                {t('cookies.control.firefox', 'Menu > Options > Vie privée et sécurité > Historique > Paramètres pour l\'historique > Cookies')}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                <strong>Safari : </strong>
                {t('cookies.control.safari', 'Préférences > Confidentialité > Cookies et données de site web')}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                <strong>Edge : </strong>
                {t('cookies.control.edge', 'Menu > Paramètres > Paramètres avancés > Cookies')}
              </Typography>
            </Box>
          </section>

          <Divider sx={{ my: 4, borderColor: 'rgba(148, 163, 184, 0.2)' }} />

          <section>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                color: '#0ea5e9',
                mb: 2
              }}
            >
              {t('cookies.updates.title', '5. Mises à jour de notre politique de cookies')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('cookies.updates.content', "Nous pouvons mettre à jour cette politique de cookies de temps à autre pour refléter, par exemple, les changements apportés aux cookies que nous utilisons ou pour d'autres raisons opérationnelles, légales ou réglementaires. Veuillez donc consulter régulièrement cette politique pour rester informé de notre utilisation des cookies et des technologies associées.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('cookies.updates.content2', "La date en haut de cette politique indique quand elle a été mise à jour pour la dernière fois.")}
            </Typography>
          </section>

          <Divider sx={{ my: 4, borderColor: 'rgba(148, 163, 184, 0.2)' }} />

          <section>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                color: '#0ea5e9',
                mb: 2
              }}
            >
              {t('cookies.contact.title', '6. Contact')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('cookies.contact.content', "Si vous avez des questions concernant notre utilisation des cookies ou d'autres technologies, veuillez nous contacter à :")}
            </Typography>
            <Box sx={{ pl: 4, mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7, fontWeight: 600 }}>
                {t('cookies.contact.company', "Reviu")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('cookies.contact.email', "Email : privacy@reviu.com")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('cookies.contact.address', "Adresse : 123 Avenue de la République, 75000 Paris, France")}
              </Typography>
            </Box>
          </section>
        </Paper>
      </Container>
    </Box>
  );
};

export default CookiesPolicy;
