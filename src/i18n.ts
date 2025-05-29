import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// Автоматически определяет язык браузера
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/src/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['lab307'],
    defaultNS: 'lab307',
  });

export default i18n; 