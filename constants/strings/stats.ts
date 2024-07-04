import { makeObjects } from '~/utils/helper';

export const en_stat_translations = {
  AVERAGE_WHEEL: 'Average life wheel for the past one month',
  TRACKING_TWO_WEEK: 'Mood tracking for the past two weeks',
  NO_HISTORY: 'No Records',
};
type StatStringsKeys = keyof typeof en_stat_translations;

// @ts-ignore
export const STAT_STRINGS: { [placeholder in StatStringsKeys]: string } = makeObjects(
  Object.keys(en_stat_translations)
);
export const am_stat_translations: { [placeholder in StatStringsKeys]: string } = {
  AVERAGE_WHEEL: 'ላለፈው አንድ ወር በራስ መገምገሚያ መስፈርት በስምንቱ ነጥቦች ያለው አማካኝ ውጤት',
  TRACKING_TWO_WEEK: 'የሁለት ሳምንታት ስሜት መለኪያው',
  NO_HISTORY: 'ምንም መዝገብ የለም',
};
