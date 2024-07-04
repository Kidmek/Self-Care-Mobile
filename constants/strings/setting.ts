import { makeObjects } from '~/utils/helper';

export const en_setting_translations = {
  GENERAL: 'General',
  NOTIFICATION: 'Notification',
  SECURITY: 'Security',
  SOUND: 'Sound',
  VIBRATION: 'Vibration',
  ALLOW_NOTIFIACTION: 'Allow Notifications',
  PIN_LOCK: 'PIN Lock',
  CHANGE_PIN: 'Change PIN',
  ENABLE_BIOMETRICS: 'Enable Biometrics',
  SET_PIN: 'Set PIN',
  ENTER_PIN: 'Enter PIN',
  WRONG_PIN: 'Wrong PIN',
  LANGUAGE: 'Language',
  LAST_LOGIN: 'Last Logged In',
  AWAT_FOR: 'Lock If Away For',
  MIN: 'minute',
  DAY: 'day',
  HOUR: 'hour',
};

type SettingStringsKeys = keyof typeof en_setting_translations;

// @ts-ignore
export const SETTING_STRINGS: { [placeholder in SettingStringsKeys]: string } = makeObjects(
  Object.keys(en_setting_translations)
);
export const am_setting_translations: { [placeholder in SettingStringsKeys]: string } = {
  GENERAL: 'አጠቃላይ',
  NOTIFICATION: 'ማሳወቂያ',
  SECURITY: 'ደህንነት',
  SOUND: 'ድምጽ',
  VIBRATION: 'መንቀጥቀጥ',
  ALLOW_NOTIFIACTION: 'ማሳወቂያዎችን ይፍቀዱ',
  PIN_LOCK: 'ፒን መቆለፊያ',
  CHANGE_PIN: 'ፒን ይቀይሩ',
  ENABLE_BIOMETRICS: 'አሻራ ይቻል',
  SET_PIN: 'ፒን ያቁሙ',
  ENTER_PIN: 'ፒን ያስገቡ',
  WRONG_PIN: 'የተሳሳተ ፒን',
  LANGUAGE: 'ቋንቋ',
  LAST_LOGIN: 'መጨረሻ ጊዜ የገቡበት',
  AWAT_FOR: 'ከተዘጋ በኋላ ለመቆለፍ ጊዜ',
  MIN: 'ደቂቃ',
  DAY: 'ቀን',
  HOUR: 'ሰአት',
};
