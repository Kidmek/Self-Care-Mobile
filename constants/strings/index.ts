import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { am_auth_translations, en_auth_translations } from './auth';
import {
  am_assessment_translations,
  en_assessment_translations,
} from './home/assessment/assessment';
import { am_tracking_translations, en_tracking_translations } from './home/assessment/tracking';
import { am_wheel_translations, en_wheel_translations } from './home/assessment/wheel';
import { am_home_translations, en_home_translations } from './home/home';
import { REMINDER_STRINGS, am_reminder_translations } from './home/reminder';
import { am_journaling_translations, en_journaling_translations } from './home/self care/journal';
import { am_technique_translations, en_techniques_translations } from './home/self care/techniques';
import { am_info_translations, en_info_translations } from './info';
import { am_profile_translations, en_profile_translations } from './profile';
import { am_setting_translations, en_setting_translations } from './setting';
import { am_stat_translations, en_stat_translations } from './stats';

import { makeObjects } from '~/utils/helper';

const translations = {
  en: {
    translation: {
      ...en_auth_translations,
      ...en_home_translations,
      ...en_profile_translations,
      ...en_setting_translations,
      ...en_info_translations,
      ...en_journaling_translations,
      ...en_wheel_translations,
      ...en_techniques_translations,
      ...en_assessment_translations,
      ...en_tracking_translations,
      ...en_stat_translations,
      ...makeObjects(Object.values(REMINDER_STRINGS)),
    },
  },
  am: {
    translation: {
      ...am_auth_translations,
      ...am_home_translations,
      ...am_assessment_translations,
      ...am_technique_translations,
      ...am_info_translations,
      ...am_journaling_translations,
      ...am_profile_translations,
      ...am_reminder_translations,
      ...am_setting_translations,
      ...am_tracking_translations,
      ...am_wheel_translations,
      ...am_stat_translations,
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
