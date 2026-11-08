import React from 'react';
import { SiUpwork } from 'react-icons/si';
import portfolioData from '../data/portfolioContent.json';
import { SECTION_IDS, SOCIAL_URLS } from '../constants';
import { Button, Card, Section, SectionHeader } from '../components/ui';

function ProviderIcon({ company }) {
  const name = (company || '').toLowerCase();
  if (name.includes('upwork')) {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-border bg-surface-2 text-[#14a800]"
        title="Upwork"
        aria-label="Upwork"
      >
        <SiUpwork size={14} />
      </span>
    );
  }

  return (
    <span className="px-1.5 py-0.5 rounded-sm border border-border font-mono text-[11px] text-ink-dim">
      {company || 'Client'}
    </span>
  );
}

export default function Testimonials() {
  const { reviews: data } = portfolioData;
  const list = (data.reviews || []).filter((r) => r.name);

  if (list.length === 0) return null;

  return (
    <Section id={SECTION_IDS.TESTIMONIALS}>
      <SectionHeader
        number={data.number || '07'}
        label={data.label || 'Reviews'}
        title={data.title || 'What clients say'}
        path={data.path || '~/reviews'}
      >
        {data.subtitle}
      </SectionHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((review) => (
          <Card
            key={`${review.name}-${review.project}`}
            className="p-5 flex flex-col relative overflow-hidden max-w-full"
          >
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <ProviderIcon company={review.company} />
                <span className="font-mono text-[12px] tracking-wide text-accent">
                  {'★'.repeat(Math.min(review.rating || 5, 5))}
                </span>
              </div>
              {review.date && (
                <span className="font-mono text-[11px] text-ink-faint">{review.date}</span>
              )}
            </div>

            {review.feedback ? (
              <blockquote className="text-sm sm:text-[15px] text-ink-bright leading-relaxed flex-1">
                &ldquo;{review.feedback}&rdquo;
              </blockquote>
            ) : (
              <p className="text-sm sm:text-[15px] text-ink-dim leading-relaxed flex-1">
                Verified review for <span className="text-ink-bright">{review.project || 'project work'}</span>.
              </p>
            )}

            <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-border">
              <div>
                <p className="text-sm font-semibold text-ink-bright">{review.name}</p>
                <p className="font-mono text-[11px] text-ink-faint mt-1">
                  {[review.role, review.project].filter(Boolean).join(' · ')}
                </p>
              </div>
              {(review.company || '').toLowerCase().includes('upwork') && SOCIAL_URLS.UPWORK && (
                <a
                  href={SOCIAL_URLS.UPWORK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-border text-[#14a800] hover:border-accent hover:text-accent transition-colors"
                  aria-label="Open Upwork profile"
                  title="Upwork"
                >
                  <SiUpwork size={15} />
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>

      {SOCIAL_URLS.UPWORK && (
        <div className="mt-6">
          <Button
            as="a"
            href={SOCIAL_URLS.UPWORK}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="text-xs min-h-[40px] gap-2"
          >
            <SiUpwork size={14} className="text-[#14a800]" />
            view on upwork →
          </Button>
        </div>
      )}
    </Section>
  );
}
