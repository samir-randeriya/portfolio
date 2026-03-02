import { useState, useEffect, useRef } from 'react';
import portfolioData from '../data/portfolioContent.json';

// ─── Helpers ───────────────────────────────────────────────────────────────────
function parseBold(text) {
  if (!text) return null;
  return text.split('**').map((part, i) =>
    i % 2 === 0
      ? part
      : <span key={i} className="text-accent font-semibold">{part}</span>
  );
}

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
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const rafRef = useRef(null);
  const targetPos = useRef({ x: 50, y: 50 });
  const curPos = useRef({ x: 50, y: 50 });

  // Smooth parallax mouse tracking
  useEffect(() => {
    const onMove = (e) => {
      targetPos.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
    };
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      curPos.current.x = lerp(curPos.current.x, targetPos.current.x, 0.06);
      curPos.current.y = lerp(curPos.current.y, targetPos.current.y, 0.06);
      setMousePos({ x: curPos.current.x, y: curPos.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const downloadResume = () => {
    const a = document.createElement('a');
    a.href = personal.resumeUrl;
    a.download = 'Samir_Randeriya_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const buttonActions = { scrollToProjects, scrollToContact, downloadResume };

  // Social links — icons are SVG since JSON can't store JSX
  const socialLinks = [
    {
      href: personal.github,
      label: 'GitHub',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
    },
    {
      href: `https://${personal.linkedin}`,
      label: 'LinkedIn',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      href: personal.twitter,
      label: 'Twitter / X',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      href: `mailto:${personal.email}`,
      label: 'Email',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        :root {
          --accent:  #38bdf8;
          --accent2: #818cf8;
          --accent3: #f472b6;
        }

        #home * { font-family: 'DM Sans', sans-serif; }
        #home .font-display { font-family: 'Syne', sans-serif; }

        .text-accent { color: var(--accent); }

        .grad-text {
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 50%, var(--accent3) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes floatA {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(20px,-30px) scale(1.05); }
        }
        @keyframes floatB {
          0%,100% { transform: translate(0,0) scale(1.05); }
          50%      { transform: translate(-25px,20px) scale(1); }
        }
        @keyframes floatC {
          0%,100% { transform: translate(0,0); }
          33%      { transform: translate(15px,15px); }
          66%      { transform: translate(-10px,-20px); }
        }
        @keyframes orbitRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes scrollDot {
          0%   { opacity: 0; transform: translateY(-4px); }
          50%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(16px); }
        }
        @keyframes badgePop {
          0%   { transform: scale(0.85); opacity: 0; }
          70%  { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.7); opacity: 0; }
        }

        .animate-fadeUp    { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }
        .animate-fadeIn    { animation: fadeIn 0.6s ease both; }
        .animate-floatA    { animation: floatA 9s ease-in-out infinite; }
        .animate-floatB    { animation: floatB 11s ease-in-out infinite; }
        .animate-floatC    { animation: floatC 13s ease-in-out infinite; }
        .animate-orbit     { animation: orbitRing 20s linear infinite; }
        .animate-scrollDot { animation: scrollDot 1.6s ease-in-out infinite; }
        .animate-badgePop  { animation: badgePop 0.4s cubic-bezier(.34,1.56,.64,1) both; }

        .avail-ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          background: rgba(34,197,94,0.5);
          animation: pulseRing 2s ease-out infinite;
        }

        .tech-pill { transition: all 0.25s cubic-bezier(.34,1.56,.64,1); }
        .tech-pill:hover {
          transform: translateY(-3px) scale(1.08);
          border-color: var(--accent);
          background: rgba(56,189,248,0.12);
          box-shadow: 0 0 16px rgba(56,189,248,0.25);
        }

        /* ── Buttons ── */
        .btn-primary {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          position: relative; overflow: hidden;
          transition: all 0.3s ease;
        }
        .btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--accent2), var(--accent3));
          opacity: 0; transition: opacity 0.3s;
        }
        .btn-primary:hover::before { opacity: 1; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(56,189,248,0.35); }
        .btn-primary > * { position: relative; z-index: 1; }

        .btn-secondary {
          border: 1.5px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.04);
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          border-color: rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.09);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        .btn-ghost {
          border: 1.5px solid transparent;
          background: transparent;
          transition: all 0.3s ease;
        }
        .btn-ghost:hover {
          border-color: var(--accent2);
          color: var(--accent2) !important;
          transform: translateY(-2px);
        }

        /* ── Background patterns ── */
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 256px 256px;
        }
      `}</style>

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{ background: '#060811' }}
      >
        {/* Background layers */}
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        {/* Mouse-following radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(56,189,248,0.06) 0%, transparent 60%)`,
          }}
        />

        {/* Floating colour orbs */}
        <div className="absolute top-[10%] left-[5%] w-[480px] h-[480px] rounded-full opacity-20 animate-floatA pointer-events-none"
          style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-[5%] right-[5%] w-[420px] h-[420px] rounded-full opacity-15 animate-floatB pointer-events-none"
          style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-[50%] left-[60%] w-[300px] h-[300px] rounded-full opacity-10 animate-floatC pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)', filter: 'blur(50px)' }} />

        {/* Decorative orbit rings */}
        <div className="absolute top-16 right-16 w-[260px] h-[260px] opacity-10 pointer-events-none animate-orbit hidden lg:block"
          style={{ border: '1px dashed rgba(56,189,248,0.5)', borderRadius: '50%' }} />
        <div className="absolute top-32 right-32 w-[140px] h-[140px] opacity-10 pointer-events-none hidden lg:block"
          style={{ border: '1px solid rgba(129,140,248,0.4)', borderRadius: '50%' }} />

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
              {parseBold(hero.description)}
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
          style={{ background: 'linear-gradient(to top, #060811, transparent)' }}
        />
      </section>
    </>
  );
}