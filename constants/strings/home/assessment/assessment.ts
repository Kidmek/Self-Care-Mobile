import { makeObjects } from '~/utils/helper';

export const en_assessment_translations = {
  LIFE_WHEEL: 'Life Wheel Balance',
  MOOD_TRACKING: 'Mood Tracking',
};
type AssessmentStringsKeys = keyof typeof en_assessment_translations;

// @ts-ignore
export const ASSESSMENT_STRINGS: { [placeholder in AssessmentStringsKeys]: string } = makeObjects(
  Object.keys(en_assessment_translations)
);
export const am_assessment_translations: { [placeholder in AssessmentStringsKeys]: string } = {
  LIFE_WHEEL: 'ስምንቱን የህይወት ዋና ዋና ክፍሎች ግምገማ',
  MOOD_TRACKING: 'ስሜትን መለኪያ/መከታተያ',
};
