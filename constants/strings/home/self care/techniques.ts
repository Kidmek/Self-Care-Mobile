import { makeObjects } from '~/utils/helper';

export const en_techniques_translations = {
  JOURNALING: 'Journaling',
  SLEEPING: 'Sleeping Tips',
  BREATHING: 'Breathing Techniques',
  MUSCLE: 'Progressive Muscle Relaxation Techniques',
  GROUNDING: 'Grounding Techniques',
  EMPTY_TIPS: 'No tips added yet',
};
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

type TechniquesStringsKeys = keyof typeof en_techniques_translations;

// @ts-ignore
export const TECHNIQUES_STRINGS: { [placeholder in TechniquesStringsKeys]: string } = makeObjects(
  Object.keys(en_techniques_translations)
);

export const am_technique_translations: { [placeholder in TechniquesStringsKeys]?: string } = {
  JOURNALING: 'የሚሰማዎትን መጻፍ',
  SLEEPING: 'ስለእንቅልፍ ጠቃሚ ነጥቦች',
  BREATHING: 'የአተነፋፈስ መንገዶች',
  MUSCLE: 'ጡንቻዎችን የማፍታት ስልቶች',
  GROUNDING: 'የትኩረት አቅጣጫን የመቀየር ልምምዶች',
  EMPTY_TIPS: 'እስካሁን ምንም ምክሮች አልተጨመሩም።',
};
