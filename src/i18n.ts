import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from './public/locales/en/translation.json';
import translationDE from './public/locales/de/translation.json';
import translationHR from './public/locales/hr/translation.json';

// Define available translations
const resources = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
  hr: {
    translation: translationHR,
  },
};

// Init translation service
i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'hr',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
