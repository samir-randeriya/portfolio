import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolioContent.json';
import { useInView } from '../hooks/useInView';
import { SECTION_IDS, BACKGROUND_DARK } from '../constants';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useCountUp(target, isVisible, duration = 2000, delay = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    let frame;
    const delayTimer = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) frame = requestAnimationFrame(step);
        else setCount(target);
      };
      frame = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(frame);
    };
  }, [isVisible, target, duration, delay]);

  return count;
}

// ─── Stat definitions (icons & descriptions come from here; numbers from JSON) ─
export const STAT_META = [
  {
    key: 'experience',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: '#38bdf8',
    accent2: '#818cf8',
    description: 'Building scalable systems for startups & enterprises',
  },
  {
    key: 'projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
    accent: '#818cf8',
    accent2: '#c084fc',
    description: 'Full-stack apps, SaaS platforms & APIs shipped to production',
  },
  {
    key: 'mentored',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    accent: '#f472b6',
    accent2: '#fb7185',
    description: 'Mentoring junior developers, code reviews & technical guidance',
  },
  {
    key: 'ownership',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    accent: '#34d399',
    accent2: '#10b981',
    description: 'Direct ownership of products from architecture to deployment',
  },
  {
    key: 'technologies',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    accent: '#34d399',
    accent2: '#38bdf8',
    description: 'Frontend, backend, databases, DevOps & cloud infrastructure',
  },
  {
    key: 'passion',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    accent: '#fb923c',
    accent2: '#f43f5e',
    description: 'Clean, maintainable, security-first code on every project',
  },
];

const ACHIEVEMENTS = [
  { icon: '⭐', text: '5-Star Client Ratings' },
  { icon: '✅', text: '100% Satisfaction Rate' },
  { icon: '🎯', text: 'Zero-Bug Deployments' },
  { icon: '⚡', text: 'Performance Specialist' },
];

// ─── Single Stat Card ─────────────────────────────────────────────────────────
export function StatCard({ stat, meta, index, isVisible }) {
  // Animate only simple numeric values such as 5+, 15+, 100%
  const isAnimatedNumber = /^\d+(?:\.\d+)?[+%]?$/.test(stat.number);

  const numericValue = isAnimatedNumber
    ? parseInt(stat.number, 10)
    : 0;

  const suffix = isAnimatedNumber
    ? stat.number.replace(/[\d.]/g, '')
    : '';

  const count = useCountUp(
    numericValue,
    isVisible,
    1800,
    index * 150
  );

  const displayValue = isAnimatedNumber
    ? `${count}${suffix}`
    : stat.number;

  const cardMeta = meta || STAT_META.find(m => m.key === stat.key) || STAT_META[index % STAT_META.length];

  return (
    <div
      className="stat-card group relative rounded-2xl border p-8 flex flex-col gap-5 overflow-hidden cursor-default transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.08)',
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Hover glow */}
      <div
        className="stat-card-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(200px circle at 50% 0%, ${cardMeta.accent}18, transparent 70%)`,
        }}
      />

      {/* Top: icon + number */}
      <div className="relative z-10 flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${cardMeta.accent}22, ${cardMeta.accent2}22)`,
            border: `1px solid ${cardMeta.accent}33`,
            color: cardMeta.accent,
          }}
        >
          {cardMeta.icon}
        </div>

        <span
          className="text-4xl lg:text-5xl font-black leading-none tabular-nums"
          style={{
            background: `linear-gradient(135deg, ${cardMeta.accent}, ${cardMeta.accent2})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {displayValue}
        </span>
      </div>

      {/* Label */}
      <div className="relative z-10">
        <h3 className="text-white font-semibold text-base mb-1.5">
          {stat.label}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          {cardMeta.description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{
          background: `linear-gradient(to right, ${cardMeta.accent}, ${cardMeta.accent2})`,
        }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function StatsCounter() {
  const { about } = portfolioData;
  const stats = about.personalStats;

  const [sectionRef, isVisible] = useInView(0.15);

  return (
    <>
      <section
        id={SECTION_IDS.STATS}
        ref={sectionRef}
        className={`relative py-4 overflow-hidden ${isVisible ? 'stats-visible' : ''}`}
        style={{ background: BACKGROUND_DARK }}
      >
        {/* Background */}
        <div className="absolute inset-0 grid-subtle pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none accent-pulse"
          style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none accent-pulse"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)', filter: 'blur(80px)', animationDelay: '1.5s' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section header ── */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-medium tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
              By the numbers
            </div>
            <h2
              className="font-display text-4xl sm:text-5xl font-black text-white mb-4 leading-tight"
            >
              Developer{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Statistics
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              A snapshot of my journey — experience, projects delivered, and the standards I hold myself to.
            </p>
          </div>

          {/* ── Stats grid — numbers & labels from about.personalStats in JSON ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                stat={stat}
                meta={STAT_META[i] || STAT_META[0]}
                index={i}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* ── Footer card ── */}
          <div
            className="stats-footer mt-12 rounded-2xl border border-white/8 p-8 sm:p-10 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            {/* Subtle gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(56,189,248,0.04) 0%, rgba(129,140,248,0.04) 100%)',
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              {/* Text block */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Continuous Growth &amp; Learning
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                  These numbers represent my journey so far but I'm always growing. Every project
                  teaches me something new, and I stay current with the best practices in modern
                  software development.
                </p>
              </div>

              {/* Achievement pills */}
              <div className="flex flex-wrap justify-center lg:justify-end gap-2.5 flex-shrink-0 max-w-sm">
                {ACHIEVEMENTS.map((a) => (
                  <span
                    key={a.text}
                    className="achievement-pill inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 text-sm"
                  >
                    <span>{a.icon}</span>
                    {a.text}
                  </span>
                ))}
              </div>
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