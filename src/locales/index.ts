import I18n from 'i18next';
import en from 'locales/en';
import fr from 'locales/fr';
import { initReactI18next } from 'react-i18next';
import { capitalize } from 'utils/strings';

I18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
    format: (value, format) => {
      if (format === 'capitalize') {
        return capitalize(value);
      }

      if (format === 'lowercase') {
        return value.toLowerCase();
      }

      return value;
    },
  },
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
  },
});

export default I18n;

export const t: typeof I18n.t = (key, options) => I18n.t(key, options);

export { translations } from './translations';
