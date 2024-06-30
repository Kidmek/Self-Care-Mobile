export enum TRACKING {
  Tense = 'Tense',
  Excited = 'Excited',
  Cheerful = 'Cheerful',
  Relaxed = 'Relaxed',
  Calm = 'Calm',
  Bored = 'Bored',
  Sad = 'Sad',
  Irritated = 'Irritated',
  Neutral = 'Neutral',
}

export const TRACKING_EMOJIS = {
  Tense: '😟😬',
  Excited: '🤩😆',
  Cheerful: '😁😀',
  Relaxed: '😌🧘',
  Calm: '😊🕊️ ',
  Bored: '😒😑',
  Sad: '😢😞',
  Irritated: '😠🙄',
  Neutral: '😐🤨',
};

export enum TRACKING_STRINGS {
  NB_STEP = 'STEP_7',
  FEELING_QNS = 'How are you feeling now?',
  ADDITIONAL_INFO = 'Additional Information',
  MOOD = 'Mood',
  DESCRIPTION = 'Description',
  DELETE_PROMPT = 'Are you sure you want to delete this record?',
  EMPTY_HISTORY = 'No mood recorded yet',
  STEP_1 = 'Rate your mood using the following descriptive categories (e.g., sad, neutral, happy).',

  STEP_2 = 'Decide how often you will track your mood. You can track it daily, three times  a week, once in a week or whenever you feel significant changes in your emotion',

  STEP_3 = 'Identify specific triggers or events that might influence your mood. .These can include activities, social interactions, sleep patterns, exercise, or any other factors you believe impact your emotional well-being.',

  STEP_4 = 'Make it a habit to record your mood consistently at the designated times',

  STEP_5 = 'Consider including additional information alongside your mood rating. This may involve noting the date, time, location, current circumstances, or any relevant thoughts or events from the day. This context can help you identify patterns or triggers for specific moods.',

  STEP_6 = 'Regularly review your mood tracker to identify patterns, trends, or correlations between your mood and the recorded triggers. Look for insights into what positively or negatively impacts your emotional well-being.',

  STEP_7 = 'NB',
  STEP_8 = "Remember that mood fluctuates naturally, and it's normal to experience a range of emotions. Use your mood tracker as a tool for self-care and understanding, rather than judgment or criticism.",
  STEP_9 = 'Seek professional help if needed: While mood tracking can provide valuable self-awareness,',
  STEP_10 = "it's essential to remember that it isn't a substitute for professional mental health support. If you feel overwhelmed or notice consistent negative mood patterns, consider reaching out to a mental health professional for guidance.",
}
export const am_tracking_translations: { [placeholder in TRACKING_STRINGS | TRACKING]?: string } = {
  [TRACKING_STRINGS.FEELING_QNS]: 'አሁን ምን ይሰማሃል?',
  [TRACKING_STRINGS.ADDITIONAL_INFO]: 'ተጭማሪ መረጃ',
  [TRACKING_STRINGS.MOOD]: 'ስሜት',
  [TRACKING_STRINGS.DESCRIPTION]: 'መግለጫ',
  [TRACKING_STRINGS.DELETE_PROMPT]: 'እርግጠኛ ነዎት ይህን መዝገብ መሰረዝ ይፈልጋሉ?',
  [TRACKING_STRINGS.EMPTY_HISTORY]: 'እስካሁን ምንም ስሜት አልተመዘገበም።',
  [TRACKING.Tense]: 'ተጨንቄያለሁ',
  [TRACKING.Excited]: 'እጅግ በጣም ደስ ብሎኛል',
  [TRACKING.Cheerful]: 'ደስተኛ ነኝ',
  [TRACKING.Relaxed]: 'ዘና ብያለሁ',
  [TRACKING.Calm]: 'ተረጋግቻለሁ',
  [TRACKING.Bored]: 'ተደብሬያለሁ',
  [TRACKING.Sad]: 'ተከፍቻለሁ ',
  [TRACKING.Irritated]: 'ተበሳጭቻለሁ',
  [TRACKING.Neutral]: 'ምንም አልል',
  [TRACKING_STRINGS.STEP_1]: 'በሚከተሉት ገላጭ ስዕሎች መሰረት ስሜትዎን ይለኩ ',

  [TRACKING_STRINGS.STEP_2]:
    'ስሜትዎን በምን ያህል ጊዜ እንደሚከታተሉ ይወስኑ/ይምረጡ። በየቀኑ፣ በሳምንት ሶስት ጊዜ ፤በሳምንት አንድ ጊዜ ወይም በማንኛውም ጊዜ በስሜትዎ ላይ ጉልህ ለውጦች ሲሰማዎት መከታተል ይችላሉ።',

  [TRACKING_STRINGS.STEP_3]:
    'በስሜትዎ  ላይ ተጽዕኖ ሊያሳድሩ የሚችሉ ልዩ ልዩ አባባሽ ምክንያቶች  ወይም ክስተቶችን ይለዩ። እነዚህ ምክንያቶች ፣ ማህበራዊ ግንኙነቶችን፣ የእንቅልፍ ዘይቤዎችን፣ የአካል ብቃት እንቅስቃሴን ወይም ሌሎች በስሜታዊ ደህንነትዎ ላይ ተጽእኖ ያሳድራሉ ብለው የሚያምኑትን ሊያካትቱ ይችላሉ።',

  [TRACKING_STRINGS.STEP_4]: 'በወሰኑት ጊዜ መሰረት ስሜትዎን ያለማቋረጥ የመመዝገብ ልምድ ያድርጉ። ',

  [TRACKING_STRINGS.STEP_5]:
    'ከስሜትዎ ጋር በተያያዘ ተጨማሪ መረጃዎቸን ለማካተት ይሞክሩ  ይህም ቀኑን፣ ሰዓቱን፣ ቦታውን፣ ወቅታዊ ሁኔታዎችን ወይም ማንኛውንም ተዛማጅ ሀሳቦችን ወይም የእለቱን ክስተቶችን መጥቀስን ሊያካትት ይችላል። ይህም ለስሜትዎ አባባሽወይም አጋዥ  ምክንያቶች  ለመለየት ይረዳዎታል።',

  [TRACKING_STRINGS.STEP_6]:
    'በስሜትዎ እና በተመዘገቡት ምክንያቶች  መካከል ትስስሮችን ለመለየት የስሜት መከታተያ በመደበኛነት ይከልሱ። በስሜታዊ ደህንነትዎ ላይ አዎንታዊ ወይም አሉታዊ ተጽእኖ ያላቸውን ነገሮች ያጢኑ ',

  [TRACKING_STRINGS.STEP_7]: 'ልብ ይበሉ',
  [TRACKING_STRINGS.STEP_8]:
    'ስሜት ተለዋዋጭ መሆኑን  አይዘንጉ…የተለያዩ ስሜቶችን ማስተናገድ የተለመደ ነው። ስለሆነም  ስሜት መከታተያውን ራስን እንደመጠበቂያ ዘዴ እንጂ ራስዎን ለመገመት እና ለመውቀስ እንዳያውሉት ',
  [TRACKING_STRINGS.STEP_9]:
    'ስሜት ተለዋዋጭ መሆኑን  አይዘንጉ…የተለያዩ ስሜቶችን ማስተናገድ የተለመደ ነው። ስለሆነም  ስሜት መከታተያውን ራስን እንደመጠበቂያ ዘዴ እንጂ ራስዎን ለመገመት እና ለመውቀስ እንዳያውሉት ',
  [TRACKING_STRINGS.STEP_10]:
    'ከአቅም በላይ የሆነ ስሜት ከተሰማዎት ወይም የማያቋርጥ አሉታዊ ስሜትን ካስተዋሉ ድጋፍ ለማግኘት አዕምሮ ጤና ባለሙያን ማግኘት ይኖርበታል፡፡',
};
