import React from 'react';
import portfolioData from '../data/portfolioContent.json';
import { SECTION_IDS } from '../constants';
import { Card, Section, SectionHeader } from '../components/ui';

export default function Services() {
  const { services } = portfolioData;

  return (
    <Section id={SECTION_IDS.SERVICES}>
      <SectionHeader
        number={services.number}
        label={services.label}
        title={services.title}
        path={services.path}
      >
        {services.subtitle}
      </SectionHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(services.items || []).map((item) => (
          <Card key={item.title} className="p-5 sm:p-6 flex flex-col">
            <h3 className="text-base sm:text-lg font-semibold text-ink-bright mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-ink-dim leading-relaxed flex-1 mb-4">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {(item.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] px-2 py-1 rounded-sm border border-border text-ink-dim"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
