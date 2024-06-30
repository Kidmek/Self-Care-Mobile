import { makeObjects } from '~/utils/helper';

export enum INFO_STRINGS {
  CONTACT_HEADER = 'You can get in touch with us through below platforms. Our Team will reach out to you as soon as it would be possible.',
  CUSTOMER_SUPPORT = 'Customer Support',
  CONTACT_NUMBER = 'Contact Number',
  EMAIL_ADDRESS = 'Email Address',
  SOCIAL_MEDIA = 'Social Media',
  INSTAGRAM = 'Instagram',
  TWITTER = 'X',
  FACEBOOK = 'Facebook',
  EXPERIENCE_QNS = 'Did you experience improvement after using the app?',
  EXPERIENCE_PLACEHOLDER = 'Your response',
  FEEDBACK_QNS = 'What is your feedback about the app?',
  FEEDBACK_PLACEHOLDER = 'Your feedback',
  SUBMIT_FEEDBACK = 'Submit Feedback',
  //
  APP_DESCRIPTION_LABEL = 'A brief description of the App',
  APP_DESCRIPTION = 'The main purpose of the application is to assist health professionals and workers, who are directly or indirectly, involved in providing health services to others, in taking care of themselves.\n This application is supported by relevant content and includes the primary self-care methods that can be implemented. Consequently, it is believed that this application can help prevent professional and employee burnout and enhance clients satisfaction.',
}

// export const en_translations: { [placeholder in INFO_STRINGS]: string } = makeObjects(
//   Object.values(INFO_STRINGS)
// );

export const am_info_translations: { [placeholder in INFO_STRINGS]?: string } = {
  [INFO_STRINGS.APP_DESCRIPTION_LABEL]: 'ስለመተግበሪያው አጭር መግለጫ',
  [INFO_STRINGS.APP_DESCRIPTION]:
    'የመተግበሪያው ዋና ዓላማ  ለሌሎች በቀጥታም ሆነ በተዘዋዋሪ የጤና አገልግሎት በመስጠት ላይ የሚገኙ ጤና ባለሙያዎች እና ሰራተኞች እራሳቸውን መንከባከብ እንዲችሉ ማገዝ ነው፡፡\nይህም መተግበሪያው በይዘቱ ተደገፉ እና  ተግባራዊ መሆን የሚችሉ ዋና ዋና  ራስን የመንከባከቢያ ዘዴዎች ያካተተ ነው፡፡በዚህም ምክንያት በባለሙያዎች እና በሰራተኞች ላይ የሚከሰት መዛልን መከላከል ብሎም የተገልጋዮቹን እርካታ መጨመር እንደሚቻል ይታመናል፡፡',
};
