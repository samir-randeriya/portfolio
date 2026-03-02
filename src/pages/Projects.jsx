import { useState, useEffect, useRef } from 'react';
import portfolioData from '../data/portfolioContent.json';
import ImagePreviewModal from '../components/ImagePreviewModal';
import { 
  FaGithub, 
  FaExternalLinkAlt,
  FaEye
} from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

// ─── useInView hook ────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold]);
  return [ref, inView];
}

// ─── Parse **bold** markdown strings ─────────────────────────────────────────
function parseBold(text) {
  if (!text) return null;
  return text.split('**').map((part, i) =>
    i % 2 === 0
      ? part
      : <strong key={i} className="text-white font-semibold">{part}</strong>
  );
}

// ─── Presentation-layer accent themes per project index ──────────────────────
const PROJECT_THEMES = [
  { from: '#38bdf8', to: '#6366f1', glow: 'rgba(56,189,248,0.25)'  },
  { from: '#a78bfa', to: '#f472b6', glow: 'rgba(167,139,250,0.25)' },
  { from: '#fb923c', to: '#facc15', glow: 'rgba(251,146,60,0.25)'  },
  { from: '#34d399', to: '#38bdf8', glow: 'rgba(52,211,153,0.25)'  },
];

function getTheme(index) {
  return PROJECT_THEMES[index % PROJECT_THEMES.length];
}

// ─── Featured Project Row ─────────────────────────────────────────────────────
function FeaturedProject({ project, index, inView }) {
  const isEven = index % 2 === 0;
  const theme = getTheme(index);
  const hasImages = project.images && project.images.length > 0;
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div
      className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${index * 0.15}s`,
      }}
    >
      {/* ── Info ── */}
      <div className={`space-y-6 ${isEven ? 'md:order-1' : 'md:order-2'}`}>

        {/* Category badge */}
        <div>
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight">
          {project.title}
        </h3>

        {/* Description — parses **Challenge** **Solution** **Impact** */}
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          {parseBold(project.description)}
        </p>

        {/* Technologies */}
        <div>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Technologies Used
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium text-slate-300 border border-white/10 bg-white/5 cursor-default transition-all duration-200 hover:border-white/20 hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-white/8 bg-white/3 px-3 py-3 text-center"
            >
              <div
                className="text-base font-black leading-none mb-1"
                style={{
                  background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {metric.value}
              </div>
              <div className="text-slate-500 text-xs">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-1 flex-wrap">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                boxShadow: `0 0 0 ${theme.glow}`,
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 24px ${theme.glow}`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0 ${theme.glow}`}
            >
              <FaGithub />
              View Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-slate-300 border border-white/15 bg-white/5 transition-all duration-300 hover:border-white/30 hover:text-white hover:scale-105"
            >
              <FaExternalLinkAlt />
              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* ── Visual ── */}
      <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <div className="group relative">
          {/* Card */}
          <div
            className="relative aspect-[4/3] rounded-3xl overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:scale-[1.03]"
            style={{
              background: `linear-gradient(135deg, ${theme.from}22 0%, ${theme.to}22 100%)`,
              border: `1px solid ${theme.from}33`,
            }}
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `linear-gradient(${theme.from}18 1px, transparent 1px), linear-gradient(90deg, ${theme.from}18 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Clickable preview area */}
            <button
              type="button"
              onClick={hasImages ? () => setShowPreview(true) : undefined}
              className={`relative z-10 flex items-center justify-center w-full h-full ${hasImages ? 'cursor-zoom-in' : 'cursor-default'}`}
            >
              {hasImages ? (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="max-h-[80%] max-w-[90%] object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }}
                  loading="lazy"
                />
              ) : (
                <span
                  className="text-8xl sm:text-9xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 select-none"
                  style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }}
                >
                  {project.image}
                </span>
              )}
            </button>

            {/* Floating dots */}
            <span className="absolute top-6 right-6 w-3 h-3 rounded-full animate-ping opacity-60"
              style={{ background: theme.from }} />
            <span className="absolute bottom-6 left-6 w-2 h-2 rounded-full animate-pulse opacity-50"
              style={{ background: theme.to }} />
          </div>

          {/* Glow behind card */}
          <div
            className="absolute inset-0 rounded-3xl -z-10 scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
            style={{ background: `linear-gradient(135deg, ${theme.from}30, ${theme.to}30)` }}
          />
          </div>

          {/* Image preview modal */}
          {hasImages && showPreview && (
            <ImagePreviewModal
              images={project.images}
              initialIndex={0}
              onClose={() => setShowPreview(false)}
            />
          )}
      </div>
    </div>
  );
}

// ─── Other Project Card (slider) ──────────────────────────────────────────────
function OtherProjectCard({ project, index, inView }) {
  const theme = getTheme(index + 2); // offset so colours differ from featured
  const hasImages = project.images && project.images.length > 0;
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div
      className="other-card group relative rounded-2xl border flex flex-col overflow-hidden h-full"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.08)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.12}s`,
        minHeight: '380px',
      }}
    >
      {/* Top accent on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `linear-gradient(to right, ${theme.from}, ${theme.to})` }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(200px circle at 50% 0%, ${theme.from}12, transparent 70%)` }}
      />

      <div className="relative z-10 p-7 flex flex-col h-full">
        {/* Icon + category */}
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
            style={{
              background: `linear-gradient(135deg, ${theme.from}22, ${theme.to}22)`,
              border: `1px solid ${theme.from}33`,
            }}
          >
            {project.image}
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-white font-bold text-lg mb-3 leading-snug">
          {project.title}
        </h4>

        {/* Description — strip markdown, show plain */}
        <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
          {parseBold(project.description)}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full text-xs font-medium text-slate-400 border border-white/8 bg-white/4"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2.5 py-1 rounded-full text-xs font-medium text-slate-500 border border-white/8 bg-white/4">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2.5 mt-auto">
          {/* Image preview trigger */}
          <button
            type="button"
            onClick={hasImages ? () => setShowPreview(true) : undefined}
            disabled={!hasImages}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border bg-white/5 transition-all duration-200
                       text-slate-300 border-white/10 hover:border-white/20 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FaEye />
            Preview
          </button>

          {/* Upwork URL */}
          {project.upworkUrl && (
            <a
              href={project.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 border border-white/10 bg-white/5 hover:border-white/20 hover:text-white transition-all duration-200"
            >
              <SiUpwork />
              Upwork
            </a>
          )}
          {/* Live URL */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 border border-white/10 bg-white/5 hover:border-white/20 hover:text-white transition-all duration-200"
            >
              <FaExternalLinkAlt />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
            >
              <FaGithub />
              Code
            </a>
          )}
          {!project.liveUrl && !project.githubUrl && (
            <span className="flex-1 flex items-center justify-center px-3 py-2 rounded-xl text-xs font-medium text-slate-600 border border-white/5">
              Private Project
            </span>
          )}
        </div>

        {/* Image preview modal */}
        {hasImages && showPreview && (
          <ImagePreviewModal
            images={project.images}
            initialIndex={0}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </div>
  );
}

// ─── Simple Project Slider ────────────────────────────────────────────────────
function ProjectSlider({ projects, inView }) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const perPage = 2;
  const total = Math.ceil(projects.length / perPage);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const t = setInterval(() => setCurrent(p => (p + 1) % total), 5000);
    return () => clearInterval(t);
  }, [autoPlay, total]);

  const visible = projects.slice(current * perPage, current * perPage + perPage);

  return (
    <div onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)}>
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {visible.map((project, i) => (
          <OtherProjectCard key={project.id} project={project} index={i} inView={inView} />
        ))}
        {/* Placeholder if odd count */}
        {visible.length === 1 && <div className="hidden md:block" />}
      </div>

      {/* Controls */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrent(p => Math.max(0, p - 1))}
            disabled={current === 0}
            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  background: i === current
                    ? 'linear-gradient(to right, #38bdf8, #818cf8)'
                    : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent(p => Math.min(total - 1, p + 1))}
            disabled={current === total - 1}
            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Projects() {
  const { projects, personal } = portfolioData;

  const featuredProjects = projects.projects.filter(p => p.featured);
  const otherProjects    = projects.projects.filter(p => !p.featured);

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const openGithub = () =>
    window.open(personal.github, '_blank');

  const buttonActions = { scrollToContact, openGithub };

  const [headerRef, headerInView]   = useInView(0.2);
  const [featuredRef, featuredInView] = useInView(0.05);
  const [otherRef,  otherInView]    = useInView(0.1);
  const [ctaRef,    ctaInView]      = useInView(0.2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        #projects * { font-family: 'DM Sans', sans-serif; }
        #projects .font-display { font-family: 'Syne', sans-serif; }

        .grid-subtle {
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .other-card:hover {
          border-color: rgba(255,255,255,0.14) !important;
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.45);
        }

        .cta-btn-primary {
          background: white;
          color: #0f172a;
          transition: all 0.25s ease;
        }
        .cta-btn-primary:hover { background: #f1f5f9; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }

        .cta-btn-secondary {
          border: 1.5px solid rgba(255,255,255,0.25);
          color: white;
          transition: all 0.25s ease;
        }
        .cta-btn-secondary:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.45);
          transform: translateY(-2px);
        }
      `}</style>

      <section
        id="projects"
        className="relative py-28 overflow-hidden"
        style={{ background: '#060811' }}
      >
        {/* Background */}
        <div className="absolute inset-0 grid-subtle pointer-events-none" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)', filter: 'blur(80px)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)', filter: 'blur(80px)', transform: 'translate(30%, 30%)' }} />

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
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
              Selected work
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              {projects.title.split(' ').slice(0, 3).join(' ')}{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #fb923c, #f43f5e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {projects.title.split(' ').slice(3).join(' ')}
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              {projects.subtitle}
            </p>
          </div>

          {/* ── Featured projects — from projects.projects[featured=true] ── */}
          <div ref={featuredRef} className="space-y-24 mb-28">
            {featuredProjects.map((project, i) => (
              <FeaturedProject
                key={project.id}
                project={project}
                index={i}
                inView={featuredInView}
              />
            ))}
          </div>

          {/* ── Other projects slider — from projects.projects[featured=false] ── */}
          {otherProjects.length > 0 && (
            <div ref={otherRef} className="mb-20">
              <div
                className="text-center mb-10"
                style={{
                  opacity: otherInView ? 1 : 0,
                  transform: otherInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(.22,1,.36,1)',
                }}
              >
                <h3 className="font-display text-3xl font-black text-white mb-2">
                  More{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Projects
                  </span>
                </h3>
                <p className="text-slate-500 text-sm">A few more things I've built along the way.</p>
              </div>

              <ProjectSlider projects={otherProjects} inView={otherInView} />
            </div>
          )}

          {/* ── CTA — from projects.cta ── */}
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
            {/* Overlay mesh */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(129,140,248,0.15) 50%, rgba(244,114,182,0.08) 100%)' }}
            />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)', filter: 'blur(40px)' }}
            />

            <div className="relative z-10">
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-3">
                {projects.cta.title}
              </h3>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto text-base leading-relaxed">
                {projects.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {projects.cta.buttons.map((btn, i) => (
                  <button
                    key={i}
                    onClick={btn.action ? buttonActions[btn.action] : undefined}
                    className={`inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-sm cursor-pointer ${
                      btn.type === 'primary' ? 'cta-btn-primary' : 'cta-btn-secondary'
                    }`}
                  >
                    {btn.text}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Edge fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #060811, transparent)' }}
        />
      </section>
    </>
  );
}