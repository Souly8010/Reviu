import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des fichiers de traduction
import fr from './locales/fr.json';
import en from './locales/en.json';
import es from './locales/es.json';
import nl from './locales/nl.json';
import privacyFr from './locales/privacy.fr.json';
import termsFr from './locales/terms.fr.json';
import legalFr from './locales/legal.fr.json';
import cookiesFr from './locales/cookies.fr.json';

// Import des fichiers de traduction anglais
import privacyEn from './locales/privacy.en.json';
import termsEn from './locales/terms.en.json';
import legalEn from './locales/legal.en.json';
import cookiesEn from './locales/cookies.en.json';

// Import des fichiers de traduction espagnols
import privacyEs from './locales/privacy.es.json';
import termsEs from './locales/terms.es.json';
import legalEs from './locales/legal.es.json';
import cookiesEs from './locales/cookies.es.json';


// Configuration i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: {...fr, ...privacyFr, ...termsFr, ...legalFr, ...cookiesFr}
      },
      en: {
        translation: {...en, ...privacyEn, ...termsEn, ...legalEn, ...cookiesEn}
      },
      es: {
        translation: {...es, ...privacyEs, ...termsEs, ...legalEs, ...cookiesEs}
      },
      nl: {
        translation: nl
      }
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false // réagit échappe déjà par défaut
    }
  });

export default i18n;
