/*
 * Your projects, newest first. The Projects page renders them as cards, and
 * the chatbot answers from them.
 *
 * Fields: id, name, tagline, year, role, description, highlights, tech,
 * links: { live, repo }, image (a file in /public). Text takes a string or
 * { en, he }.
 */
const LIBRA = { en: 'AI Solutions Engineering · Libra Insurance', he: 'הנדסת פתרונות AI · ליברה ביטוח' };

export default [
  {
    id: '8legs',
    name: '8Legs.ai',
    tagline: {
      en: 'A platform that builds AI chatbots for businesses — from a conversation, no code',
      he: 'פלטפורמה לבניית צ׳טבוטים חכמים לעסקים — מתוך שיחה, בלי קוד',
    },
    year: '2026',
    role: { en: 'Personal project · Design & full-stack development', he: 'פרויקט אישי · עיצוב ופיתוח full-stack' },
    description: {
      en: 'A business describes itself in plain words and gets a working AI chatbot: it answers from the business\'s own documents and website, records data into tables, sends email from a real Gmail inbox, calls external systems, and goes live as a website widget or on WhatsApp Business. Full English and Hebrew interface; the account chooses Claude, GPT, or a local model through Ollama.',
      he: 'עסק מתאר את עצמו במילים ומקבל צ׳טבוט AI שעובד: הוא עונה מתוך המסמכים והאתר של העסק, רושם נתונים לטבלאות, שולח מיילים מתיבת Gmail אמיתית, מתחבר למערכות חיצוניות ועולה לאוויר כווידג׳ט באתר או ב-WhatsApp Business. ממשק מלא בעברית ובאנגלית, ובחירה בין Claude, ‏GPT או מודל מקומי דרך Ollama.',
    },
    highlights: {
      en: [
        { title: 'Autopilot', text: 'A wizard that asks only about the business and builds the whole chatbot — prompt, knowledge, tables, email and channel.' },
        { title: 'Knowledge (RAG)', text: 'PDF and Word uploads and whole-domain website crawling, with full-text search and a Hebrew–English keyword bridge.' },
        { title: 'Chatbots as code', text: 'An npm CLI and a private GitHub repo per chatbot, with branches and A/B tests on live traffic.' },
        { title: 'Python tools', text: 'Custom tools in Python with any pip package, edited in the Monaco code editor.' },
        { title: 'Privacy', text: 'Credit-card and Israeli ID numbers are masked before they reach the model or the conversation history.' },
      ],
      he: [
        { title: 'Autopilot', text: 'אשף ששואל רק על העסק ובונה את הצ׳טבוט כולו — פרומפט, ידע, טבלאות, מייל וערוץ.' },
        { title: 'ידע (RAG)', text: 'העלאת PDF ו-Word וסריקת אתר שלם, עם חיפוש טקסט מלא וגשר מילות מפתח בין עברית לאנגלית.' },
        { title: 'צ׳טבוט כקוד', text: 'CLI ב-npm וריפו GitHub פרטי לכל צ׳טבוט, עם ענפים וניסויי A/B על תנועה אמיתית.' },
        { title: 'כלים ב-Python', text: 'כלים מותאמים ב-Python עם כל חבילת pip, בעורך הקוד Monaco.' },
        { title: 'פרטיות', text: 'הסתרה אוטומטית של מספרי כרטיס אשראי ותעודות זהות לפני שהם מגיעים למודל או להיסטוריית השיחות.' },
      ],
    },
    tech: ['React', 'Vercel Serverless', 'Node.js', 'Python', 'Neon PostgreSQL', 'Claude API', 'WhatsApp Cloud API', 'Playwright'],
    links: { live: 'https://www.8legs.world' },
  },
  {
    id: 'claims-voice-agent',
    name: { en: 'Unified Hebrew Voice & Status Agent for Claims', he: 'סוכן קולי מאוחד בעברית לתביעות ולבירור סטטוס' },
    tagline: { en: 'Inbound voice · Full CRM integration', he: 'שיחות נכנסות · אינטגרציה מלאה ל-CRM' },
    role: LIBRA,
    description: {
      en: 'End-to-end claim intake and status inquiry agent in Hebrew with live CRM read/write, validation, and error recovery.',
      he: 'סוכן בעברית שמטפל מקצה לקצה בפתיחת תביעות ובבירורי סטטוס, עם קריאה וכתיבה חיות ב-CRM, ולידציה ושחזור משגיאות.',
    },
    highlights: {
      en: ['~10,000 calls a month', '~70% deflection from human agents'],
      he: ['כ-10,000 שיחות בחודש', 'כ-70% מהשיחות מטופלות בלי נציג אנושי'],
    },
  },
  {
    id: 'back-office-agent',
    name: { en: 'Back-Office Email & Document Processing Agent', he: 'סוכן Back-Office לעיבוד מיילים ומסמכים' },
    tagline: { en: 'Multi-modal LLM + OCR', he: 'LLM מולטי-מודאלי + OCR' },
    role: LIBRA,
    description: {
      en: 'Autonomous back-office agent that processes incoming emails, extracts and files documents into relevant claim folders using OCR, resolves status queries, and automatically creates structured tasks in core systems.',
      he: 'סוכן אוטונומי שמעבד מיילים נכנסים, מחלץ מסמכים ומתייק אותם בתיקי התביעה המתאימים בעזרת OCR, עונה על בירורי סטטוס ופותח אוטומטית משימות מובנות במערכות הליבה.',
    },
  },
  {
    id: 'live-call-intelligence',
    name: { en: 'Live Call Intelligence Agent', he: 'סוכן מודיעין שיחות בזמן אמת' },
    tagline: { en: 'Real-time · Event-driven', he: 'זמן אמת · מונחה אירועים' },
    role: LIBRA,
    description: {
      en: 'Runs alongside human calls; detects escalation signals, summarizes context, and writes structured CRM events while the call is still in progress.',
      he: 'רץ במקביל לשיחות של נציגים: מזהה סימני הסלמה, מסכם את ההקשר וכותב אירועים מובנים ל-CRM עוד במהלך השיחה.',
    },
  },
  {
    id: 'policy-documents',
    name: { en: 'Policy Document Delivery Agent', he: 'סוכן לשליחת מסמכי פוליסה' },
    tagline: { en: 'Chat · Identity verification', he: 'צ׳אט · אימות זהות' },
    role: LIBRA,
    description: {
      en: 'Authenticates customers, locates active policies, and automatically sends requested documentation via chat.',
      he: 'מאמת את זהות הלקוח, מאתר את הפוליסות הפעילות ושולח אוטומטית בצ׳אט את המסמכים המבוקשים.',
    },
  },
];
