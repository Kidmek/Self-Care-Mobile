// export const API = 'https://selfcare.org.et/api/';
export const API = 'http://192.168.1.18:3000/api/';
export const MEDIA_URL = `${API}../uploads`;
export const ADMIN = 'ADMIN';
export const LOGIN_API = 'auth/login';
export const REGISTER_API = 'auth/register';
export const OTP_RESEND_API = 'auth/resend-otp';
export const OTP_API = 'auth/verify-otp';
export const CHANGE_PASS_API = 'auth/change-pass';
export const RESET_PASS_API = 'auth/reset-pass';
export const ROLE_KEY = 'sage_role';
export const TOKEN_KEY = 'sage_jwt';
export const USER_KEY = 'sage_user';
export const TIMEOUT = 5000;
export const LANGUAGE_KEY = 'sage_lang';

export type Language = 'am' | 'en';
type MessagesType = {
  success: string;
  failure: string;
  wrongCredentials: string;
  unauthorized: string;
};

export const Messages: {
  am: MessagesType;
  en: MessagesType;
} = {
  am: {
    success: 'ተሳክቷል', // "Success"
    failure: 'አልተሳካም', // "Failed"
    wrongCredentials: 'የተሳሳተ መግቢያ መረጃ', // "Wrong Credentials"
    unauthorized: 'አልተፈቀደም፣ እባኮትን እንደገና ይግቡ', // "Unauthorized, please login again"
  },
  en: {
    success: 'Success', // Success in English
    failure: 'Failed', // Failure in English
    wrongCredentials: 'Wrong Credentials', // Wrong Credentials in English
    unauthorized: 'Unauthorized, please login again', // Unauthorized in English
  },
};
