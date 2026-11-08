import React from 'react';
import portfolioData from '../data/portfolioContent.json';
import { SECTION_IDS } from '../constants';
import { Card, Section, SectionHeader } from '../components/ui';

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <Section id={SECTION_IDS.SKILLS}>
      <SectionHeader
        number={skills.number}
        label={skills.label}
        title={skills.title}
        path={skills.path}
      >
        {skills.subtitle}
      </SectionHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(skills.categories || []).map((cat) => (
          <Card key={cat.title} className="p-5">
            <div className="flex items-baseline justify-between gap-2 mb-4">
              <h3 className="font-mono text-xs tracking-widest uppercase text-ink-bright">
                {cat.title}
              </h3>
              <span className="font-mono text-[11px] text-accent">
                {String(cat.skills.length).padStart(2, '0')}
              </span>
            </div>
            <ul className="space-y-2">
              {cat.skills.map((s) => (
                <li key={s} className="text-sm text-ink-dim flex gap-2">
                  <span className="text-accent/70">·</span>
                  {s}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {(skills.currentlyLearning || []).length > 0 && (
        <Card className="mt-6 p-5">
          <p className="font-mono text-xs tracking-widest uppercase text-ink-faint mb-3">
            Currently exploring
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.currentlyLearning.map((item) => (
              <span
                key={item}
                className="font-mono text-xs px-2.5 py-1.5 rounded-sm border border-border text-ink-dim"
              >
                {item}
              </span>
            ))}
          </div>
        </Card>
      )}
    </Section>
  );
}
