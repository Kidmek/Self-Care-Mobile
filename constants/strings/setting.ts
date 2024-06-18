export enum SETTING_STRINGS {
  GENERAL = 'General',
  NOTIFICATION = 'Notification',
  SECURITY = 'Security',
  SOUND = 'Sound',
  VIBRATION = 'Vibration',
  ALLOW_NOTIFIACTION = 'Allow Notifications',
  PIN_LOCK = 'PIN Lock',
  CHANGE_PIN = 'Change PIN',
  ENABLE_BIOMETRICS = 'Enable Biometrics',
  SET_PIN = 'Set PIN',
  ENTER_PIN = 'Enter PIN',
  WRONG_PIN = 'Wrong PIN',
  LANGUAGE = 'Language',
  LAST_LOGIN = 'Last Logged In',
}

// export const en_translations: { [placeholder in AUTH_STRINGS]: string } = makeObjects(
//   Object.values(AUTH_STRINGS)
// );

export const am_setting_translations: { [placeholder in SETTING_STRINGS]?: string } = {};
