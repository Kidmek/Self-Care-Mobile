export enum WHEEL_SECTIONS {
  FINANCIAL = 'Financial Stability',
  PERSONAL = 'Personal Growth and Learning',
  SPIRITUALITY = 'Spirituality and Meaning',
  RECREATION = 'Recreation and Leisure',
  RELATIONSHIP = 'Relationships and Social Connections',
  MENTAL = 'Mental and Emotional Well-being',
  CAREER = 'Career and Work Life',
  PHYSICAL = 'Physical Health',
}
export enum WHEEL_STRINGS {
  SATISFIED_QNS = 'How satisfied are you in this area?',
}
export const am_wheel_translations: { [placeholder in WHEEL_SECTIONS | WHEEL_STRINGS]?: string } =
  {};
