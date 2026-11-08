import React from 'react';
import portfolioData from '../data/portfolioContent.json';
import { SECTION_IDS } from '../constants';
import { Card, Section, SectionHeader } from '../components/ui';

export default function Process() {
  const { process } = portfolioData;

  return (
    <Section id={SECTION_IDS.PROCESS}>
      <SectionHeader
        number={process.number}
        label={process.label}
        title={process.title}
        path={process.path}
      >
        {process.subtitle}
      </SectionHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(process.steps || []).map((step) => (
          <Card key={step.id} className="p-5">
            <span className="font-mono text-accent text-sm">{step.id}</span>
            <h3 className="mt-3 text-base font-semibold text-ink-bright">{step.title}</h3>
            <p className="mt-2 text-sm text-ink-dim leading-relaxed">{step.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
