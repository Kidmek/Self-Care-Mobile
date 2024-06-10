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

export enum REMINDER_FREQUENCY {
  DAILY = 'Every day',
  WEEKLY = 'Once per week',
  BI_WEEKLY = 'Twice per week',
}
export const am_reminder_translations: { [placeholder in REMINDER_STRINGS]?: string } = {};
