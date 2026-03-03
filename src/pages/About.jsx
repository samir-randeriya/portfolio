import { useState } from 'react';
import portfolioData from '../data/portfolioContent.json';
import { useInView } from '../hooks/useInView';
import { parseBold } from '../utils/parseBold';
import { SECTION_IDS, BACKGROUND_DARK } from '../constants';
import { COLOR_MAP, QUALITY_ACCENTS } from '../constants/themes';
import { QUALITY_ICON_MAP } from '../constants/icons';

function ProgressBar({ skill, index, animate }) {
  const colors = COLOR_MAP[skill.color] || COLOR_MAP.blue;
  return (
    <div style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
        <span className="text-xs font-bold tabular-nums" style={{ color: colors.from }}>
          {skill.percentage}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animate ? `${skill.percentage}%` : '0%',
            background: `linear-gradient(to right, ${colors.from}, ${colors.to})`,
            transitionDelay: `${index * 0.12}s`,
            boxShadow: `0 0 8px ${colors.from}55`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Quality Card ─────────────────────────────────────────────────────────────
// Number of characters before we show "Read more"
const DESCRIPTION_LIMIT = 120;

function QualityCard({ quality, index, inView }) {
  const icon   = QUALITY_ICON_MAP[quality.icon];
  const accent = QUALITY_ACCENTS[index % QUALITY_ACCENTS.length];
  const desc   = quality.description || '';
  const needsToggle = desc.length > DESCRIPTION_LIMIT;
  const [expanded, setExpanded] = useState(false);

  const displayText = needsToggle && !expanded
    ? desc.slice(0, DESCRIPTION_LIMIT).trimEnd() + '…'
    : desc;

  return (
    <div
      className="quality-card group relative rounded-2xl border p-6 flex flex-col overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.08)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${0.2 + index * 0.1}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${0.2 + index * 0.1}s`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(180px circle at 50% 0%, ${accent}15, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10 mb-4"
        style={{ background: `${accent}18`, border: `1px solid ${accent}33`, color: accent }}
      >
        {icon || <span className="text-xl">{quality.icon}</span>}
      </div>

      {/* Title — fixed min-height so all titles align at same baseline */}
      <h4
        className="text-white font-semibold text-base relative z-10"
        style={{ minHeight: '44px', marginBottom: '8px', lineHeight: '1.4' }}
      >
        {quality.title}
      </h4>

      {/* Description + Read more — flex-1 pushes button to bottom consistently */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <p className="text-slate-500 text-sm leading-relaxed">
          {displayText}
        </p>

        {needsToggle && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="mt-3 self-start text-xs font-semibold flex items-center gap-1.5"
            style={{
              color: accent,
              background: `${accent}12`,
              border: `1px solid ${accent}28`,
              padding: '4px 10px',
              borderRadius: '99px',
              cursor: 'pointer',
              transition: 'background 0.2s, border-color 0.2s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${accent}22`;
              e.currentTarget.style.borderColor = `${accent}55`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `${accent}12`;
              e.currentTarget.style.borderColor = `${accent}28`;
            }}
          >
            {expanded ? (
              <>
                Show less
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                  style={{ width: '11px', height: '11px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                </svg>
              </>
            ) : (
              <>
                Read more
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                  style={{ width: '11px', height: '11px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                </svg>
              </>
            )}
          </button>
        )}
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function About() {
  const { about, personal } = portfolioData;

  const [headerRef, headerInView] = useInView(0.2);
  const [leftRef,   leftInView]   = useInView(0.2);
  const [rightRef,  rightInView]  = useInView(0.2);
  const [statsRef,  statsInView]  = useInView(0.15);
  const [qualRef,   qualInView]   = useInView(0.15);
  const [ctaRef,    ctaInView]    = useInView(0.2);

  return (
    <>
      <section
        id={SECTION_IDS.ABOUT}
        className="relative py-28 overflow-hidden"
        style={{ background: BACKGROUND_DARK }}
      >
        {/* Background */}
        <div className="absolute inset-0 grid-subtle pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)', filter: 'blur(80px)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)', filter: 'blur(80px)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section header ── */}
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
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
              About me
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              {about.title.split(' ').slice(0, -2).join(' ')}{' '}
              <span style={{
                background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {about.title.split(' ').slice(-2).join(' ')}
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              {about.subtitle}
            </p>
          </div>

          {/* ── Two-column: Bio left, Skills right ── */}
          <div className="grid lg:grid-cols-2 gap-14 items-start mb-10">

            {/* Left — Bio only */}
            <div
              ref={leftRef}
              style={{
                opacity: leftInView ? 1 : 0,
                transform: leftInView ? 'translateX(0)' : 'translateX(-32px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.1s',
              }}
            >
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                {parseBold(personal.bio, 'text-accent font-semibold')}
              </p>
            </div>

            {/* Right — Skills + resume button */}
            <div
              ref={rightRef}
              style={{
                opacity: rightInView ? 1 : 0,
                transform: rightInView ? 'translateX(0)' : 'translateX(32px)',
                transition: 'opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.2s',
              }}
            >
              <h3 className="font-display text-xl font-bold text-white mb-8">
                Technical Expertise
              </h3>
              <div className="space-y-5 mb-10">
                {about.skills.map((skill, i) => (
                  <ProgressBar key={skill.name} skill={skill} index={i} animate={rightInView} />
                ))}
              </div>
              <a
                href={personal.resumeUrl}
                download="Samir_Randeriya_Resume.pdf"
                className="resume-btn inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-white text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download My Resume
              </a>
            </div>
          </div>

          {/* ── Stats row — full width, 4 columns desktop / 2×2 tablet / 1 col mobile ── */}
          <div ref={statsRef} className="stats-grid mb-24">
            {about.personalStats.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-card rounded-xl border border-white/8 bg-white/3 px-6 py-5"
                style={{
                  opacity: statsInView ? 1 : 0,
                  transform: statsInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.55s ease ${0.1 + i * 0.09}s, transform 0.55s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.09}s`,
                }}
              >
                {/* Subtle top accent */}
                <div style={{
                  height: '2px',
                  width: '32px',
                  borderRadius: '2px',
                  marginBottom: '14px',
                  background: `linear-gradient(to right, ${QUALITY_ACCENTS[i % 4]}, ${QUALITY_ACCENTS[(i + 1) % 4]})`,
                }} />
                <div
                  className="text-3xl font-black leading-none mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${QUALITY_ACCENTS[i % 4]}, ${QUALITY_ACCENTS[(i + 1) % 4]})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}
                >
                  {stat.number}
                </div>
                <div className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── What Makes Me Different ── */}
          <div ref={qualRef}>
            <div
              className="text-center mb-12"
              style={{
                opacity: qualInView ? 1 : 0,
                transform: qualInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(.22,1,.36,1)',
              }}
            >
              <h3 className="font-display text-3xl sm:text-4xl font-black text-white mb-3">
                What Makes Me{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #34d399, #38bdf8)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  Different
                </span>
              </h3>
              <p className="text-slate-400 max-w-xl mx-auto text-base">
                Beyond technical skills, here are the qualities I bring to every project and team.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
              {about.qualities.map((quality, i) => (
                <QualityCard key={quality.title} quality={quality} index={i} inView={qualInView} />
              ))}
            </div>
          </div>

          {/* ── CTA Banner ── */}
          <div
            ref={ctaRef}
            className="mt-16 relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center"
            style={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #2d1b69 50%, #1e3a5f 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.1s',
            }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.12) 0%, rgba(129,140,248,0.18) 50%, rgba(244,114,182,0.1) 100%)' }} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.3), transparent 70%)', filter: 'blur(40px)' }} />
            <div className="relative z-10">
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-3">
                {about.cta.title}
              </h3>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto text-base leading-relaxed">
                {about.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {about.cta.buttons.map((btn, i) => (
                  <a
                    key={i}
                    href={btn.href}
                    className={`inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-sm ${
                      btn.type === 'primary' ? 'cta-btn-primary' : 'cta-btn-secondary'
                    }`}
                  >
                    {btn.text}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${BACKGROUND_DARK}, transparent)` }} />
      </section>
    </>
  );
}