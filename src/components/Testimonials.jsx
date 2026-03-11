import portfolioData from '../data/portfolioContent.json';
import { SiUpwork } from 'react-icons/si';
import { useInView } from '../hooks/useInView';
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

  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef,   gridInView]   = useInView(0.05);
  const [statsRef,  statsInView]  = useInView(0.1);

  return (
    <>
      <section
        id="proof"
        className="relative py-14 overflow-hidden"
      >
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

          {/* ── Testimonial grid — real reviews only, no placeholders ── */}
          <div
            ref={gridRef}
            className={`mb-16 ${
              testimonials.length === 1
                ? 'flex justify-center'
                : testimonials.length === 2
                ? 'grid md:grid-cols-2 gap-5 max-w-2xl mx-auto'
                : 'grid md:grid-cols-2 lg:grid-cols-3 gap-5'
            }`}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={testimonials.length === 1 ? 'w-full max-w-md' : ''}
              >
                <TestimonialCard testimonial={t} index={i} inView={gridInView} />
              </div>
            ))}
          </div>

          {/* ── Stats row — from reviews.stats in JSON ── */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {reviews.stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} inView={statsInView} />
            ))}
          </div>

        </div>

        {/* Edge fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(6,8,17,0.6), transparent)' }}
        />
      </section>
    </>
  );
}