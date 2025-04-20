import React from 'react';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: 8, backgroundColor: '#0f0f0f', color: '#ffffff' }}>
      <Container maxWidth="lg" sx={{ backgroundColor: '#0f0f0f', color: '#ffffff' }}>
        <Box 
          sx={{ 
            textAlign: 'center',
            mb: 6,
            backgroundColor: '#0f0f0f', 
            color: '#ffffff'
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
            {t('privacy.title', 'Charte de Confidentialité')}
          </Typography>
          <Typography 
            variant="subtitle1"
            sx={{ 
              fontSize: '1.1rem',
              color: '#ffffff',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            {t('privacy.subtitle', 'Dernière mise à jour : 20 avril 2025')}
          </Typography>
        </Box>

        <Box 
          sx={{ 
            p: { xs: 3, md: 5 },
            backgroundColor: '#0f0f0f',
            color: '#ffffff'
          }}
        >
          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
            {t('privacy.introduction', "Chez Reviu, nous prenons très au sérieux la confidentialité de vos données personnelles. Cette charte de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations lorsque vous utilisez notre plateforme.")}
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
              {t('privacy.dataCollection.title', '1. Collecte des données')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('privacy.dataCollection.content', "Nous collectons les informations suivantes lorsque vous utilisez notre plateforme :")}
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.dataCollection.item1', "Informations d'inscription : Nom, prénom, adresse e-mail, numéro de téléphone.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.dataCollection.item2', "Informations d'entreprise : Nom de l'entreprise, nombre d'établissements, localisation.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.dataCollection.item3', "Données d'utilisation : Informations sur la façon dont vous interagissez avec notre plateforme, y compris les fonctionnalités utilisées et le temps passé.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.dataCollection.item4', "Informations techniques : Adresse IP, type de navigateur, appareil utilisé, pages visitées, date et heure d'accès.")}
              </Typography>
            </Box>
          </section>

          <Divider sx={{ my: 4 }} />

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
              {t('privacy.dataUse.title', '2. Utilisation des données')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('privacy.dataUse.content', "Nous utilisons vos données personnelles pour :")}
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.dataUse.item1', "Fournir, maintenir et améliorer nos services.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.dataUse.item2', "Personnaliser votre expérience et vous offrir un contenu adapté à vos besoins.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.dataUse.item3', "Communiquer avec vous à propos des mises à jour, des offres spéciales ou d'autres informations relatives à nos services.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.dataUse.item4', "Analyser l'utilisation de notre plateforme pour améliorer nos services et développer de nouvelles fonctionnalités.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.dataUse.item5', "Protéger les droits, la propriété et la sécurité de notre plateforme et de nos utilisateurs.")}
              </Typography>
            </Box>
          </section>

          <Divider sx={{ my: 4 }} />

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
              {t('privacy.dataSharing.title', '3. Partage des données')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('privacy.dataSharing.content', "Nous ne vendons pas vos informations personnelles à des tiers. Nous pouvons partager vos données dans les cas suivants :")}
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.dataSharing.item1', "Avec des prestataires de services qui nous aident à exploiter notre plateforme (hébergement, traitement des paiements, analyses, etc.).")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.dataSharing.item2', "Lorsque cela est requis par la loi, dans le cadre d'une procédure judiciaire ou pour protéger nos droits.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.dataSharing.item3', "Dans le cadre d'une fusion, acquisition ou vente d'actifs, sous réserve que les informations personnelles restent protégées.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.dataSharing.item4', "Avec votre consentement explicite ou à votre demande.")}
              </Typography>
            </Box>
          </section>

          <Divider sx={{ my: 4 }} />

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
              {t('privacy.cookies.title', '4. Cookies et technologies similaires')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('privacy.cookies.content', "Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience, comprendre comment notre plateforme est utilisée et vous offrir du contenu personnalisé. Vous pouvez contrôler l'utilisation des cookies via les paramètres de votre navigateur.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('privacy.cookies.content2', "Nous utilisons différents types de cookies :")}
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.cookies.item1', "Cookies essentiels : nécessaires au fonctionnement de base de notre plateforme.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.cookies.item2', "Cookies de préférences : permettent de mémoriser vos préférences et paramètres.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.cookies.item3', "Cookies analytiques : nous aident à comprendre comment les utilisateurs interagissent avec notre plateforme.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.cookies.item4', "Cookies marketing : utilisés pour vous montrer des publicités pertinentes sur d'autres sites web.")}
              </Typography>
            </Box>
          </section>

          <Divider sx={{ my: 4 }} />

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
              {t('privacy.security.title', '5. Sécurité des données')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('privacy.security.content', "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, l'utilisation abusive, l'accès non autorisé, la divulgation ou la modification.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('privacy.security.content2', "Ces mesures incluent le chiffrement des données, les contrôles d'accès, les pare-feu et les pratiques de développement sécurisées. Nous vérifions régulièrement nos systèmes pour détecter d'éventuelles vulnérabilités ou attaques.")}
            </Typography>
          </section>

          <Divider sx={{ my: 4 }} />

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
              {t('privacy.rights.title', '6. Vos droits')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('privacy.rights.content', "Selon votre juridiction, vous pouvez disposer des droits suivants concernant vos données personnelles :")}
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.rights.item1', "Droit d'accès : Vous pouvez demander une copie de vos données personnelles que nous détenons.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.rights.item2', "Droit de rectification : Vous pouvez nous demander de corriger ou de mettre à jour vos données personnelles inexactes ou incomplètes.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.rights.item3', "Droit à l'effacement : Vous pouvez nous demander de supprimer vos données personnelles dans certaines circonstances.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.rights.item4', "Droit à la limitation du traitement : Vous pouvez nous demander de limiter le traitement de vos données personnelles dans certaines circonstances.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.rights.item5', "Droit à la portabilité des données : Vous pouvez nous demander de transférer vos données personnelles à un autre fournisseur de services.")}
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.rights.item6', "Droit d'opposition : Vous pouvez vous opposer au traitement de vos données personnelles dans certaines circonstances.")}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('privacy.rights.content2', "Pour exercer l'un de ces droits, veuillez nous contacter à l'adresse mentionnée dans la section 'Contactez-nous' ci-dessous.")}
            </Typography>
          </section>

          <Divider sx={{ my: 4 }} />

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
              {t('privacy.changes.title', '7. Modifications de la charte de confidentialité')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('privacy.changes.content', "Nous pouvons mettre à jour cette charte de confidentialité de temps à autre pour refléter les changements dans nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires. Nous vous encourageons à la consulter régulièrement.")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('privacy.changes.content2', "En cas de modifications importantes, nous vous en informerons par le biais d'un avis sur notre site web ou par e-mail avant que les modifications ne prennent effet.")}
            </Typography>
          </section>

          <Divider sx={{ my: 4 }} />

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
              {t('privacy.contact.title', '8. Contactez-nous')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('privacy.contact.content', "Si vous avez des questions ou des préoccupations concernant cette charte de confidentialité ou nos pratiques en matière de données, veuillez nous contacter à :")}
            </Typography>
            <Box sx={{ pl: 4, mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7, fontWeight: 600 }}>
                {t('privacy.contact.company', "Reviu")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.contact.email', "Email : privacy@reviu.com")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                {t('privacy.contact.address', "Adresse : 123 Avenue de la Confidentialité, 75000 Paris, France")}
              </Typography>
            </Box>
          </section>
        </Box>
      </Container>
    </Box>
  );
};

export default Privacy;
