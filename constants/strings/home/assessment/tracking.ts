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
  FEELING_QNS = 'How are you feeling?',
  ADDITIONAL_INFO = 'Additional Information',
  MOOD = 'Mood',
  DESCRIPTION = 'Description',
  DELETE_PROMPT = 'Are you sure you want to delete this record?',
  EMPTY_HISTORY = 'No mood recorded yet',
}
export const am_tracking_translations: { [placeholder in TRACKING_STRINGS]?: string } = {};
