import { makeObjects } from '~/utils/helper';

export const en_assessment_translations = {
  LIFE_WHEEL: 'Life Wheel Balance',
  LIFE_WHEEL_DESC:
    'You assess and evaluate your level of satisfaction and balance in each area of life , with the goal of identifying areas that may require attention or improvement to achieve your overall well-being.',
  MOOD_TRACKING: 'Mood Tracking',
  MOOD_TRACKING_DESC:
    'You record how you feel at a time and place of your choice, which often helps you better understand how you feel and make adjustments.',
};
type AssessmentStringsKeys = keyof typeof en_assessment_translations;

// @ts-ignore
export const ASSESSMENT_STRINGS: { [placeholder in AssessmentStringsKeys]: string } = makeObjects(
  Object.keys(en_assessment_translations)
);
export const am_assessment_translations: { [placeholder in AssessmentStringsKeys]: string } = {
  LIFE_WHEEL: 'ስምንቱን የህይወት ዋና ዋና ክፍሎች ግምገማ',
  LIFE_WHEEL_DESC:
    'በእያንዳንዱ የህይወት ዘርፍ ያለዎትን የእርካታ ደረጃ እና ሚዛናዊነት ይዳስሳሉ/ይገመግማሉ ፣ ዓላማው ሙሉ ጤናዎትን ለመጠበቅ ይረዳዎ ዘንድ ትኩረት ወይም መሻሻል የሚሹ አካባቢዎችን ለመለየት እና ለማሻሻል እንዲችሉ ማድረግ ነው፡፡',
  MOOD_TRACKING: 'ስሜትን መለኪያ/መከታተያ',
  MOOD_TRACKING_DESC:
    'በመረጡት ጊዜ እና ሰዓት ስሜትዎ ምን እንደሚመስል ይመዘግባሉ፡፡ይህም አብዛኛውን ጊዜ ስሜትዎ ምን እንደሚመስል በቀላሉ እንዲረዱ እና ማስተካከያዎችን ማድረግ እንዲችሉ ይረዳዎታል፡፡',
};
