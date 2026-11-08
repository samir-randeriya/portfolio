import React from 'react';
import portfolioData from '../data/portfolioContent.json';
import { PageShell } from './ui';

export default function Footer() {
  const { personal, footer, navigation } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer className="section-rule py-10 sm:py-12">
      <PageShell>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <a
              href="#home"
              className="font-mono text-sm font-semibold text-ink-bright inline-flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
              {navigation.brand.name}
              <span className="text-ink-dim">{navigation.brand.tld || '.dev'}</span>
            </a>
            <p className="mt-2 text-sm text-ink-dim">{footer.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-ink-dim">
            {(footer.links || []).map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 font-mono text-[11px] text-ink-faint">
          © {year} {personal.name}. Built with care.
        </p>
      </PageShell>
    </footer>
  );
}
