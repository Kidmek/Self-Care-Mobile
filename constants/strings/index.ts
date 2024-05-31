import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { AUTH_STRINGS, am_auth_translations } from './auth';

import { makeObjects } from '~/utils/helper';

const translations = {
  en: {
    translation: {
      ...makeObjects(Object.values(AUTH_STRINGS)),
    },
  },
  am: {
    translation: {
      ...am_auth_translations,
    },
  },
};
i18n

  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    resources: translations,
    lng: 'en', // default language to use.
  });

export default { i18n };
