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
}

export enum MODAL_TYPES {
  LOGOUT = 'Logout',
}

export enum HEADER_TYPES {
  BACK,
  DRAWER,
  INFO,
}

export const OTP_LENGTH = 6;

export const WAIT_TIME = {
  second: 9,
  minute: 0,
};

export const emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
