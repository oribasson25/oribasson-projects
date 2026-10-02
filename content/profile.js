/*
 * Who you are. Everything on the site, and everything the chatbot knows,
 * comes from the files in this folder — edit them, push, and Vercel deploys.
 *
 * Any text field can be a plain string (shown in both languages) or
 * { en: '...', he: '...' } when the two differ.
 */
export default {
  name: { en: 'Ori Basson', he: 'אורי בסון' },

  // One line under your name.
  headline: {
    en: 'AI Solutions Engineer · Production LLM agents',
    he: 'הנדסת פתרונות AI · סוכני LLM בפרודקשן',
  },

  location: { en: 'Israel', he: 'ישראל' },

  // How the chatbot refers to you, e.g. 'he/him'. Left empty, it uses your
  // name and avoids pronouns — but Hebrew grammar still needs a gender, so
  // fill this in.
  pronouns: '',

  // 'third-person' — the chatbot is your assistant and talks about you.
  // 'first-person' — the chatbot answers as you ("I worked at…").
  voice: 'third-person',

  // Shown in the sidebar card. Leave a field empty to hide it.
  contact: {
    email: 'oribasson25@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ori-basson-616179356',
    github: '',     // full URL
    phone: '053-4281121',
    website: '',
  },

  // A PDF of your resume, placed in /public (e.g. '/cv.pdf'). Empty hides the button.
  cvPdf: '',

  // Anything else the chatbot should know that does not fit the resume:
  // what you are looking for, availability, notice period, salary range you
  // are comfortable sharing, work style, hobbies… Plain text, any length.
  about: { en: '', he: '' },
};
