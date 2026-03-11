import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolioContent.json';
import ImagePreviewModal from '../components/ImagePreviewModal';
import { useInView } from '../hooks/useInView';
import { SECTION_IDS } from '../constants';
import { 
  FaGithub, 
  FaExternalLinkAlt,
  // FaEye
} from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import { parseBold } from '../utils/parseBold';
import { PROJECT_THEMES } from '../constants/themes';

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
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border"
            style={{ borderColor: `${theme.from}55`, color: theme.from, background: `${theme.from}10` }}
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
          {parseBold(project.description, 'text-accent font-semibold')}
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
              className="rounded-xl border border-white/10 bg-white/3 px-3 py-3 text-center"
            >
              <div className="text-base font-black leading-none mb-1 text-white">
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
              {/* {hasImages ? (
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
              )} */}
              <span
                className="relative z-10 text-8xl sm:text-9xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 select-none"
                style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }}
              >
                {project.image}
              </span>
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
            className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform duration-300 select-none"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: theme.from,
            }}
          >
            {project.title.charAt(0)}
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold border"
            style={{ borderColor: `${theme.from}55`, color: theme.from, background: `${theme.from}10` }}
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
          {parseBold(project.description, 'text-accent font-semibold')}
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
          {/* <button
            type="button"
            onClick={hasImages ? () => setShowPreview(true) : undefined}
            disabled={!hasImages}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border bg-white/5 transition-all duration-200
                       text-slate-300 border-white/10 hover:border-white/20 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FaEye />
            Preview
          </button> */}

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

// ProjectSlider — defined inline; src/components/ProjectSlider.jsx has been removed
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
  const { projects } = portfolioData;

  const featuredProjects = projects.projects.filter(p => p.featured);
  const otherProjects    = projects.projects.filter(p => !p.featured);

  const [headerRef, headerInView]   = useInView(0.2);
  const [featuredRef, featuredInView] = useInView(0.05);
  const [otherRef,  otherInView]    = useInView(0.1);

  return (
    <>
      <section
        id={SECTION_IDS.PROJECTS}
        className="relative py-14 overflow-hidden"
      >
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