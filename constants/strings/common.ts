export enum AUTH_STAGE {
  LOGIN,
  REGISTER,
  OTP,
  NEW_PASS,
}

export enum INPUT_TYPE {
  EMAIL = 'email-address',
  DATE = 'date',
  MULTI = 'multi',
  TIME = 'time',
  PHONE = 'phone-pad',
}

export enum MODAL_TYPES {
  LOGOUT = 'Logout',
}

export enum HEADER_TYPES {
  BACK,
  DRAWER,
  INFO,
}

export enum AnalyticField {
  SLEEPING = 'sleeping',
  BREATHING = 'breathing',
  MUSCLE = 'muscle',
  GROUNDING = 'grounding',
  JOURNAL = 'journaling',
  WHEEL = 'wheel',
  TRACKING = 'tracking',
  REMINDER = 'reminder',
  REMINDER_YES = 'reminder_yes',
  REMINDER_NO = 'reminder_no',
}
export const OTP_LENGTH = 6;

export const WAIT_TIME = {
  second: 9,
  minute: 0,
};

export const phoneRegEx = /^(?:\+251|0)\d{9}$/;
export const emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export const INFO = {
  PHONE_NUM: '+241920202020',
  EMAIL_ADDRESS: 'test@gmail.com',
  INSTAGRAM: '@testtest',
  FACEBOOK: '@testtest',
  TWITTER: '@testtest',
  TELEGRAM: '@testtest',
};

export const languages = [
  { value: 'en', label: 'English' },
  { value: 'am', label: 'Amharic' },
  { value: 'af', label: 'Afargna' },
];
