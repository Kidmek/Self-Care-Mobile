// export enum WHEEL_SECTIONS {
//   FINANCIAL = 'Financial Stability',
//   PERSONAL = 'Personal Growth and Learning',
//   SPIRITUALITY = 'Spirituality and Meaning',
//   RECREATION = 'Recreation and Leisure',
//   RELATIONSHIP = 'Relationships and Social Connections',
//   MENTAL = 'Mental and Emotional Well-being',
//   CAREER = 'Career and Work Life',
//   PHYSICAL = 'Physical Health',
// }

export const WHEEL_SECTIONS = [
  {
    shortName: 'FINANCIAL',
    longName: 'Financial Stability',
    description:
      'This component relates to financial management, budgeting, savings, debt management, and overall financial security.',
  },
  {
    shortName: 'PERSONAL',
    longName: 'Personal Growth and Learning',
    description:
      'This includes continuous learning, personal development, setting and achieving goals, and pursuing new experiences and challenges.',
  },
  {
    shortName: 'SPIRITUALITY',
    longName: 'Spirituality and Meaning',
    description:
      'This component focuses on personal beliefs, values, purpose, meaning in life, and a sense of connection to something greater than oneself.',
  },
  {
    shortName: 'RECREATION',
    longName: 'Recreation and Leisure',
    description:
      'This involves activities that bring joy, relaxation, and a sense of fulfilment, such as hobbies, creative pursuits, and recreational activities.',
  },
  {
    shortName: 'RELATIONSHIP',
    longName: 'Relationships and Social Connections',
    description:
      'This component focuses on the quality of relationships, social support, communication skills, and the ability to establish and maintain meaningful connections with others.',
  },
  {
    shortName: 'MENTAL',
    longName: 'Mental and Emotional Well-being',
    description:
      'This involves mental health, emotional intelligence, self-awareness, stress management, and resilience.',
  },
  {
    shortName: 'CAREER',
    longName: 'Career and Work Life',
    description:
      "This considers satisfaction and fulfillment in one's profession or chosen career path, work-life balance, personal growth, and professional development.",
  },
  {
    shortName: 'PHYSICAL',
    longName: 'Physical Health',
    description:
      'This includes aspects such as exercise, nutrition, sleep, and overall physical well-being.',
  },
];
export enum WHEEL_STRINGS {
  SATISFIED_QNS = 'How satisfied are you in this area?',
  DESCRIPTION = 'Description',
  GUIDELINE = 'Guideline',
  STEP_1 = 'Rate each section: Assign a rating or score to each section on a scale of 1 to 10, with 1 being the lowest and 10 being the highest. The rating indicates your level of satisfaction or fulfilment in that particular area of your life.',
  STEP_2 = 'Select the assigned scores or ratings in each section of the Life Wheel Balance. The app will display the score on the outer edge of the corresponding section.',
  STEP_3 = 'Once you fill this will create a visual representation of your life wheel.',
  STEP_4 = 'Analyze the results: Take a look at the completed Life Wheel Balance. Observe the overall shape and balance of the wheel. A balanced wheel will have all the sections relatively close in score, forming a smooth and round shape. A lopsided or uneven wheel indicates areas of your life that may require more attention or improvement.',
  STEP_5 = 'Set goals for improvement: Identify the areas of your life that scored lower or need improvement. Reflect on how you can enhance those areas and set specific goals to work towards achieving a more balanced life. Consider what actions, changes, or adjustments you can make to improve your satisfaction or fulfillment in those areas.',
}
export const am_wheel_translations: { [placeholder in WHEEL_STRINGS]?: string } = {};
