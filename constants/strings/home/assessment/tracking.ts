import { makeObjects } from '~/utils/helper';

export enum TRACKING {
  Sad = 'Sad',
  Irritated = 'Irritated',
  Tense = 'Tense',
  Bored = 'Bored',
  Neutral = 'Neutral',
  Relaxed = 'Relaxed',
  Calm = 'Calm',
  Cheerful = 'Cheerful',
  Excited = 'Excited',
}

export const TRACKING_EMOJIS = {
  Sad: '😢😞',
  Irritated: '😠🙄',
  Tense: '😟😬',
  Bored: '😒😑',
  Neutral: '😐🤨',
  Relaxed: '😌🧘',
  Calm: '😊🕊️ ',
  Cheerful: '😁😀',
  Excited: '🤩😆',
};

export const TRACKING_INFO_EN = {
  NB_STEP: 'STEP_7',

  STEP_1: 'Rate your mood using the following descriptive categories (e.g., sad, neutral, happy).',

  STEP_2:
    'Decide how often you will track your mood. You can track it daily, three times  a week, once in a week or whenever you feel significant changes in your emotion',

  STEP_3:
    'Identify specific triggers or events that might influence your mood. .These can include activities, social interactions, sleep patterns, exercise, or any other factors you believe impact your emotional well-being.',

  STEP_4: 'Make it a habit to record your mood consistently at the designated times',

  STEP_5:
    'Consider including additional information alongside your mood rating. This may involve noting the date, time, location, current circumstances, or any relevant thoughts or events from the day. This context can help you identify patterns or triggers for specific moods.',

  STEP_6:
    'Regularly review your mood tracker to identify patterns, trends, or correlations between your mood and the recorded triggers. Look for insights into what positively or negatively impacts your emotional well-being.',

  STEP_7: 'NB',
  STEP_8:
    "Remember that mood fluctuates naturally, and it's normal to experience a range of emotions. Use your mood tracker as a tool for self-care and understanding, rather than judgment or criticism.",
  STEP_9:
    'Seek professional help if needed: While mood tracking can provide valuable self-awareness,',
  STEP_10:
    "it's essential to remember that it isn't a substitute for professional mental health support. If you feel overwhelmed or notice consistent negative mood patterns, consider reaching out to a mental health professional for guidance.",
};
export const TRACKING_INFO_AM = {
  NB_STEP: 'STEP_7',

  STEP_1: 'በሚከተሉት ገላጭ ስዕሎች መሰረት ስሜትዎን ይለኩ ',
  STEP_2:
    'ስሜትዎን በምን ያህል ጊዜ እንደሚከታተሉ ይወስኑ/ይምረጡ። በየቀኑ፣ በሳምንት ሶስት ጊዜ ፤በሳምንት አንድ ጊዜ ወይም በማንኛውም ጊዜ በስሜትዎ ላይ ጉልህ ለውጦች ሲሰማዎት መከታተል ይችላሉ።',
  STEP_3:
    'በስሜትዎ  ላይ ተጽዕኖ ሊያሳድሩ የሚችሉ ልዩ ልዩ አባባሽ ምክንያቶች  ወይም ክስተቶችን ይለዩ። እነዚህ ምክንያቶች ፣ ማህበራዊ ግንኙነቶችን፣ የእንቅልፍ ዘይቤዎችን፣ የአካል ብቃት እንቅስቃሴን ወይም ሌሎች በስሜታዊ ደህንነትዎ ላይ ተጽእኖ ያሳድራሉ ብለው የሚያምኑትን ሊያካትቱ ይችላሉ።',
  STEP_4: 'በወሰኑት ጊዜ መሰረት ስሜትዎን ያለማቋረጥ የመመዝገብ ልምድ ያድርጉ። ',
  STEP_5:
    'ከስሜትዎ ጋር በተያያዘ ተጨማሪ መረጃዎቸን ለማካተት ይሞክሩ  ይህም ቀኑን፣ ሰዓቱን፣ ቦታውን፣ ወቅታዊ ሁኔታዎችን ወይም ማንኛውንም ተዛማጅ ሀሳቦችን ወይም የእለቱን ክስተቶችን መጥቀስን ሊያካትት ይችላል። ይህም ለስሜትዎ አባባሽወይም አጋዥ  ምክንያቶች  ለመለየት ይረዳዎታል።',
  STEP_6:
    'በስሜትዎ እና በተመዘገቡት ምክንያቶች  መካከል ትስስሮችን ለመለየት የስሜት መከታተያ በመደበኛነት ይከልሱ። በስሜታዊ ደህንነትዎ ላይ አዎንታዊ ወይም አሉታዊ ተጽእኖ ያላቸውን ነገሮች ያጢኑ ',
  STEP_7: 'ልብ ይበሉ',
  STEP_8:
    'ስሜት ተለዋዋጭ መሆኑን  አይዘንጉ…የተለያዩ ስሜቶችን ማስተናገድ የተለመደ ነው። ስለሆነም  ስሜት መከታተያውን ራስን እንደመጠበቂያ ዘዴ እንጂ ራስዎን ለመገመት እና ለመውቀስ እንዳያውሉት ',
  STEP_9:
    'ስሜት ተለዋዋጭ መሆኑን  አይዘንጉ…የተለያዩ ስሜቶችን ማስተናገድ የተለመደ ነው። ስለሆነም  ስሜት መከታተያውን ራስን እንደመጠበቂያ ዘዴ እንጂ ራስዎን ለመገመት እና ለመውቀስ እንዳያውሉት ',
  STEP_10:
    'ከአቅም በላይ የሆነ ስሜት ከተሰማዎት ወይም የማያቋርጥ አሉታዊ ስሜትን ካስተዋሉ ድጋፍ ለማግኘት አዕምሮ ጤና ባለሙያን ማግኘት ይኖርበታል፡፡',
};
export const en_tracking_translations = {
  FEELING_QNS: 'How are you feeling now?',
  ADDITIONAL_INFO: 'Additional Information',
  MOOD: 'Mood',
  DESCRIPTION: 'Description',
  DELETE_PROMPT: 'Are you sure you want to delete this record?',
  EMPTY_HISTORY: 'No mood recorded yet',
};

type TrackingStringsKeys = keyof typeof en_tracking_translations;

// @ts-ignore
export const TRACKING_STRINGS: { [placeholder in TrackingStringsKeys]: string } = makeObjects(
  Object.keys(en_tracking_translations)
);
export const am_tracking_translations: {
  [placeholder in TrackingStringsKeys | TRACKING]: string;
} = {
  [TRACKING.Tense]: 'ተጨንቄያለሁ',
  [TRACKING.Excited]: 'እጅግ በጣም ደስ ብሎኛል',
  [TRACKING.Cheerful]: 'ደስተኛ ነኝ',
  [TRACKING.Relaxed]: 'ዘና ብያለሁ',
  [TRACKING.Calm]: 'ተረጋግቻለሁ',
  [TRACKING.Bored]: 'ተደብሬያለሁ',
  [TRACKING.Sad]: 'ተከፍቻለሁ ',
  [TRACKING.Irritated]: 'ተበሳጭቻለሁ',
  [TRACKING.Neutral]: 'ምንም አልል',
  FEELING_QNS: 'አሁን ምን ይሰማዎታል?',
  ADDITIONAL_INFO: 'ተጭማሪ መረጃ',
  MOOD: 'ስሜት',
  DESCRIPTION: 'መግለጫ',
  DELETE_PROMPT: 'እርግጠኛ ነዎት ይህን መዝገብ መሰረዝ ይፈልጋሉ?',
  EMPTY_HISTORY: 'እስካሁን ምንም ስሜት አልተመዘገበም።',
};
