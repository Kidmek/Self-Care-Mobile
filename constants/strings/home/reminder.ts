export enum REMINDER_STRINGS {
  DELETE_PROMPT = 'Are you sure you want to delete this reminder?',
  EMPTY_HISTORY = 'No reminder set yet',
  TYPE_OF_REMINDER = 'What do you want to be reminded of?',
  TYPE_OF_REMINDER_PLACEHOLDER = 'Select type of reminder',
  REMINDER_FREQUENCY = 'How often do you want to be reminded?',
  REMINDER_FREQUENCY_PLACEHOLDER = 'Select frequency of reminder',
  DAYS = 'When do you want to be reminded?',
  DAY_PLACEHOLDER = 'Select a day',
  DAYS_PLACEHOLDER = 'Select two days',
  TIME = 'What time do you want to be reminded',
  TIME_PLACEHOLDER = 'Select a time',
  TYPE_REQUIRED = 'Type of reminder required',
  FREQUENCY_REQUIRED = 'Frequency of reminder required',
  TIME_REQUIRED = 'Time of reminder required',
  DAYS_REQUIRED = 'Two days to remind required',
  DAY_REQUIRED = 'Day for reminder required',
  SELF_CARE_REMINDER = 'Self care reminder',
  HISTORY = 'History',
  NO_REMINDER_RESULTS = 'No reminders responded',
}
export enum DAYS {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}
export enum REMINDER_TYPES {
  JOURNALING = 'To write Journal',
  EXERCISE = 'To exercise',
  SLEEP = 'To sleep',
  TECHNIQUES = 'To practice relaxation techniques',
  FAMILY = 'To spend time with family/friends',
  REST = 'To take rest',
}

export enum REMINDER_TYPES_QNS {
  JOURNALING = 'Did you write Journal',
  EXERCISE = 'Did you exercise',
  SLEEP = 'Did you sleep',
  TECHNIQUES = 'Did you practice relaxation techniques',
  FAMILY = 'Did you spend time with family/friends',
  REST = 'Did you take rest',
}

export enum REMINDER_FREQUENCY {
  DAILY = 'Every day',
  WEEKLY = 'Once per week',
  BI_WEEKLY = 'Twice per week',
}
export const am_reminder_translations: {
  [placeholder in
    | REMINDER_STRINGS
    | REMINDER_FREQUENCY
    | REMINDER_TYPES_QNS
    | REMINDER_TYPES
    | DAYS]?: string;
} = {
  [REMINDER_STRINGS.DELETE_PROMPT]: 'እርግጠኛ ነዎት ይህን አስታዋሽ መሰረዝ ይፈልጋሉ?',
  [REMINDER_STRINGS.EMPTY_HISTORY]: 'እስካሁን ምንም አስታዋሽ አልተዘጋጀም።',
  [REMINDER_STRINGS.TYPE_OF_REMINDER]: 'ምን እንዲታወስ ትፈልጋለህ?',
  [REMINDER_STRINGS.TYPE_OF_REMINDER_PLACEHOLDER]: 'የማስታወሻ አይነት ይምረጡ',
  [REMINDER_STRINGS.REMINDER_FREQUENCY]: 'ምን ያህል ጊዜ ማሳሰብ ይፈልጋሉ?',
  [REMINDER_STRINGS.REMINDER_FREQUENCY_PLACEHOLDER]: 'የማስታወሻ ድግግሞሽ ይምረጡ',
  [REMINDER_STRINGS.DAYS]: 'መቼ ነው ለማስታወስ የሚፈልጉት?',
  [REMINDER_STRINGS.DAY_PLACEHOLDER]: 'አንድ ቀን ይምረጡ',
  [REMINDER_STRINGS.DAYS_PLACEHOLDER]: 'ሁለት ቀናትን ይምረጡ',
  [REMINDER_STRINGS.TIME]: 'ለማስታወስ የምትፈልገው ስንት ሰዓት ነው።',
  [REMINDER_STRINGS.TIME_PLACEHOLDER]: 'ጊዜ ይምረጡ',
  [REMINDER_STRINGS.TYPE_REQUIRED]: 'የማስታወሻ አይነት ያስፈልጋል',
  [REMINDER_STRINGS.FREQUENCY_REQUIRED]: 'የማስታወሻ ድግግሞሽ ያስፈልጋል',
  [REMINDER_STRINGS.TIME_REQUIRED]: 'የማስታወሻ ጊዜ ያስፈልጋል',
  [REMINDER_STRINGS.DAYS_REQUIRED]: 'ለማስታወስ ሁለት ቀናት ያስፈልጋል',
  [REMINDER_STRINGS.DAY_REQUIRED]: 'የማስታወሻ ቀን ያስፈልጋል',
  [REMINDER_STRINGS.SELF_CARE_REMINDER]: 'የራስ እንክብካቤ ማሳሰቢያ',
  [REMINDER_STRINGS.HISTORY]: 'ታሪክ',
  [REMINDER_STRINGS.NO_REMINDER_RESULTS]: 'ምንም አስታዋሾች ምላሽ አልሰጡም።',
  [REMINDER_FREQUENCY.DAILY]: 'በየቀኑ',
  [REMINDER_FREQUENCY.WEEKLY]: 'በሳምንት አንዴ',
  [REMINDER_FREQUENCY.BI_WEEKLY]: 'በሳምንት ሁለት ጊዜ',
  [REMINDER_TYPES.JOURNALING]: 'የሚሰማኝን መጻፍ',
  [REMINDER_TYPES.EXERCISE]: 'የአካል ብቃት እንቀስቃሴ ማድረግ',
  [REMINDER_TYPES.SLEEP]: 'እንቅልፍ መተኛት',
  [REMINDER_TYPES.TECHNIQUES]: 'ራስን ዘና /ለቀቅ ማድረጊያ ስልቶች መተግበር',
  [REMINDER_TYPES.FAMILY]: 'ከጓደኛ/ቤተሰብ ጋር ጊዜ ማሳለፍ',
  [REMINDER_TYPES.REST]: 'የእረፍት ጊዜ መውሰድ',
  [REMINDER_TYPES_QNS.JOURNALING]: 'የሚሰማኝን ጻፍኩኝ?',
  [REMINDER_TYPES_QNS.EXERCISE]: 'አካል ብቃት እንቅስቃሴ ዛሬ አድርገዋል',
  [REMINDER_TYPES_QNS.SLEEP]: 'ዛሬ በቂ እንቅልፍ ተኝቻለሁ',
  [REMINDER_TYPES_QNS.TECHNIQUES]: 'ራስን ዘና/ለቀቅ ማድረጊያ ስልቶችን ተጠቅሜያለሁ',
  [REMINDER_TYPES_QNS.FAMILY]: 'ከቤተሰብ/ከጓደኛ ወ.ዘ.ተ በቂ ጊዜ እያሳለፍኩ ነው',
  [REMINDER_TYPES_QNS.REST]: 'በቂ የእረፍት ጊዜ እየወሰድኩ ነው',
  [DAYS.Monday]: 'ሰኞ',
  [DAYS.Tuesday]: 'ማክሰኞ',
  [DAYS.Wednesday]: 'ረቡዕ',
  [DAYS.Thursday]: 'ሐሙስ',
  [DAYS.Friday]: 'ዓርብ',
  [DAYS.Saturday]: 'ቅዳሜ',
  [DAYS.Sunday]: 'እሁድ',
};
