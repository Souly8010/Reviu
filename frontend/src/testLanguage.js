import i18n from './i18n/i18n';

// Cette fonction permet de tester le changement de langue
export const forceLanguage = (lang) => {
  console.log(`Changing language to ${lang}`);
  // Forcer le changement de langue
  i18n.changeLanguage(lang);
  // Sauvegarder la préférence dans localStorage
  localStorage.setItem('i18nextLng', lang);
  console.log(`Language changed to ${i18n.language}`);
  return i18n.language;
};

// Usage:
// import { forceLanguage } from './testLanguage';
// forceLanguage('es'); // Forcer l'espagnol
