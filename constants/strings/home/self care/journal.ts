export enum JOURNALING_STRINGS {
  TITLE = 'Title',
  JOURNAL = 'Journal',
  DELETE_PROMPT = 'Are you sure you want to delete this journal?',
  STEP_1 = 'Clarify why you want to start a self-journal. Determine your intentions and what you hope to achieve through journaling. It could be self-discovery, self-improvement, tracking progress, or simply having a space for self-expression.',
  STEP_2 = 'This consistency will help you establish a habit and make it easier to reflect on your experiences and thoughts.',
  STEP_3 = ' Start each journaling session with a prompt or question to guide your writing. It can be general or specific, depending on what you want to explore. For example, "What am I grateful for today?" or "What challenges did I face and what did I learn from them?"',
  STEP_4 = "Write freely and honestly: Allow your thoughts and emotions to flow onto the pages. Write honestly and authentically without judgment. Don't worry about grammar, spelling, or structure. Focus on self-expression and exploration.",
  STEP_5 = 'Reflect on experiences: Use your journal to reflect on significant experiences, events, or interactions from your day or week. Explore how they made you feel, what you learned, and how you can apply those insights in the future.',
  STEP_6 = "Use your self-journal as a space to set goals and intentions for personal growth. Write down your aspirations, dreams, and the steps you'll take to achieve them. Track your progress and celebrate milestones along the way.",
  STEP_7 = ' Dedicate a section of your self-journal to gratitude. Write down things you are thankful for each day. Cultivating gratitude can increase positivity and shift your focus towards the positive aspects of your life.',
}
export const am_journaling_translations: { [placeholder in JOURNALING_STRINGS]?: string } = {};
