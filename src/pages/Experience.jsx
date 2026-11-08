import React, { useEffect, useRef, useState } from 'react';
import portfolioData from '../data/portfolioContent.json';
import { SECTION_IDS } from '../constants';
import { Card, Section, SectionHeader } from '../components/ui';

export default function Experience() {
  const { experience, education } = portfolioData;
  const jobs = experience.experiences || [];

  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const viewMid = window.innerHeight * 0.55;
      const start = rect.top;
      const end = rect.bottom;
      const raw = (viewMid - start) / Math.max(end - start, 1);
      const nextProgress = Math.min(1, Math.max(0, raw));
      setProgress(nextProgress);

      let nextActive = -1;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= viewMid + 8) nextActive = i;
      });
      setActiveIndex(nextActive);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [jobs.length]);

  return (
    <Section id={SECTION_IDS.EXPERIENCE}>
      <SectionHeader
        number={experience.number}
        label={experience.label}
        title={experience.title}
        path={experience.path}
      >
        {experience.subtitle}
      </SectionHeader>

      <div ref={trackRef} className="relative">
        {/* Track base */}
        <div
          className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-border overflow-hidden"
          aria-hidden
        >
          {/* Accent fill grows with scroll */}
          <div
            className="w-full origin-top bg-accent transition-[transform] duration-150 ease-out"
            style={{
              height: '100%',
              transform: `scaleY(${progress})`,
              boxShadow: progress > 0 ? '0 0 10px color-mix(in srgb, var(--accent) 45%, transparent)' : 'none',
            }}
          />
        </div>

        <ol className="space-y-8">
          {jobs.map((job, index) => {
            const lit = index <= activeIndex;
            const isNow = job.badge === 'NOW';

            return (
              <li
                key={job.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="relative pl-8 sm:pl-10"
              >
                <span
                  className={`
                    absolute left-0 top-1.5 z-10
                    w-[15px] h-[15px] sm:w-[19px] sm:h-[19px]
                    rounded-full border-2 bg-bg
                    transition-[border-color,box-shadow,background-color,transform] duration-300
                    ${
                      lit
                        ? 'border-accent scale-110'
                        : 'border-border-strong scale-100'
                    }
                    ${isNow && lit ? 'bg-accent/20' : ''}
                  `}
                  style={{
                    boxShadow: lit
                      ? '0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)'
                      : 'none',
                  }}
                  aria-hidden
                >
                  {lit && (
                    <span className="absolute inset-[3px] rounded-full bg-accent" />
                  )}
                </span>

                <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-[11px] sm:text-xs text-ink-dim">
                  <span>{job.period}</span>
                  {job.badge && (
                    <span className="px-1.5 py-0.5 rounded-sm bg-accent/15 text-accent border border-accent/30">
                      {job.badge}
                    </span>
                  )}
                  <span className="px-1.5 py-0.5 rounded-sm border border-border">{job.location}</span>
                  <span className="text-ink-faint">{job.type}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-ink-bright">
                  {job.title}
                </h3>
                <p className="mt-1 text-sm text-accent">{job.company}</p>
                {job.description && (
                  <p className="mt-2 text-sm text-ink-dim">{job.description}</p>
                )}

                <ul className="mt-3 space-y-1.5">
                  {(job.achievements || []).map((a) => (
                    <li key={a} className="text-sm text-ink-dim leading-relaxed flex gap-2">
                      <span className="text-accent shrink-0">-</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(job.technologies || []).slice(0, 8).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2 py-1 rounded-sm border border-border text-ink-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
            Education
          </h3>
          <ul className="space-y-4">
            {(education.education || []).map((ed) => (
              <li key={ed.degree}>
                <p className="text-sm font-semibold text-ink-bright">{ed.degree}</p>
                <p className="text-sm text-ink-dim mt-0.5">{ed.institution}</p>
                <p className="font-mono text-[11px] text-ink-faint mt-1">
                  {ed.period}
                  {ed.gpa ? ` · GPA ${ed.gpa}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h3 className="font-mono text-xs tracking-widest uppercase text-ink-faint mb-4">
            Certifications
          </h3>
          <ul className="space-y-3">
            {(education.certifications || []).map((c) => (
              <li key={c.name}>
                <p className="text-sm text-ink-bright">{c.name}</p>
                <p className="font-mono text-[11px] text-ink-faint mt-0.5">
                  {c.issuer} · {c.year}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}
