import { makeObjects } from '~/utils/helper';

export const en_home_translations = {
  SELF_ASSESSMENT: 'Self Assessment',
  SELF_CARE_TECHNIQUES: 'Self Care Techniques',
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  DELETED: 'Deleted',
  EDIT: 'Edit',
  SKIP: 'Skip',
  SAVE: 'Save',
  LOGOUT: 'Logout',
  LOGOUT_QNS:
    'Are you sure you want to log out?\n\nYou will lose all your data! Consider locking the app in settings instead.',
  HOME: 'Home',
  REMINDER: 'Reminder',
  PROFILE: 'Profile',
  SETTING: 'Setting',
  FEEDBACK: 'Feedback',
  STATISTICS: 'Statistics',
  ABOUT_US: 'About Us',
  HELP: 'Help',
  ABOUT_APP: 'About',
  CONTACT_US: 'Contact Us',
  YES: 'Yes',
  NO: 'No',
  CREATED_AT: 'Created At',
  EDITTED_AT: 'Editted At',
  NO_DESCRIPTION: 'No Description',
  TERMS_AND_CONDITIONS: 'Terms and conditions',
};

type HomeStringsKeys = keyof typeof en_home_translations;

// @ts-ignore
export const HOME_STRINGS: { [placeholder in HomeStringsKeys]: string } = makeObjects(
  Object.keys(en_home_translations)
);
export const am_home_translations: { [placeholder in HomeStringsKeys]: string } = {
  SELF_ASSESSMENT: 'ራስን መገምግም',
  SELF_CARE_TECHNIQUES: 'ራስን መጠበቂያ መንገዶች',
  CANCEL: 'ሰርዝ',
  DELETE: 'ሰርዝ',
  DELETED: 'ተሰርዟል',
  EDIT: 'አርትዕ',
  SKIP: 'ዝለል',
  SAVE: 'አስቀምጥ',
  LOGOUT: 'ውጣ',
  LOGOUT_QNS:
    'እርግጠኛ ነዎት መውጣት ይፈልጋሉ?\n\nሁሉንም የተከማቸ መረጃዎን ያጣሉ! በምትኩ መተግበሪያውን በቅንብሮች ውስጥ መቆለፉን ያስቡበት።',
  HOME: 'መነሻ',
  REMINDER: 'አስታዋሽ',
  PROFILE: 'መገለጫ',
  SETTING: 'ቅንብር',
  FEEDBACK: 'አስተያየት',
  STATISTICS: 'ትርጉሞች',
  ABOUT_US: 'ስለ እኛ',
  HELP: 'እርዳታ',
  CONTACT_US: 'አግኙን',
  YES: 'አዎ',
  NO: 'አይ',
  CREATED_AT: 'የተፈጠረበት ጊዜ',
  EDITTED_AT: 'የተቀየረበት ጊዜ',
  NO_DESCRIPTION: 'መግለጫ የለም',
  ABOUT_APP: 'ስለ መተግበሪያው',
  TERMS_AND_CONDITIONS: 'ሁኔታዎችን እና ውሎችን',
};
