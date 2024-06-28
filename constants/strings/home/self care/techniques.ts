export enum TECHNIQUES_STRINGS {
  JOURNALING = 'Journaling',
  // RELAXATION = 'Relaxation Techniques',
  SLEEPING = 'Sleeping Tips',
  BREATHING = 'Breathing Techniques',
  MUSCLE = 'Progressive Muscle Relaxation Techniques',
  GROUNDING = 'Grounding Techniques',
  DELETE_PROMPT = 'Are you sure you want to delete this journal?',
  EMPTY_HISTORY = 'No journal recorded yet',
  EMPTY_TIPS = 'No tips added yet',
}
export enum TipType {
  SLEEPING = 'sleeping',
  BREATHING = 'breathing',
  MUSCLE = 'muscle',
  GROUNDING = 'grounding',
}

export enum MEDIA_TYPE {
  PIC = 'PICTURE',
  VID = 'VIDEO',
}

export const am_assessment_translations: { [placeholder in TECHNIQUES_STRINGS]?: string } = {};
