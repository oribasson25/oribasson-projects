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
