import React, { useEffect, useMemo, useRef, useState } from 'react';
import portfolioData from '../data/portfolioContent.json';
import { SECTION_IDS } from '../constants';
import { Button, Card, Section, SectionHeader } from '../components/ui';

function ProjectCard({ project }) {
  return (
    <Card className="p-5 sm:p-6 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="font-mono text-[11px] tracking-widest uppercase text-accent">
          {project.category}
        </span>
        {project.featured && (
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm border border-border text-ink-faint">
            featured
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-ink-bright">{project.title}</h3>
      <p className="mt-1 font-mono text-[11px] text-ink-faint">
        {project.domain} · {project.role}
      </p>
      <p className="mt-3 text-sm text-ink-dim leading-relaxed flex-1">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(project.technologies || []).slice(0, 5).map((t) => (
          <span
            key={t}
            className="font-mono text-[11px] px-2 py-1 rounded-sm border border-border text-ink-dim"
          >
            {t}
          </span>
        ))}
      </div>

      {project.liveUrl && (
        <div className="mt-5">
          <Button
            as="a"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="text-xs min-h-[40px]"
          >
            $ open live →
          </Button>
        </div>
      )}
    </Card>
  );
}

export default function Projects() {
  const { projects: data } = portfolioData;
  const list = useMemo(() => data.projects || [], [data.projects]);
  const filters = data.filters || ['All'];
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const scrollerRef = useRef(null);

  const visible = useMemo(() => {
    if (filter === 'All') return list;
    return list.filter((p) => p.category === filter);
  }, [filter, list]);

  const pageCount = Math.max(1, Math.ceil(visible.length / 2));

  const scrollToPage = (index) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('[data-slide]');
    if (!card) return;
    const gap = 16;
    const step = card.getBoundingClientRect().width + gap;
    // Two cards per page on md+, one on small screens handled by CSS width
    const perPage = window.matchMedia('(min-width: 768px)').matches ? 2 : 1;
    const next = ((index % Math.ceil(visible.length / perPage)) + Math.ceil(visible.length / perPage)) % Math.ceil(visible.length / perPage);
    el.scrollTo({ left: next * step * perPage, behavior: 'smooth' });
    setPage(next);
  };

  useEffect(() => {
    setPage(0);
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [filter, visible.length]);

  useEffect(() => {
    if (paused || visible.length <= 2) return undefined;

    const id = setInterval(() => {
      setPage((current) => {
        const perPage = window.matchMedia('(min-width: 768px)').matches ? 2 : 1;
        const pages = Math.max(1, Math.ceil(visible.length / perPage));
        const next = (current + 1) % pages;
        const el = scrollerRef.current;
        const card = el?.querySelector('[data-slide]');
        if (el && card) {
          const gap = 16;
          const step = card.getBoundingClientRect().width + gap;
          el.scrollTo({ left: next * step * perPage, behavior: 'smooth' });
        }
        return next;
      });
    }, 4000);

    return () => clearInterval(id);
  }, [paused, visible.length]);

  return (
    <Section id={SECTION_IDS.PROJECTS}>
      <SectionHeader
        number={data.number}
        label={data.label}
        title={data.title}
        path={data.path}
        meta={`${visible.length} of ${list.length} visible`}
      >
        {data.subtitle}
      </SectionHeader>

      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <p className="font-mono text-xs text-ink-dim">
          $ ls -al /projects/{' '}
          <span className="text-ink-faint">{'// 2 per row, auto slide'}</span>
        </p>
        {visible.length > 2 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous projects"
              className="w-9 h-9 grid place-items-center border border-border rounded-md text-ink-dim hover:text-accent hover:border-accent/40"
              onClick={() => scrollToPage(page - 1)}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next projects"
              className="w-9 h-9 grid place-items-center border border-border rounded-md text-ink-dim hover:text-accent hover:border-accent/40"
              onClick={() => scrollToPage(page + 1)}
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div className="-mx-1 px-1 mb-8 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-1">
          {filters.map((f) => {
            const count =
              f === 'All' ? list.length : list.filter((p) => p.category === f).length;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`
                  font-mono text-xs px-3 py-2 rounded-md border min-h-[40px] transition-colors
                  ${
                    filter === f
                      ? 'border-accent text-accent bg-accent/5'
                      : 'border-border text-ink-dim hover:text-ink-bright'
                  }
                `}
              >
                {f} {count}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length > 0 ? (
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
        >
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {visible.map((project) => (
              <div
                key={project.id}
                data-slide
                className="snap-start shrink-0 w-full md:w-[calc(50%-0.5rem)]"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {visible.length > 2 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === page ? 'w-6 bg-accent' : 'w-1.5 bg-border hover:bg-ink-faint'
                  }`}
                  onClick={() => scrollToPage(i)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="font-mono text-sm text-ink-dim py-8">No projects in this filter.</p>
      )}
    </Section>
  );
}
