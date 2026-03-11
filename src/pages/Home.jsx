import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolioContent.json';
import { parseBold } from '../utils/parseBold';
import { SECTION_IDS } from '../constants';

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const { personal, hero } = portfolioData;
  const roles = personal.roles;

  const [displayedText, setDisplayedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Mount + start typing
  useEffect(() => {
    const t = setTimeout(() => {
      setTimeout(() => {
        setAnimationStarted(true);
        setIsTyping(true);
      }, 600);
    }, 100);
    return () => clearTimeout(t);
  }, []);

  // Typing engine
  useEffect(() => {
    if (!animationStarted) return;
    const text = roles[currentRole];
    let timeout;
    if (isTyping) {
      if (displayedText.length < text.length) {
        timeout = setTimeout(
          () => setDisplayedText(text.slice(0, displayedText.length + 1)),
          70 + Math.random() * 40
        );
      } else {
        timeout = setTimeout(() => setIsTyping(false), 1800);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => setDisplayedText(displayedText.slice(0, -1)), 35);
      } else {
        timeout = setTimeout(() => {
          setCurrentRole((p) => (p + 1) % roles.length);
          setIsTyping(true);
        }, 300);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, currentRole, animationStarted, roles]);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setShowCursor((p) => !p), 500);
    return () => clearInterval(t);
  }, []);

  // Button actions mapped to JSON action strings
  const scrollToProjects = () =>
    document.getElementById(SECTION_IDS.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () =>
    document.getElementById(SECTION_IDS.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  const downloadResume = () => {
    const a = document.createElement('a');
    a.href = personal.resumeUrl;
    a.download = 'Samir_Randeriya_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const buttonActions = { scrollToProjects, scrollToContact, downloadResume };

  return (
    <>
      <section
        id={SECTION_IDS.HOME}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* ── Main content (background from global PageBackgroundWrapper) ── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center">

          {/* Availability badge */}
          {/* <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-10 cursor-default select-none animate-badgePop"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="relative flex items-center justify-center w-2 h-2">
              <span className="avail-ring" />
              <span className="w-2 h-2 rounded-full bg-green-400 relative z-10" />
            </span>
            Available for new projects
          </div> */}

          {/* Greeting + Name — from personal.firstName, personal.lastName, hero.greeting */}
          <div className="animate-fadeUp font-display" style={{ animationDelay: '0.2s' }}>
            {/* Profile Photo */}
            <div
              className="animate-fadeUp mb-8"
              style={{ animationDelay: '0.15s' }}
            >
              <div className="relative inline-block">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full blur-md opacity-40 scale-110"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
                />
                {/* Photo circle */}
                <div
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2"
                  style={{ borderColor: 'rgba(255,255,255,0.12)' }}
                >
                  <img
                    src={personal.avatar}
                    alt="Samir Randeriya"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-lg sm:text-xl font-light tracking-widest uppercase mb-3">
              {hero.greeting}
            </p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.02] tracking-tight">
              <span className="grad-text">{personal.firstName}</span>{' '}
              <span style={{ color: '#e2e8f0' }}>{personal.lastName}</span>
            </h1>
          </div>

          {/* Typing role — static fallback always visible; typewriter overlay when animation started (hidden in print) */}
          <div
            className="mt-6 min-h-[3rem] sm:min-h-[3.5rem] flex items-center justify-center gap-2 animate-fadeUp hero-role-line"
            style={{ animationDelay: '0.35s' }}
          >
            {/* Static fallback: no blank gap on load/PDF/slow JS; visible when typewriter inactive or in print */}
            <span
              className={`font-display text-xl sm:text-2xl md:text-3xl font-bold hero-role-static ${animationStarted ? 'sr-only' : ''}`}
              aria-hidden={animationStarted}
            >
              <span className="text-slate-400 font-light">{hero.rolePrefix}</span>
              <span className="grad-text">{roles[0]}</span>
            </span>
            {/* Typewriter: visible after animation starts; hidden in print via CSS */}
            {animationStarted && (
              <span className="hero-role-typewriter flex items-center gap-2">
                <span className="text-slate-400 text-xl sm:text-2xl md:text-3xl font-light">
                  {hero.rolePrefix}
                </span>
                <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold">
                  <span className="grad-text">{displayedText}</span>
                  <span
                    className="inline-block w-[2px] h-7 sm:h-8 md:h-9 ml-1 rounded-sm"
                    style={{
                      background: 'linear-gradient(to bottom, var(--accent), var(--accent2))',
                      opacity: showCursor ? 1 : 0,
                      transition: 'opacity 0.1s',
                      verticalAlign: 'middle',
                      marginBottom: '2px',
                    }}
                  />
                </span>
              </span>
            )}
          </div>

          {/* Description — from hero.description */}
          <div className="mt-8 max-w-2xl space-y-3 animate-fadeUp" style={{ animationDelay: '0.5s' }}>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed font-light">
              {parseBold(hero.description, 'text-accent font-semibold')}
            </p>
          </div>

          {/* Tech stack pills — single flowing wrap row */}
          <div
            className="mt-10 w-full max-w-5xl mx-auto flex flex-wrap justify-center gap-2.5 animate-fadeUp"
            style={{ animationDelay: '0.65s' }}
          >
            {hero.techStack.map((tech, i) => (
              <span
                key={tech}
                className="tech-pill px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-sm font-medium cursor-default animate-badgePop"
                style={{ animationDelay: `${0.65 + i * 0.04}s` }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Buttons — from hero.buttons */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeUp"
            style={{ animationDelay: '0.8s' }}
          >
            {hero.buttons.map((btn, i) => (
              <button
                key={i}
                onClick={buttonActions[btn.action]}
                className={`group flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-base text-white cursor-pointer ${btn.type === 'primary'
                  ? 'btn-primary'
                  : btn.type === 'secondary'
                    ? 'btn-secondary'
                    : 'btn-ghost'
                  }`}
              >
                {btn.icon && <span>{btn.icon}</span>}
                <span>{btn.text}</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
      </section>
    </>
  );
}