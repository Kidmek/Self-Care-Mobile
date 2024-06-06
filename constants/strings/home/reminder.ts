export enum REMINDER_STRINGS {
  DELETE_PROMPT = 'Are you sure you want to delete this reminder?',
  EMPTY_HISTORY = 'No reminder set yet',
}
export enum REMINDER_TYPES {
  JOURNALING = 'To write Journal',
  EXERCISE = 'To exercise',
  SLEEP = 'To sleep',
  TECHNIQUES = 'To practice relaxation techniques',
  FAMILY = 'To spend time with family/friends',
  REST = 'To take rest',
}
export const am_reminder_translations: { [placeholder in REMINDER_STRINGS]?: string } = {};
