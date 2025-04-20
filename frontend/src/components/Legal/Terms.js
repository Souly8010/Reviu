import React from 'react';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Terms = () => {
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
            {t('terms.title', 'Conditions d\'utilisation')}
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
            {t('terms.subtitle', 'Dernière mise à jour : 20 avril 2025')}
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
            {t('terms.introduction', "Bienvenue sur Reviu. En utilisant notre site et nos services, vous acceptez de vous conformer aux présentes conditions d'utilisation et de les respecter. Veuillez les lire attentivement.")}
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
              {t('terms.acceptance.title', '1. Acceptation des Conditions')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.acceptance.content', "En accédant à notre site et en utilisant nos services, vous reconnaissez avoir lu, compris et accepté d'être lié par les présentes conditions. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site ou nos services.")}
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
              {t('terms.account.title', '2. Création de compte et Responsabilités')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.account.content1', "Pour utiliser certaines fonctionnalités de notre service, vous devez créer un compte. Vous êtes responsable de maintenir la confidentialité de vos informations de connexion et de toutes les activités qui se produisent sous votre compte.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.account.content2', "Vous acceptez de nous informer immédiatement de toute utilisation non autorisée de votre compte ou de toute autre violation de sécurité. Nous ne serons pas responsables des pertes résultant de l'accès non autorisé à votre compte si vous n'avez pas pris des mesures de sécurité raisonnables.")}
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
              {t('terms.services.title', '3. Services et Abonnements')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.services.content1', "Reviu offre des services d'analyse et de gestion des avis clients. Nos services sont disponibles selon différentes formules d'abonnement, dont les détails et tarifs sont présentés sur notre page de tarification.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.services.content2', "Nous nous réservons le droit de modifier, suspendre ou interrompre tout aspect du service à tout moment, y compris la disponibilité de fonctionnalités, de bases de données ou de contenu.")}
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
              {t('terms.payment.title', '4. Paiements et Facturation')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.payment.content1', "En souscrivant à un abonnement payant, vous acceptez de nous fournir des informations de paiement exactes et complètes. Vous autorisez également Reviu à facturer les frais d'abonnement à votre moyen de paiement.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.payment.content2', "Les abonnements se renouvellent automatiquement jusqu'à résiliation. Vous pouvez annuler votre abonnement à tout moment, et vous continuerez à avoir accès aux services jusqu'à la fin de votre période de facturation en cours.")}
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
              {t('terms.intellectual.title', '5. Propriété intellectuelle')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.intellectual.content1', "Le contenu de notre site, y compris les textes, graphiques, logos, icônes et images, ainsi que leur arrangement, sont la propriété exclusive de Reviu et sont protégés par les lois sur la propriété intellectuelle.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.intellectual.content2', "Aucun contenu du site ne peut être copié, reproduit, republié, téléchargé, posté, transmis ou distribué de quelque manière que ce soit sans l'autorisation écrite préalable de Reviu.")}
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
              {t('terms.termination.title', '6. Résiliation')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.termination.content1', "Nous nous réservons le droit de résilier ou de suspendre votre compte et l'accès à nos services, sans préavis, pour violation des présentes conditions d'utilisation ou pour toute autre raison à notre seule discrétion.")}
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
              {t('terms.disclaimer.title', '7. Limitation de responsabilité')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.disclaimer.content1', "Nos services sont fournis \"tels quels\" et \"selon disponibilité\" sans garantie d'aucune sorte. Nous ne garantissons pas que nos services répondront à vos exigences ou seront disponibles de manière ininterrompue, sécurisée ou sans erreur.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.disclaimer.content2', "En aucun cas, Reviu ne sera responsable des dommages indirects, spéciaux, accessoires ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser nos services.")}
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
              {t('terms.modifications.title', '8. Modifications des Conditions')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.modifications.content', "Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur le site. Il est de votre responsabilité de consulter régulièrement ces conditions pour prendre connaissance des modifications.")}
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
              {t('terms.contact.title', '9. Contactez-nous')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('terms.contact.content', "Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante :")}
            </Typography>
            <Box sx={{ pl: 4, mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7, fontWeight: 600 }}>
                {t('terms.contact.company', "Reviu")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('terms.contact.email', "Email : legal@reviu.com")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('terms.contact.address', "Adresse : 123 Avenue de la Confidentialité, 75000 Paris, France")}
              </Typography>
            </Box>
          </section>
        </Paper>
      </Container>
    </Box>
  );
};

export default Terms;
