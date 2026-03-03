import { useState, useEffect, useRef, useCallback } from 'react';
import portfolioData from '../data/portfolioContent.json';
import { parseBold } from '../utils/parseBold';
import { SECTION_IDS, BACKGROUND_DARK } from '../constants';

// ─── Stat Badge ────────────────────────────────────────────────────────────────
function StatBadge({ number, label }) {
  return (
    <div className="flex flex-col items-center px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <span className="text-2xl font-black text-white leading-none">{number}</span>
      <span className="text-xs text-slate-400 mt-1 font-medium tracking-wide uppercase">{label}</span>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const { personal, hero, about } = portfolioData;
  const roles = personal.roles;

  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);
  const mousePos = useRef({ x: 50, y: 50 });
  const [, setTick] = useState(0); // forces re-render when parallax position updates
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return; // already scheduled
    rafRef.current = requestAnimationFrame(() => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
      setTick((t) => t + 1);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return; // don't attach listener on touch devices
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  // Mount + start typing
  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoaded(true);
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
        style={{ background: BACKGROUND_DARK }}
      >
        {/* Background layers */}
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        {/* Mouse-following radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.current.x}% ${mousePos.current.y}%, rgba(56,189,248,0.06) 0%, transparent 60%)`,
          }}
        />

        {/* Floating colour orbs */}
        <div className="absolute top-[10%] left-[5%] w-[480px] h-[480px] rounded-full opacity-20 animate-floatA pointer-events-none"
          style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-[5%] right-[5%] w-[420px] h-[420px] rounded-full opacity-15 animate-floatB pointer-events-none"
          style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-[50%] left-[60%] w-[300px] h-[300px] rounded-full opacity-10 animate-floatC pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)', filter: 'blur(50px)' }} />

        {/* ── Main content ── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center">

          {/* Availability badge */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-10 cursor-default select-none animate-badgePop"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="relative flex items-center justify-center w-2 h-2">
              <span className="avail-ring" />
              <span className="w-2 h-2 rounded-full bg-green-400 relative z-10" />
            </span>
            Available for new projects
          </div>

          {/* Greeting + Name — from personal.firstName, personal.lastName, hero.greeting */}
          <div className="animate-fadeUp font-display" style={{ animationDelay: '0.2s' }}>
            <p className="text-slate-400 text-lg sm:text-xl font-light tracking-widest uppercase mb-3">
              {hero.greeting}
            </p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.02] tracking-tight">
              <span className="grad-text">{personal.firstName}</span>{' '}
              <span style={{ color: '#e2e8f0' }}>{personal.lastName}</span>
            </h1>
          </div>

          {/* Typing role — from personal.roles & personal.title & hero.rolePrefix */}
          <div
            className="mt-6 h-12 sm:h-14 flex items-center gap-2 animate-fadeUp"
            style={{ animationDelay: '0.35s' }}
          >
            <span className="text-slate-400 text-xl sm:text-2xl md:text-3xl font-light">
              {hero.rolePrefix}
            </span>
            <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold">
              <span className="grad-text">
                {animationStarted ? displayedText : personal.title}
              </span>
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
          </div>

          {/* Description — from hero.description */}
          <div className="mt-8 max-w-2xl space-y-3 animate-fadeUp" style={{ animationDelay: '0.5s' }}>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed font-light">
              {parseBold(hero.description, 'text-accent font-semibold')}
            </p>
          </div>

          {/* Tech stack pills — from hero.techStack */}
          <div
            className="mt-10 flex flex-wrap justify-center gap-2.5 animate-fadeUp"
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
                <span>{btn.icon}</span>
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

          {/* Stats — from about.personalStats */}
          <div
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl animate-fadeUp"
            style={{ animationDelay: '1s' }}
          >
            {about.personalStats.map((stat) => (
              <StatBadge key={stat.label} number={stat.number} label={stat.label} />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 right-8 flex flex-col items-center gap-2 text-slate-500 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="relative w-px h-14 bg-slate-700/50 overflow-hidden rounded-full">
            <span
              className="absolute top-0 left-0 w-full h-5 rounded-full animate-scrollDot"
              style={{ background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)' }}
            />
          </div>
        </div>

        {/* Bottom gradient fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${BACKGROUND_DARK}, transparent)` }}
        />
      </section>
    </>
  );
}