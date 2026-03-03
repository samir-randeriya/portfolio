import { useState, useEffect, useRef, useCallback } from 'react';
import portfolioData from '../data/portfolioContent.json';
import { useInView } from '../hooks/useInView';
import { SECTION_IDS, BACKGROUND_DARK } from '../constants';
import { EXP_THEMES } from '../constants/themes';

function getTheme(index) {
  return EXP_THEMES[index % EXP_THEMES.length];
}

// ─── Timeline Dot ─────────────────────────────────────────────────────────────
function TimelineDot({ theme, active, icon }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 56, height: 56 }}>
      {/* Outer pulse ring — only when active */}
      {active && (
        <>
          <span
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${theme.from}44, ${theme.to}44)`,
              animation: 'dotPulse 2s ease-out infinite',
            }}
          />
          <span
            className="absolute inset-0 rounded-2xl border-2"
            style={{
              borderColor: theme.from,
              animation: 'dotRing 2s ease-out infinite 0.4s',
            }}
          />
        </>
      )}

      {/* Main dot */}
      <div
        className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-xl transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
          boxShadow: active
            ? `0 0 0 3px ${theme.from}55, 0 8px 32px ${theme.from}66`
            : `0 4px 16px ${theme.from}33`,
          transform: active ? 'scale(1.12)' : 'scale(1)',
          border: `2px solid ${active ? theme.from : 'rgba(255,255,255,0.1)'}`,
        }}
      >
        {icon}
      </div>
    </div>
  );
}

// ─── Experience Card ──────────────────────────────────────────────────────────
function ExperienceCard({ exp, index, active, theme, inView }) {
  const isRight = index % 2 === 1;

  return (
    <div
      className="exp-card group relative rounded-3xl border overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: active ? `${theme.from}44` : 'rgba(255,255,255,0.08)',
        boxShadow: active ? `0 0 0 1px ${theme.from}22, 0 20px 60px rgba(0,0,0,0.5)` : 'none',
        opacity: inView ? 1 : 0,
        transform: inView
          ? 'translateX(0)'
          : isRight ? 'translateX(40px)' : 'translateX(-40px)',
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${index * 0.15}s, border-color 0.5s, box-shadow 0.5s`,
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(to right, ${theme.from}, ${theme.to})`,
          opacity: active ? 1 : 0,
          transition: 'opacity 0.5s',
        }}
      />

      {/* Hover / active glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(300px circle at ${isRight ? '80%' : '20%'} 0%, ${theme.from}10, transparent 70%)`,
          opacity: active ? 1 : 0,
          transition: 'opacity 0.5s',
        }}
      />

      <div className="relative z-10 p-7 lg:p-8">

        {/* Header row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
          >
            {exp.period}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium text-slate-400 border border-white/10 bg-white/5">
            {exp.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl lg:text-2xl font-black text-white mb-1 leading-tight">
          {exp.title}
        </h3>

        {/* Company */}
        <p
          className="font-semibold text-base mb-1"
          style={{
            background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {exp.company}
        </p>

        {/* Location */}
        <p className="text-slate-500 text-sm mb-5 flex items-center gap-1.5">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {exp.location}
        </p>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {exp.description}
        </p>

        {/* Achievements */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: theme.from }}
            />
            Key Achievements
          </p>
          <ul className="space-y-2">
            {exp.achievements.map((a, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                <span
                  className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: `${theme.from}22`, color: theme.from }}
                >
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-2.5 h-2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l2.5 2.5L10 3.5" />
                  </svg>
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech tags */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: theme.to }}
            />
            Technologies
          </p>
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium text-slate-300 border border-white/8 bg-white/5 cursor-default transition-all duration-200 hover:border-white/20 hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Experience() {
  const { experience } = portfolioData;
  const experiences = experience.experiences;

  const [lineProgress, setLineProgress] = useState(0);   // 0–100 %
  const [activeIndex,  setActiveIndex]  = useState(-1);

  const sectionRef    = useRef(null);
  const timelineRef   = useRef(null);
  const dotRefs       = useRef([]);                       // one ref per experience

  const [headerRef, headerInView] = useInView(0.2);
  const [cardsRef,  cardsInView]  = useInView(0.05);
  const [ctaRef,    ctaInView]    = useInView(0.2);

  // ── Scroll handler ──────────────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    const { top, height } = tl.getBoundingClientRect();
    const vh = window.innerHeight;

    // progress: 0 when top of timeline hits bottom of viewport,
    //           1 when bottom of timeline hits top of viewport
    const raw    = (vh - top) / (height + vh);
    const clamped = Math.min(1, Math.max(0, raw));
    setLineProgress(clamped * 100);

    // Which dot has the line reached?
    let newActive = -1;
    dotRefs.current.forEach((el, i) => {
      if (!el) return;
      const dotTop = el.getBoundingClientRect().top;
      if (dotTop < vh * 0.65) newActive = i;
    });
    setActiveIndex(newActive);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // gradient colours for the line depending on progress
  // cycles through sky → violet → emerald as line grows
  const lineGradient = `linear-gradient(
    to bottom,
    #38bdf8 0%,
    #818cf8 40%,
    #34d399 80%,
    #a78bfa 100%
  )`;

  return (
    <>
      <section
        id={SECTION_IDS.EXPERIENCE}
        ref={sectionRef}
        className="relative py-28 overflow-hidden"
        style={{ background: BACKGROUND_DARK }}
      >
        {/* Background */}
        <div className="absolute inset-0 grid-subtle pointer-events-none" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #34d399, transparent 70%)', filter: 'blur(80px)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)', filter: 'blur(80px)', transform: 'translate(30%, 30%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div
            ref={headerRef}
            className="text-center mb-20"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1)',
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-medium tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Career journey
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              Professional{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #34d399, #38bdf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Experience
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              {experience.subtitle}
            </p>
          </div>

          {/* ── Timeline ── */}
          <div ref={timelineRef} className="relative" style={{ paddingBottom: '2px' }}>

            {/* ── CENTER LINE (desktop) ── */}
            <div
              className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              {/* Filled portion — scroll-driven */}
              <div
                className="absolute top-0 left-0 w-full origin-top rounded-full"
                style={{
                  height: `${lineProgress}%`,
                  background: lineGradient,
                  transition: 'height 0.1s linear',
                  boxShadow: '0 0 8px rgba(56,189,248,0.5)',
                  filter: 'drop-shadow(0 0 4px #38bdf8)',
                }}
              />
              {/* Glowing tip */}
              <div
                className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{
                  top: `${lineProgress}%`,
                  left: '50%',
                  background: '#38bdf8',
                  boxShadow: '0 0 12px 4px #38bdf866',
                  opacity: lineProgress > 2 && lineProgress < 99 ? 1 : 0,
                  transition: 'top 0.1s linear, opacity 0.3s',
                }}
              />
            </div>

            {/* ── LEFT LINE (mobile) ── */}
            <div
              className="lg:hidden absolute left-7 top-0 bottom-0 w-px"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <div
                className="absolute top-0 left-0 w-full origin-top rounded-full"
                style={{
                  height: `${lineProgress}%`,
                  background: lineGradient,
                  transition: 'height 0.1s linear',
                  boxShadow: '0 0 6px rgba(56,189,248,0.5)',
                }}
              />
              <div
                className="absolute w-2 h-2 rounded-full -translate-x-1/2"
                style={{
                  top: `${lineProgress}%`,
                  left: '50%',
                  background: '#38bdf8',
                  boxShadow: '0 0 10px 3px #38bdf866',
                  opacity: lineProgress > 2 && lineProgress < 99 ? 1 : 0,
                  transition: 'top 0.1s linear',
                }}
              />
            </div>

            {/* ── Experience rows ── */}
            <div ref={cardsRef} className="space-y-20 lg:space-y-24">
              {experiences.map((exp, index) => {
                const isRight = index % 2 === 1;
                const theme   = getTheme(index);
                const active  = activeIndex === index;

                return (
                  <div key={exp.id} className="relative flex items-center min-h-[80px]">

                    {/* ── Desktop layout: zig-zag ── */}
                    <div className="hidden lg:flex w-full items-center">

                      {/* Left card slot */}
                      <div className="w-5/12">
                        {!isRight && (
                          <ExperienceCard
                            exp={exp}
                            index={index}
                            active={active}
                            theme={theme}
                            inView={cardsInView}
                          />
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="w-2/12 flex justify-center relative z-10">
                        {/* Connector left → dot */}
                        {!isRight && (
                          <div
                            className="connector right-1/2"
                            style={{
                              background: `linear-gradient(to left, ${theme.from}88, transparent)`,
                              opacity: active ? 1 : 0.35,
                              marginRight: '28px',
                            }}
                          />
                        )}

                        <div ref={el => dotRefs.current[index] = el}>
                          <TimelineDot theme={theme} active={active} icon={exp.icon} />
                        </div>

                        {/* Connector dot → right */}
                        {isRight && (
                          <div
                            className="connector left-1/2"
                            style={{
                              background: `linear-gradient(to right, ${theme.from}88, transparent)`,
                              opacity: active ? 1 : 0.35,
                              marginLeft: '28px',
                            }}
                          />
                        )}
                      </div>

                      {/* Right card slot */}
                      <div className="w-5/12">
                        {isRight && (
                          <ExperienceCard
                            exp={exp}
                            index={index}
                            active={active}
                            theme={theme}
                            inView={cardsInView}
                          />
                        )}
                      </div>
                    </div>

                    {/* ── Mobile layout: left-line + full-width card ── */}
                    <div className="lg:hidden flex w-full items-start gap-5 pl-2">
                      <div
                        className="flex-shrink-0 mt-6"
                        ref={el => {
                          // Also register for mobile scroll detection
                          if (!dotRefs.current[index]) dotRefs.current[index] = el;
                        }}
                      >
                        <TimelineDot theme={theme} active={active} icon={exp.icon} />
                      </div>
                      <div className="flex-1">
                        <ExperienceCard
                          exp={exp}
                          index={index}
                          active={active}
                          theme={theme}
                          inView={cardsInView}
                        />
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* ── CTA ── */}
          <div
            ref={ctaRef}
            className="mt-24 relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center"
            style={{
              background: 'linear-gradient(135deg, #1a2744 0%, #0d3321 50%, #1a2744 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.1s',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.1), rgba(56,189,248,0.12), rgba(129,140,248,0.08))' }}
            />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.2), transparent 70%)', filter: 'blur(40px)' }}
            />
            <div className="relative z-10">
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-3">
                {experience.cta.title}
              </h3>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto text-base leading-relaxed">
                {experience.cta.description}
              </p>
              <button
                onClick={() => document.getElementById(SECTION_IDS.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
                className="cta-btn-primary inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-sm"
              >
                <span>{experience.cta.buttonText}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Edge fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${BACKGROUND_DARK}, transparent)` }}
        />
      </section>
    </>
  );
}