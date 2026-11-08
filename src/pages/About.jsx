import React from 'react';
import portfolioData from '../data/portfolioContent.json';
import { SECTION_IDS } from '../constants';
import { Card, Section, SectionHeader } from '../components/ui';

export default function About() {
  const { about } = portfolioData;

  return (
    <Section id={SECTION_IDS.ABOUT}>
      <SectionHeader
        number={about.number}
        label={about.label}
        title={about.title}
        path={about.path}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
        <div className="space-y-4 text-base sm:text-[17px] leading-relaxed text-ink-dim">
          {(about.paragraphs || []).map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <Card className="p-5 sm:p-6 h-fit">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {(about.facts || []).map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[11px] tracking-widest uppercase text-ink-faint">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-ink-bright">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(about.principles || []).map((item) => (
          <Card key={item.title} className="p-5">
            <h3 className="font-mono text-sm text-accent mb-2">{item.title}</h3>
            <p className="text-sm text-ink-dim leading-relaxed">{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
