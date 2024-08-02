import { makeObjects } from '~/utils/helper';

export const en_profile_translations = {
  CHANGE_EMAIL: 'Change Email',
  CHANGE_PASSWORD: 'Change Password',
  CURRENT_PASSWORD: 'Current Password',
  CURRENT_PASSWORD_PLACEHOLDER: 'Enter your current password',
  CONFIRM: 'Confirm',
  WRONG_PASSWORD: 'Wrong Password',
  CHANGE: 'Change',
  NEW_EMAIL: 'New Email',
  NEW_EMAIL_PLACEHOLDER: 'Enter your new email',
  SAME_EMAIL: 'New email same as current email',
};

type ProfileStringsKeys = keyof typeof en_profile_translations;

// @ts-ignore
export const PROFILE_STRINGS: { [placeholder in ProfileStringsKeys]: string } = makeObjects(
  Object.keys(en_profile_translations)
);

export const am_profile_translations: { [placeholder in ProfileStringsKeys]: string } = {
  CHANGE_EMAIL: 'ኢሜል ይቀይሩ',
  CHANGE_PASSWORD: 'ፕስወርድ ይቀይሩ',
  CURRENT_PASSWORD: 'ወቅታዊ ፕስወርድ',
  CURRENT_PASSWORD_PLACEHOLDER: 'ወቅታዊ ፕስወርድዎን ያስገቡ',
  CONFIRM: 'አረጋግጥ',
  WRONG_PASSWORD: 'ልክ ያልሆነ ፕስወርድ',
  CHANGE: 'ቀይር',
  NEW_EMAIL: 'አዲስ ኢሜል',
  NEW_EMAIL_PLACEHOLDER: 'አዲስ ኢሜልዎን ያስገቡ',
  SAME_EMAIL: 'አዲሱ ኢሜል ከአሁኑ ኢሜል ጋር አንድ ነው',
};
