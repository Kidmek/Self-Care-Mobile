import { makeObjects } from '~/utils/helper';

export const JOURNALING_INFO_EN = {
  STEP_1:
    'Clarify why you want to start a self-journal. Determine your intentions and what you hope to achieve through journaling. It could be self-discovery, self-improvement, tracking progress, or simply having a space for self-expression.',
  STEP_2:
    'This consistency will help you establish a habit and make it easier to reflect on your experiences and thoughts.',
  STEP_3:
    ' Start each journaling session with a prompt or question to guide your writing. It can be general or specific, depending on what you want to explore. For example, "What am I grateful for today?" or "What challenges did I face and what did I learn from them?"',
  STEP_4:
    "Write freely and honestly: Allow your thoughts and emotions to flow onto the pages. Write honestly and authentically without judgment. Don't worry about grammar, spelling, or structure. Focus on self-expression and exploration.",
  STEP_5:
    'Reflect on experiences: Use your journal to reflect on significant experiences, events, or interactions from your day or week. Explore how they made you feel, what you learned, and how you can apply those insights in the future.',
  STEP_6:
    "Use your self-journal as a space to set goals and intentions for personal growth. Write down your aspirations, dreams, and the steps you'll take to achieve them. Track your progress and celebrate milestones along the way.",
  STEP_7:
    ' Dedicate a section of your self-journal to gratitude. Write down things you are thankful for each day. Cultivating gratitude can increase positivity and shift your focus towards the positive aspects of your life.',
};
export const JOURNALING_INFO_AM = {
  STEP_1:
    'ለምን መጻፍ መጀመር እንደሚፈልጉ ያብራሩ።  እራስን ፈልጎ ማግኘት፣ ራስን ማሻሻል፣ ለውጥን መከታተል ወይም በቀላሉ እራስን ለመግለጽ እና ለማግኘት  ወ.ዘ.ተ ሊሆን ይችላል',
  STEP_2: 'ለመፃፍ  መደበኛ ጊዜ እና ቦታ ቢኖርዎት ይመረጣል። ይህ ወጥነት አንድ መጻፍን ልማድ እንዲያደርጉ ይረዳዎታል ',
  STEP_3:
    'በደንብ ለመጻፍ እንዲሰችልዎ ሲጽፉ በጥያቄ ይጀምሩ። ለመዳሰስ በሚፈልጉት  አጠቃላይ  ነገር ላይ በመመስረት ወይም የተለየ ጉዳይ ላይ ሊሆን ይችላል። ለምሳሌ "ዛሬን ስለምን ምክንያት አመሰግናለሁ?" ወይም "ምን ፈተናዎች አጋጥመውኛል እና ከእነሱ ምን ተማርኩ?"',
  STEP_4:
    'ሃሳቦችዎ እና ስሜቶችዎን ራስዎን ሳይገምቱ  በነጻነት እና በሃቀኝነት የጻፉ ። ያስለ ሰዋሰው፣ ሆሄያት ወይም መዋቅር አይጨነቁ። ራስን በመግለጽ እና በመዳሰስ ላይ ብቻ ያተኩሩ።',
  STEP_5:
    'ከቀንዎት ወይም ከሳምንትዎ ጉልህ የሆኑ ልምዶችን፣ ክስተቶችን፣ ወይም ግንኙነቶችን ለማሰላሰል ጆርናሉን/መጻፊያውን ይጠቀሙ  ምን እንደተሰማዎት፣ ምን እንደተማሩ እና ለወደፊቱ እነዚያን ግንዛቤዎች እንዴት ተግባራዊ ማድረግ እንደሚችሉ ወ.ዘ.ተ ያስቡ።',
  STEP_6:
    'ለግል እድገትዎ፤ግቦችን እና አላማዎችን ለማዘጋጀት የፃፏቸውን ጽሁፎች ይጠቀሙ።ምኞቶችዎን ፣ ህልሞችዎን እና እነሱን ለማሳካት የሚወስዷቸውን እርምጃዎች ይፃፉ። ሂደትዎን እና ስኬተዎችዎን  ይከታተሉ',
  STEP_7:
    'የጻፉትን ጽሁፍ ስኬትዎችዎን ለመቁጠር ብሎም ለማመስገን ይጠቀሙበት። ለእያንዳንዱ ቀን የሚያመሰግኑበትን ምክንያት ይጻፉ። ምስጋናን ማዳበር አዎንታዊነትን ሊጨምር እና ትኩረትዎን ወደ ህይወትዎ አወንታዊ ገጽታዎች ሊያዛውረው ይችላል።',
};

export const en_journaling_translations = {
  TITLE: 'Title',
  JOURNAL: 'Journal',
  DELETE_PROMPT: 'Are you sure you want to delete this journal?',

  EMPTY_JOURNAL_HISTORY: 'No journal recorded yet',
};
type JournalingStringsKeys = keyof typeof en_journaling_translations;

// @ts-ignore
export const JOURNALING_STRINGS: { [placeholder in JournalingStringsKeys]: string } = makeObjects(
  Object.keys(en_journaling_translations)
);
export const am_journaling_translations: { [placeholder in JournalingStringsKeys]: string } = {
  TITLE: 'ርዕስ',
  JOURNAL: 'ፅሁፍ',
  DELETE_PROMPT: 'እርግጠኛ ነዎት ይህን መሰረዝ ይፈልጋሉ?',
  EMPTY_JOURNAL_HISTORY: 'እስካሁን ምንም ፅሁፍ አልተመዘገበም።',
};
