import React from 'react';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LegalNotice = () => {
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
            {t('legal.title', 'Mentions Légales')}
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
            {t('legal.subtitle', 'Dernière mise à jour : 20 avril 2025')}
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
          <section>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                color: '#0ea5e9',
                mb: 2,
                mt: 2
              }}
            >
              {t('legal.companyInfo.title', '1. Informations légales')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('legal.companyInfo.content1', "Le site Reviu est édité par :")}
            </Typography>
            <Box sx={{ pl: 4, mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7, fontWeight: 600 }}>
                {t('legal.companyInfo.companyName', "Reviu SAS")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('legal.companyInfo.address', "Siège social : 123 Avenue de la République, 75000 Paris, France")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('legal.companyInfo.capital', "Capital social : 10 000 €")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('legal.companyInfo.rcs', "RCS Paris B 123 456 789")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('legal.companyInfo.vatNumber', "Numéro de TVA intracommunautaire : FR 12 345 678 910")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('legal.companyInfo.director', "Directeur de la publication : Jean Dupont")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('legal.companyInfo.email', "Email : contact@reviu.com")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('legal.companyInfo.phone', "Téléphone : +33 1 23 45 67 89")}
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
              {t('legal.hosting.title', '2. Hébergement')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('legal.hosting.content', "Le site Reviu est hébergé par :")}
            </Typography>
            <Box sx={{ pl: 4, mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7, fontWeight: 600 }}>
                {t('legal.hosting.name', "OVH SAS")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('legal.hosting.address', "Siège social : 2 rue Kellermann - 59100 Roubaix - France")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('legal.hosting.website', "Site web : www.ovh.com")}
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
              {t('legal.intellectualProperty.title', '3. Propriété intellectuelle')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('legal.intellectualProperty.content1', "L'ensemble du contenu de ce site, incluant, de façon non limitative, les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme sont la propriété exclusive de Reviu à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('legal.intellectualProperty.content2', "Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de Reviu. Cette représentation ou reproduction, par quelque procédé que ce soit, constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.")}
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
              {t('legal.personalData.title', '4. Données personnelles')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('legal.personalData.content1', "Les informations recueillies sur notre site font l'objet d'un traitement informatique destiné à améliorer votre expérience utilisateur et à vous proposer des services personnalisés.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('legal.personalData.content2', "Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée et au Règlement européen n°2016/679/UE du 27 avril 2016, vous bénéficiez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données ou encore de limitation du traitement.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('legal.personalData.content3', "Vous pouvez exercer ces droits en nous contactant à l'adresse : privacy@reviu.com")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('legal.personalData.content4', "Pour plus d'informations sur la façon dont nous traitons vos données, veuillez consulter notre Politique de confidentialité.")}
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
              {t('legal.links.title', '5. Liens hypertextes')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('legal.links.content1', "Le site Reviu peut contenir des liens hypertextes vers d'autres sites internet ou d'autres ressources disponibles sur Internet. Reviu ne dispose d'aucun moyen pour contrôler les sites en connexion avec son site internet et ne répond pas de la disponibilité de tels sites et sources externes.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('legal.links.content2', "Reviu ne peut être tenue pour responsable de tout dommage, de quelque nature que ce soit, résultant du contenu de ces sites ou sources externes, et notamment des informations, produits ou services qu'ils proposent, ou de tout usage qui peut être fait de ces éléments.")}
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
              {t('legal.contact.title', '6. Contact')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('legal.contact.content', "Pour toute question relative à ce site, veuillez nous contacter à l'adresse suivante :")}
            </Typography>
            <Box sx={{ pl: 4, mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('legal.contact.email', "Email : legal@reviu.com")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('legal.contact.address', "Adresse postale : 123 Avenue de la République, 75000 Paris, France")}
              </Typography>
            </Box>
          </section>
        </Paper>
      </Container>
    </Box>
  );
};

export default LegalNotice;
