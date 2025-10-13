import { store } from '@/store';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './translations/ru.json';
import en from './translations/en.json';

const resources = {
  en,
  ru,
};

i18n.use(initReactI18next).init({
  resources,
  lng: store.getState().user.language,
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: 'en',
  keySeparator: false,
});

export default i18n;
