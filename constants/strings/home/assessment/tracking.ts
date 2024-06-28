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
  FEELING_QNS = 'How are you feeling?',
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
export const am_tracking_translations: { [placeholder in TRACKING_STRINGS]?: string } = {};
