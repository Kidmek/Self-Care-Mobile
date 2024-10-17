import { makeObjects } from '~/utils/helper';

export const en_info_translations = {
  CONTACT_HEADER:
    'You can get in touch with us through below platforms. Our Team will reach out to you as soon as it would be possible.',
  CUSTOMER_SUPPORT: 'Customer Support',
  CONTACT_NUMBER: 'Contact Number',
  EMAIL_ADDRESS: 'Email Address',
  SOCIAL_MEDIA: 'Social Media',
  INSTAGRAM: 'Instagram',
  TWITTER: 'X',
  LINKEDIN: 'LinkedIn',

  FACEBOOK: 'Facebook',
  TELEGRAM_GROUP: 'Telegram Group',
  TELEGRAM_CHANNEL: 'Telegram Channel',
  EXPERIENCE_QNS: 'Did you experience improvement after using the app?',
  EXPERIENCE_PLACEHOLDER: 'Your response',
  FEEDBACK_QNS: 'What is your feedback about the app?',
  FEEDBACK_PLACEHOLDER: 'Your feedback',
  SUBMIT_FEEDBACK: 'Submit Feedback',
  //
  APP_DESCRIPTION_LABEL: 'A brief description of the App',
  APP_DESCRIPTION:
    'The main purpose of the application is to assist health professionals and workers, who are directly or indirectly, involved in providing health services to others, in taking care of themselves.\n This application is supported by relevant content and includes the primary self-care methods that can be implemented. Consequently, it is believed that this application can help prevent professional and employee burnout and enhance clients satisfaction.',

  PARNTERSHIP: 'This self-care application is prepared by EPA in collaboration with GIZ.',
  MORE_INFO: 'More about the app',
};

type InfoStringsKeys = keyof typeof en_info_translations;

// @ts-ignore
export const INFO_STRINGS: { [placeholder in InfoStringsKeys]: string } = makeObjects(
  Object.keys(en_info_translations)
);
export const am_info_translations: { [placeholder in InfoStringsKeys]: string } = {
  CONTACT_HEADER: 'ከታች ካሉት መድረኮች በኩል እኛን ማግኘት ይችላሉ። ቡድናችን በቻለበት ጊዜ ይደርስዎታል።',
  CUSTOMER_SUPPORT: 'የደንበኛ ድጋፍ',
  CONTACT_NUMBER: 'ስልክ ቁጥር',
  EMAIL_ADDRESS: 'ኢሜል አድራሻ',
  SOCIAL_MEDIA: 'ማህበራዊ ሚዲያ',
  INSTAGRAM: 'ኢንስታግራም',
  TWITTER: 'ኤክስ',
  LINKEDIN: 'ሊንክዲን',
  TELEGRAM_GROUP: 'ቴሌግራም ግሩፕ',
  TELEGRAM_CHANNEL: 'ቴሌግራም ቻናል',
  FACEBOOK: 'ፌስቡክ',
  EXPERIENCE_QNS: 'መተግበሪያውን ከመጠቀምዎ በኋላ ገና ማሻሻል አግኝተዋል?',
  EXPERIENCE_PLACEHOLDER: 'ምላሽዎ',
  FEEDBACK_QNS: 'ስለ መተግበሪያው ምን እቅድ አላችሁ?',
  FEEDBACK_PLACEHOLDER: 'እቅድዎ',
  SUBMIT_FEEDBACK: 'እቅድ ያቅርቡ',
  APP_DESCRIPTION_LABEL: 'ስለመተግበሪያው አጭር መግለጫ',
  APP_DESCRIPTION:
    'የመተግበሪያው ዋና ዓላማ  ለሌሎች በቀጥታም ሆነ በተዘዋዋሪ የጤና አገልግሎት በመስጠት ላይ የሚገኙ ጤና ባለሙያዎች እና ሰራተኞች እራሳቸውን መንከባከብ እንዲችሉ ማገዝ ነው፡፡\nይህም መተግበሪያው በይዘቱ ተደገፉ እና  ተግባራዊ መሆን የሚችሉ ዋና ዋና  ራስን የመንከባከቢያ ዘዴዎች ያካተተ ነው፡፡በዚህም ምክንያት በባለሙያዎች እና በሰራተኞች ላይ የሚከሰት መዛልን መከላከል ብሎም የተገልጋዮቹን እርካታ መጨመር እንደሚቻል ይታመናል፡፡',
  PARNTERSHIP:
    'ይህ ራስን ለመጠበቅና ለመንከባከብ የሚረዳ መተግበሪያ በኢትዮጵያ ሳይኮሎጂ ባለሙያዎች ማህበር ከጀርመን ልማት ድርጅት ጋር በመተባበር ተዘጋጅቷል።',
  MORE_INFO: 'ስለመተግበሪያው ተጨማሪ',
};
