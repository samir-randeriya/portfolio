import portfolioData from '../data/portfolioContent.json';
import { useInView } from '../hooks/useInView';
import { SECTION_IDS, BACKGROUND_DARK } from '../constants';
import { CATEGORY_THEMES, PROFICIENCY_THEMES } from '../constants/themes';

// ─── Category Card ─────────────────────────────────────────────────────────────
function CategoryCard({ category, theme, index, inView }) {
  return (
    <div
      className="skill-card group relative rounded-2xl border flex flex-col overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.08)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.97)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.08}s`,
        minHeight: '320px',
      }}
    >
      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${theme.from}10 0%, ${theme.to}08 100%)`,
        }}
      />

      {/* Top border accent on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(to right, ${theme.from}, ${theme.to})` }}
      />

      <div className="relative z-10 p-7 flex flex-col h-full">
        {/* Icon + title row */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
            style={{ background: theme.iconBg, border: `1px solid ${theme.border}` }}
          >
            {category.icon}
          </div>
          <div>
            <h3
              className="text-white font-bold text-base leading-tight"
              style={{ transition: 'color 0.3s' }}
            >
              {category.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-shrink-0">
          {category.description}
        </p>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {category.skills.map((skill) => (
            <span
              key={skill}
              className="skill-tag px-3 py-1 rounded-full text-xs font-medium text-slate-300 border border-white/8 bg-white/5 cursor-default"
              style={{ transition: 'all 0.2s ease' }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Proficiency Card ─────────────────────────────────────────────────────────
function ProficiencyCard({ level, theme, index, inView }) {
  return (
    <div
      className="proficiency-card group relative rounded-2xl border p-6 flex flex-col items-center text-center overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.08)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.55s ease ${0.1 + index * 0.1}s, transform 0.55s cubic-bezier(.22,1,.36,1) ${0.1 + index * 0.1}s`,
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(160px circle at 50% 0%, ${theme.from}18, transparent 70%)` }}
      />

      {/* Count bubble */}
      <div
        className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-xl mb-4 group-hover:scale-110 transition-transform duration-300"
        style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`, boxShadow: `0 4px 20px ${theme.from}40` }}
      >
        {level.count}
      </div>

      {/* Level name */}
      <h4 className="text-white font-semibold text-base mb-3 relative z-10">{level.name}</h4>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full bg-white/8 overflow-hidden mb-2 relative z-10">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${level.percentage}%` : '0%',
            background: `linear-gradient(to right, ${theme.from}, ${theme.to})`,
            transitionDelay: `${0.3 + index * 0.1}s`,
            boxShadow: `0 0 8px ${theme.from}66`,
          }}
        />
      </div>

      {/* Confidence label */}
      <p className="text-slate-500 text-xs font-medium relative z-10">
        {level.percentage}% Confidence
      </p>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(to right, ${theme.from}, ${theme.to})` }}
      />
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Skills() {
  const { skills } = portfolioData;

  const [headerRef, headerInView]   = useInView(0.2);
  const [gridRef,   gridInView]     = useInView(0.05);
  const [profRef,   profInView]     = useInView(0.1);
  const [learnRef,  learnInView]    = useInView(0.2);
  const [ctaRef,    ctaInView]      = useInView(0.2);

  return (
    <>
      <section
        id={SECTION_IDS.SKILLS}
        className="relative py-28 overflow-hidden"
        style={{ background: BACKGROUND_DARK }}
      >
        {/* Background */}
        <div className="absolute inset-0 grid-subtle pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)', filter: 'blur(80px)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)', filter: 'blur(80px)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section header ── */}
          <div
            ref={headerRef}
            className="text-center mb-16"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1)',
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-medium tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
              Technical expertise
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              {skills.title.split(' ').slice(0, 2).join(' ')}{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {skills.title.split(' ').slice(2).join(' ')}
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              {skills.subtitle}
            </p>
          </div>

          {/* ── Category cards grid — from skills.categories ── */}
          <div
            ref={gridRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
          >
            {skills.categories.map((category, i) => (
              <CategoryCard
                key={category.title}
                category={category}
                theme={CATEGORY_THEMES[i] || CATEGORY_THEMES[0]}
                index={i}
                inView={gridInView}
              />
            ))}
          </div>

          {/* ── Proficiency overview — from skills.proficiencyLevels ── */}
          <div ref={profRef}>
            {/* Sub-header */}
            <div
              className="text-center mb-10"
              style={{
                opacity: profInView ? 1 : 0,
                transform: profInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(.22,1,.36,1)',
              }}
            >
              <h3 className="font-display text-3xl sm:text-4xl font-black text-white mb-3">
                Proficiency{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #34d399, #38bdf8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Overview
                </span>
              </h3>
              <p className="text-slate-400 max-w-xl mx-auto text-base">
                A breakdown of my expertise levels across different technologies and frameworks.
              </p>
            </div>

            {/* Proficiency cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {skills.proficiencyLevels.map((level, i) => (
                <ProficiencyCard
                  key={level.name}
                  level={level}
                  theme={PROFICIENCY_THEMES[i] || PROFICIENCY_THEMES[0]}
                  index={i}
                  inView={profInView}
                />
              ))}
            </div>
          </div>

          {/* ── Currently learning — from skills.currentlyLearning ── */}
          <div
            ref={learnRef}
            className="mb-16 rounded-2xl border border-white/8 p-8 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.025)',
              opacity: learnInView ? 1 : 0,
              transform: learnInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(.22,1,.36,1)',
            }}
          >
            {/* Mesh */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.04), rgba(167,139,250,0.04))' }}
            />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-medium tracking-widest uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Currently exploring
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Always Learning, Always Growing
              </h3>
              <p className="text-slate-400 text-sm mb-6 max-w-lg mx-auto">
                Staying ahead of the curve by continuously exploring new technologies and best practices.
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {skills.currentlyLearning.map((tech, i) => (
                  <span
                    key={tech}
                    className="learn-pill px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 text-sm font-medium"
                    style={{
                      opacity: learnInView ? 1 : 0,
                      transform: learnInView ? 'translateY(0)' : 'translateY(12px)',
                      transition: `opacity 0.4s ease ${0.2 + i * 0.06}s, transform 0.4s ease ${0.2 + i * 0.06}s`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── CTA — from skills.cta ── */}
          <div
            ref={ctaRef}
            className="relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center"
            style={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #2d1b69 50%, #1e3a5f 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.1s',
            }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.12) 0%, rgba(129,140,248,0.18) 50%, rgba(244,114,182,0.1) 100%)' }}
            />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.3), transparent 70%)', filter: 'blur(40px)' }}
            />

            <div className="relative z-10">
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-3">
                {skills.cta.title}
              </h3>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto text-base leading-relaxed">
                {skills.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {skills.cta.buttons.map((btn, i) => (
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

        {/* Edge fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${BACKGROUND_DARK}, transparent)` }}
        />
      </section>
    </>
  );
}