export enum AUTH_STRINGS {
  LOGIN = 'Login',
  REGISTERATION = 'Registeration',
  REGISTER = 'Register',
  USERNAME = 'Username',
  PASSWORD = 'Password',
  LOG_IN = 'Log In',
  VERIFY = 'Verify',
  FORGOT_PASSWORD = 'Forgot Password',
  NO_ACCOUNT = "Don't Have An Account ?",
  YES_ACCOUNT = 'Already Have An Account ?',
  PASSWORD_LABEL = 'Enter your password',
  USERNAME_LABEL = 'Enter your username',
  CONFIRM_PASSWORD = 'Confirm Password',
  GENDER = 'Gender',
  EMAIL = 'Email',
  BIRTH_DATE = 'Date of Birth',
  FIRST_NAME = 'First Name',
  LAST_NAME = 'Last Name',
  EMAIL_LABEL = 'Enter Your Email',
  CONFIRM_PASSWORD_LABEL = 'Enter Your Confirm Password',
  GENDER_LABEL = 'Enter Your Gender',
  BIRTH_DATE_LABEL = 'Pick Your Date of Birth',
  FIRST_NAME_LABEL = 'Enter Your First Name',
  LAST_NAME_LABEL = 'Enter Your Last Name',
  AGREE_TO_TERMS = 'I Agree To Terms & Conditions',
  RESEND = 'Resend',
  WAIT_FOR = 'Wait For',
  NO_CODE = "Didn't get the code ?",
  VERIFICATION_PLACEHOLDER = 'Enter Verification Code',
  VERIFICATION = 'Verification',
  CANCEL = 'Cancel',
  NEXT = 'Next',
}

// export const en_translations: { [placeholder in AUTH_STRINGS]: string } = makeObjects(
//   Object.values(AUTH_STRINGS)
// );

export const am_auth_translations: { [placeholder in AUTH_STRINGS]?: string } = {
  [AUTH_STRINGS.LOGIN]: 'Amh Login',
  [AUTH_STRINGS.REGISTER]: 'Amh Register',
};
