import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des fichiers de traduction
import fr from './locales/fr.json';
import en from './locales/en.json';
// import nl from './locales/nl.json';
import privacyFr from './locales/privacy.fr.json';
import termsFr from './locales/terms.fr.json';
import legalFr from './locales/legal.fr.json';
import cookiesFr from './locales/cookies.fr.json';

// Import des fichiers de traduction anglais
import privacyEn from './locales/privacy.en.json';
import termsEn from './locales/terms.en.json';
import legalEn from './locales/legal.en.json';
import cookiesEn from './locales/cookies.en.json';


// Configuration i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: {...fr, ...privacyFr, ...termsFr, ...legalFr, ...cookiesFr}
      },
      en: {
        translation: {...en, ...privacyEn, ...termsEn, ...legalEn, ...cookiesEn}
      },
      // nl: {
      //   translation: nl
      // }
    },
    fallbackLng: 'fr',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false // réagit échappe déjà par défaut
    }
  });

export default i18n;
