import portfolioData from '../data/portfolioContent.json';
import { SiUpwork } from 'react-icons/si';
import { useInView } from '../hooks/useInView';
import { NAV_ANCHORS, SECTION_IDS, BACKGROUND_DARK } from '../constants';
import { CARD_ACCENTS, STAT_ACCENTS } from '../constants/themes';

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="w-4 h-4"
          fill={i < rating ? '#facc15' : 'none'}
          stroke={i < rating ? '#facc15' : '#475569'}
          strokeWidth={1.5}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1.5 text-xs text-slate-500 font-medium">{rating}.0</span>
    </div>
  );
}

// ─── Quote SVG ────────────────────────────────────────────────────────────────
// const QuoteIcon = ({ color = '#38bdf8' }) => (
//   <svg viewBox="0 0 32 24" fill="currentColor" className="w-8 h-6" style={{ color }}>
//     <path d="M0 24V14.4C0 6.44 4.56 1.68 13.68 0l1.44 2.64C10.36 3.76 7.88 6.32 7.28 10H13V24H0zm18 0V14.4C18 6.44 22.56 1.68 31.68 0l1.32 2.64C28.36 3.76 25.88 6.32 25.28 10H31V24H18z" />
//   </svg>
// );

// ─── Testimonial Card ─────────────────────────────────────────────────────────
function TestimonialCard({ testimonial, index, inView }) {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

  return (
    <div
      className="testimonial-card group relative rounded-2xl border flex flex-col overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.08)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.1}s`,
        minHeight: '280px',
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(200px circle at 20% 0%, ${accent}10, transparent 70%)` }}
      />

      {/* Quote mark — decorative */}
      {/* <div
        className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity duration-400"
        style={{ color: accent }}
      >
        <QuoteIcon color={accent} />
      </div> */}

      <div className="relative z-10 p-7 flex flex-col h-full gap-5">

        {/* Author row */}
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 font-black text-white"
            style={{
              background: `linear-gradient(135deg, ${accent}33, ${accent}18)`,
              border: `1px solid ${accent}33`,
            }}
          >
            {/* Use initials if avatar is emoji, otherwise render emoji */}
            {/* {testimonial.avatar} */}
            <SiUpwork />
          </div>

          {/* Name / role */}
          <div className="flex-1 min-w-0">
            <h4
              className="text-white font-semibold text-sm leading-tight truncate group-hover:transition-colors duration-300"
              style={{ '--accent': accent }}
            >
              {testimonial.name}
            </h4>
            <p className="text-slate-500 text-xs mt-0.5 truncate">
              {testimonial.role}
              {testimonial.company && (
                <span className="text-slate-600"> · {testimonial.company}</span>
              )}
            </p>
          </div>

          {/* Project badge */}
          {/* <span
            className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              background: `${accent}18`,
              border: `1px solid ${accent}30`,
              color: accent,
            }}
          >
            {testimonial.project}
          </span> */}
        </div>

        {/* Stars */}
        <StarRating rating={testimonial.rating} />

        {/* Feedback */}
        {testimonial.feedback && (
          <blockquote className="text-slate-400 text-sm leading-relaxed flex-1">
            "{testimonial.feedback}"
          </blockquote>
        )}

        {/* Footer — date */}
        <p className="text-slate-600 text-xs mt-auto">{testimonial.date}</p>
      </div>
    </div>
  );
}

// ─── "Coming soon" placeholder card ──────────────────────────────────────────
function PlaceholderCard({ index, inView }) {
  return (
    <div
      className="relative rounded-2xl border flex flex-col items-center justify-center p-7 overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.015)',
        borderColor: 'rgba(255,255,255,0.06)',
        borderStyle: 'dashed',
        minHeight: '280px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.1}s`,
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: 'rgba(56,189,248,0.08)', border: '1px dashed rgba(56,189,248,0.2)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={1.5} className="w-5 h-5 opacity-50">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      <p className="text-slate-600 text-sm text-center leading-relaxed max-w-[180px]">
        More reviews coming soon from happy clients
      </p>
    </div>
  );
}

// ─── Stats row — from reviews.stats in JSON ───────────────────────────────────
function StatCard({ stat, index, inView }) {
  const accent = STAT_ACCENTS[index % STAT_ACCENTS.length];
  return (
    <div
      className="stat-card group relative rounded-2xl border p-6 flex flex-col items-center text-center overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.08)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${0.1 + index * 0.08}s, transform 0.5s cubic-bezier(.22,1,.36,1) ${0.1 + index * 0.08}s`,
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(140px circle at 50% 0%, ${accent}12, transparent 70%)` }}
      />
      <div
        className="text-2xl font-black mb-1 relative z-10"
        style={{
          background: `linear-gradient(135deg, ${accent}, ${STAT_ACCENTS[(index + 1) % 4]})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {stat.number}
      </div>
      <div className="text-slate-500 text-xs font-medium relative z-10">{stat.label}</div>
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
      />
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Testimonials() {
  const { reviews } = portfolioData;
  const testimonials = reviews.reviews;

  // How many placeholder cards to fill the grid (min 3 visible slots)
  const GRID_MIN = 3;
  const placeholderCount = Math.max(0, GRID_MIN - testimonials.length);

  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef,   gridInView]   = useInView(0.05);
  const [statsRef,  statsInView]  = useInView(0.1);
  const [ctaRef,    ctaInView]    = useInView(0.2);

  return (
    <>
      <section
        id="proof"
        className="relative py-28 overflow-hidden"
        style={{ background: BACKGROUND_DARK }}
      >
        {/* Background */}
        <div className="absolute inset-0 grid-subtle pointer-events-none" />
        <div
          className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #facc15, transparent 70%)', filter: 'blur(80px)', transform: 'translate(-40%, -50%)' }}
        />
        <div
          className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)', filter: 'blur(80px)', transform: 'translate(40%, -50%)' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
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
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
              Social proof
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              What Clients{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #facc15, #fb923c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Say About Me
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              Real feedback from clients who trusted me with their projects. Every review represents a successful collaboration and lasting partnership.
            </p>
          </div>

          {/* ── Testimonial grid — from reviews.reviews in JSON ── */}
          <div
            ref={gridRef}
            className={`grid gap-5 mb-16 ${
              testimonials.length === 1
                ? 'md:grid-cols-3'          // 1 real + 2 placeholders
                : testimonials.length === 2
                ? 'md:grid-cols-3'          // 2 real + 1 placeholder
                : 'md:grid-cols-2 lg:grid-cols-3' // 3+ real reviews
            }`}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} inView={gridInView} />
            ))}
            {/* Placeholder cards to fill the row */}
            {Array.from({ length: placeholderCount }, (_, i) => (
              <PlaceholderCard key={`ph-${i}`} index={testimonials.length + i} inView={gridInView} />
            ))}
          </div>

          {/* ── Stats row — from reviews.stats in JSON ── */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
          >
            {reviews.stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} inView={statsInView} />
            ))}
          </div>

          {/* ── CTA ── */}
          <div
            ref={ctaRef}
            className="relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center"
            style={{
              background: 'linear-gradient(135deg, #1a2744 0%, #2d1b69 50%, #1a2744 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.1s',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(250,204,21,0.08), rgba(129,140,248,0.14), rgba(244,114,182,0.07))' }}
            />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.15), transparent 70%)', filter: 'blur(40px)' }}
            />

            <div className="relative z-10">
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-3">
                {reviews.cta.title}
              </h3>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto text-base leading-relaxed">
                {reviews.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {reviews.cta.buttons.map((btn, i) => (
                  btn.action === 'scrollToContact' ? (
                    <button
                      key={i}
                      onClick={() => document.getElementById(SECTION_IDS.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
                      className={`inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-sm cursor-pointer ${
                        btn.type === 'primary' ? 'cta-btn-primary' : 'cta-btn-secondary'
                      }`}
                    >
                      {btn.text}
                    </button>
                  ) : (
                    <a
                      key={i}
                      href={btn.href || NAV_ANCHORS.PROJECTS}
                      className={`inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-sm ${
                        btn.type === 'primary' ? 'cta-btn-primary' : 'cta-btn-secondary'
                      }`}
                    >
                      {btn.text}
                    </a>
                  )
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