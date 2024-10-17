import { makeObjects } from '~/utils/helper';

export const WHEEL_SECTIONS = [
  {
    shortName: 'PHYSICAL',
    longName: 'Physical Health',
    description:
      'This includes aspects such as exercise, nutrition, sleep, and overall physical well-being.',
    am_shortName: 'አካላዊ',
    am_longName: 'አካላዊ ጤንነት',
    am_description:
      'ይህ ክፍል  እንደ የአካል ብቃት እንቅስቃሴ፣ አመጋገብ  እና  እንቅልፍ  የመሳሰሉትን አጠቃላይ የአካል ደህንነት ገጽታዎችን ያጠቃልላል',
  },
  {
    shortName: 'MENTAL',
    longName: 'Mental and Emotional Well-being',
    description:
      'This involves mental health, emotional intelligence, self-awareness, stress management, and resilience.',
    am_shortName: 'አዕምሯዊ',
    am_longName: 'አዕምሯዊ እና ስሜታዊ ደህንነት',
    am_description: 'ይህ  ክፍል  የአእምሮ ጤናን፣ ስሜታዊ ልህቀትን፣ እራስን ማወቅን፣ ጭንቀትን መቆጣጠር  እና መቻልን ያካትታል።',
  },
  {
    shortName: 'RELATIONSHIP',
    longName: 'Relationships and Social Connections',
    description:
      'This component focuses on the quality of relationships, social support, communication skills, and the ability to establish and maintain meaningful connections with others.',
    am_shortName: 'ማህበራዊ',
    am_longName: 'ማህበራዊ ግንኙነቶች',
    am_description:
      'ይህ ክፍል  አንድ ሰው ስለሚኖሩት ግንኙነቶች ጥንካሬ ፣ ስለሚኖሩት ማህበራዊ ድጋፎች፣ የመግባባት ችሎታ እና ከሌሎች ጋር ትርጉም ያለው ግንኙነት የመመስረት እና የማቆየት ችሎታ ላይ ያተኩራል።',
  },

  {
    shortName: 'CAREER',
    longName: 'Career and Work Life',
    description:
      "This considers satisfaction and fulfillment in one's profession or chosen career path, work-life balance, personal growth, and professional development.",
    am_shortName: 'ስራ',
    am_longName: 'የስራ ህይወት',
    am_description:
      'ይህ አንድ ሰው በሙያው ወይም በመረጠው የስራ ጎዳና ጋር ተያይዞ  የስራ እና ህይወት ሚዛናዊነቱን እንዲሁም በግላዊ እድገት እና ሙያዊ እድገቱን አስመልክቶ ምን ያህል እርካታ አለውየሚለውን  ይመለከታል።',
  },

  {
    shortName: 'FINANCIAL',
    longName: 'Financial Stability',
    description:
      'This component relates to financial management, budgeting, savings, debt management, and overall financial security.',
    am_shortName: 'ፋይናንስ',
    am_longName: 'ፋይናንስ',
    am_description:
      'ይህ ክፍል አንድሰው  ከገንዘብ አያያዝ፣ ከበጀት አመዳደብ፣ ከቁጠባ፣ ከዕዳ አከፋፈል እና አጠቃላይ ከገንዘብ ጋር በተያያዘ ሁኔታ ያለበትን ክፈተት ያመለክታል፡፡',
  },
  {
    shortName: 'PERSONAL',
    longName: 'Personal Growth and Learning',
    description:
      'This includes continuous learning, personal development, setting and achieving goals, and pursuing new experiences and challenges.',
    am_shortName: 'የግል እድገት',
    am_longName: 'የግል እድገት እና ትምህርት',
    am_description:
      'ይህ ቀጣይነት ያለው ትምህርትን፣ የግል እድገትን፣ ግቦችን ማውጣት እና ማሳካትን፣ እና አዳዲስ ልምዶችን እና ፈተናዎችን መከተልን ያካትታል።',
  },

  {
    shortName: 'RECREATION',
    longName: 'Recreation and Leisure',
    description:
      'This involves activities that bring joy, relaxation, and a sense of fulfilment, such as hobbies, creative pursuits, and recreational activities.',
    am_shortName: 'መዝናኛ',
    am_longName: 'መዝናኛ እና እረፍት',
    am_description:
      'ይህ እንደ የትርፍ ጊዜ ማሳለፊያዎች፣ የፈጠራ ስራዎች እና መዝናኛዎች ያሉ ደስታን፣ መዝናናትን እና እርካታን የሚያመጡ እንቅስቃሴዎችን ያካትታል።',
  },
  {
    shortName: 'SPIRITUALITY',
    longName: 'Spirituality and Meaning',
    description:
      'This component focuses on personal beliefs, values, purpose, meaning in life, and a sense of connection to something greater than oneself.',
    am_shortName: 'መንፈሳዊነት',
    am_longName: 'መንፈሳዊነት',
    am_description:
      'ይህ ክፍል የሚያተኩረው በግላዊ እምነቶች፣ እሴቶች፣ ዓላማ፣ የህይወት ትርጉም እና ከራሳችን ከሚበልጥ ነገር ጋር የሚኖር ግንኙነት ላይ ነው።',
  },
];

export const WHEEL_INFO_EN = {
  STEP_1:
    'Rate each section: Assign a rating or score to each section on a scale of 1 to 10, with 1 being the lowest and 10 being the highest. The rating indicates your level of satisfaction or fulfilment in that particular area of your life.',
  STEP_2:
    'Select the assigned scores or ratings in each section of the Life Wheel Balance. The app will display the score on the outer edge of the corresponding section.',
  STEP_3: 'Once you fill this will create a visual representation of your life wheel.',
  STEP_4:
    'Analyze the results: Take a look at the completed Life Wheel Balance. Observe the overall shape and balance of the wheel. A balanced wheel will have all the sections relatively close in score, forming a smooth and round shape. A lopsided or uneven wheel indicates areas of your life that may require more attention or improvement.',
  STEP_5:
    'Set goals for improvement: Identify the areas of your life that scored lower or need improvement. Reflect on how you can enhance those areas and set specific goals to work towards achieving a more balanced life. Consider what actions, changes, or adjustments you can make to improve your satisfaction or fulfillment in those areas.',
};

export const WHEEL_INFO_AM = {
  STEP_1: 'በክቡ ውስጥ ለተቀመጡት እያንዳንዱ የህይወት ክፍሎች ነጥብ ይስጡ፡፡',
  STEP_2: 'ለእያንዳንዱ ክፍል ከ1 እስከ 10 ባለው ሚዛን ነጥብ ይስጡ ወይም 1 ዝቅተኛው እና 10 ከፍተኛው ነው።',
  STEP_3: 'የነጥብ አሰጣጡ የሚያመለክተው በዛ የህይወትዎ ክፍል አካባቢ ያለውን የእርካታዎን ደረጃ ነው።',
  STEP_4: 'በእያንዳንዱ የህይወት ክፍል የሰጡት ነጥብ የክፍል ውጫዊ ጠርዝ ላይ ይታይዎታል',
  STEP_5: 'የተዘበራረቀ ወይም ያልተስተካከለ ክብ የበለጠ ትኩረት ወይም መሻሻል የሚያስፈልጋቸው የህይወትዎ ቦታዎችን ያሳያል።',
  STEP_6:
    'ያለውን ስዕላዊ መግለጫ ከተመለከቱ በኋላ በመግለጫው መሰረት የክቡን አጠቃላይ ቅርፅ እና ሚዛን ማለትም የህይወትዎን ዋና ዋና ክፍሎች ሚዛን ይጠብቁ።',
  STEP_7: 'በእያንዳንዱ የህይወት ክፍል የሰጡት ነጥብ የክፍል ውጫዊ ጠርዝ ላይ ይታይዎታል',
  STEP_8: 'ዝቅተኛ ውጤት ያስመዘገቡ ወይም መሻሻል የሚያስፈልጋቸውን የሕይወትህን ዘርፎች ይለዩ።',
  STEP_9:
    'እነዚያን ቦታዎች እንዴት ማሻሻል እንደምትችል ያስቡ እና የበለጠ ሚዛናዊ ህይወትን ለማሳካት ልዩ ግቦችን ያውጡ። (በእነዚያ አካባቢዎች እርካታዎን ወይም እርካታን ለማሻሻል ምን አይነት እርምጃዎችን፣ ለውጦችን ወይም ማስተካከያዎችን ማድረግ እንደሚችሉ ያስቡ።)',
};

export const en_wheel_translations = {
  SATISFIED_QNS: 'How satisfied are you in this area?',
  DESCRIPTION: 'Description',
  GUIDELINE: 'Guideline',
  SATIFACTION: 'Satisfaction',
};
type WheelStringsKeys = keyof typeof en_wheel_translations;

// @ts-ignore
export const WHEEL_STRINGS: { [placeholder in WheelStringsKeys]: string } = makeObjects(
  Object.keys(en_wheel_translations)
);

export const am_wheel_translations: { [placeholder in WheelStringsKeys]: string } = {
  SATISFIED_QNS: 'በዚህ አካባቢ ምን ያህል ረክተዋል?',
  DESCRIPTION: 'ማብራሪያ',
  GUIDELINE: 'መመሪያ',
  SATIFACTION: 'እርካታ',
};
