export enum TECHNIQUES_STRINGS {
  JOURNALING = 'Journaling',
  // RELAXATION = 'Relaxation Techniques',
  SLEEPING = 'Sleeping Tips',
  BREATHING = 'Breathing Techniques',
  MUSCLE = 'Progressive Muscle Relaxation Techniques',
  GROUNDING = 'Grounding Techniques',
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

export const am_technique_translations: { [placeholder in TECHNIQUES_STRINGS]?: string } = {
  [TECHNIQUES_STRINGS.JOURNALING]: 'የሚሰማዎትን መጻፍ',
  [TECHNIQUES_STRINGS.SLEEPING]: 'ስለእንቅልፍ ጠቃሚ ነጥቦች',
  [TECHNIQUES_STRINGS.BREATHING]: 'የአተነፋፈስ መንገዶች',
  [TECHNIQUES_STRINGS.MUSCLE]: 'ጡንቻዎችን የማፍታት ስልቶች',
  [TECHNIQUES_STRINGS.GROUNDING]: 'የትኩረት አቅጣጫን የመቀየር ልምምዶች',
  [TECHNIQUES_STRINGS.EMPTY_TIPS]: 'እስካሁን ምንም ምክሮች አልተጨመሩም።',
};
