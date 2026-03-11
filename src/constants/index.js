// ─── Navigation (anchor hashes for scroll / href) ─────────────────────────────
export const NAV_ANCHORS = {
  HOME: '#home',
  ABOUT: '#about',
  SKILLS: '#skills',
  EXPERIENCE: '#experience',
  PROJECTS: '#projects',
  PROCESS: '#process',
  CONTACT: '#contact',
  CHAT: '#chat',
};

// ─── Section IDs (for id attribute and getElementById) ───────────────────────
export const SECTION_IDS = {
  HOME: 'home',
  ABOUT: 'about',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  PROCESS: 'process',
  CONTACT: 'contact',
};

// ─── External URLs ───────────────────────────────────────────────────────────
export const SOCIAL_URLS = {
  GITHUB: 'https://github.com/samir-randeriya',
  LINKEDIN: 'https://www.linkedin.com/in/samir-randeriya-578a17185/',
  UPWORK: 'https://www.upwork.com/freelancers/~014e94a19f6e639b39',
  WHATSAPP: 'https://wa.me/9190999400550',
  INSTAGRAM: 'https://www.instagram.com/sam_randeriya__/',
  TWITTER: 'https://x.com/s_randeriya',
};

// ─── Animation / Timing ──────────────────────────────────────────────────────
export const ANIMATION = {
  DURATION_FAST: 300,
  DURATION_BASE: 500,
  DURATION_SLOW: 800,
  EASING_DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASING_SMOOTH: 'cubic-bezier(.22, 1, .36, 1)',
  INVIEW_THRESHOLD: 0.1,
  INVIEW_THRESHOLD_LOW: 0.05,
  INVIEW_THRESHOLD_MED: 0.15,
  INVIEW_THRESHOLD_HIGH: 0.2,
};

// ─── Design Tokens ───────────────────────────────────────────────────────────
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
};

// ─── Theme / Colors ───────────────────────────────────────────────────────────
export const BACKGROUND_DARK = '#060811';

// Re-export theme and tailwind constants (icons are JSX — import from './icons')
export * from './themes';
export * from './tailwind';
export * from './env';
