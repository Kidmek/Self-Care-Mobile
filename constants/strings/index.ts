import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { AUTH_STRINGS, am_auth_translations } from './auth';
import { ASSESSMENT_STRINGS, am_assessment_translations } from './home/assessment/assessment';
import { TRACKING_STRINGS, am_tracking_translations } from './home/assessment/tracking';
import { WHEEL_STRINGS, am_wheel_translations } from './home/assessment/wheel';
import { HOME_STRINGS, am_home_translations } from './home/home';
import { REMINDER_STRINGS, am_reminder_translations } from './home/reminder';
import { JOURNALING_STRINGS, am_journaling_translations } from './home/self care/journal';
import { TECHNIQUES_STRINGS, am_technique_translations } from './home/self care/techniques';
import { INFO_STRINGS, am_info_translations } from './info';
import { PROFILE_STRINGS, am_profile_translations } from './profile';
import { SETTING_STRINGS, am_setting_translations } from './setting';

import { makeObjects } from '~/utils/helper';

const translations = {
  en: {
    translation: {
      ...makeObjects(Object.values(AUTH_STRINGS)),
      ...makeObjects(Object.values(ASSESSMENT_STRINGS)),
      ...makeObjects(Object.values(TECHNIQUES_STRINGS)),
      ...makeObjects(Object.values(HOME_STRINGS)),
      ...makeObjects(Object.values(INFO_STRINGS)),
      ...makeObjects(Object.values(JOURNALING_STRINGS)),
      ...makeObjects(Object.values(PROFILE_STRINGS)),
      ...makeObjects(Object.values(REMINDER_STRINGS)),
      ...makeObjects(Object.values(SETTING_STRINGS)),
      ...makeObjects(Object.values(TRACKING_STRINGS)),
      ...makeObjects(Object.values(WHEEL_STRINGS)),
    },
  },
  am: {
    translation: {
      ...am_auth_translations,
      ...am_assessment_translations,
      ...am_technique_translations,
      ...am_home_translations,
      ...am_info_translations,
      ...am_journaling_translations,
      ...am_profile_translations,
      ...am_reminder_translations,
      ...am_setting_translations,
      ...am_tracking_translations,
      ...am_wheel_translations,
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
