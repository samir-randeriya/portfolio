import React from 'react';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import portfolioData from '../data/portfolioContent.json';
import { SECTION_IDS, SOCIAL_URLS } from '../constants';
import { Badge, Button, PageShell } from '../components/ui';
import HeroAskChat from '../components/HeroAskChat';

const iconBtn =
  'grid place-items-center w-10 h-10 shrink-0 border border-border-strong rounded-md bg-surface text-ink-bright hover:border-accent hover:text-accent transition-colors';

export default function Home() {
  const { personal, hero } = portfolioData;

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleCta = (action) => {
    if (action === 'scrollToContact') scrollTo(SECTION_IDS.CONTACT);
    if (action === 'scrollToProjects') scrollTo(SECTION_IDS.PROJECTS);
  };

  return (
    <section id={SECTION_IDS.HOME} className="relative pt-[88px] pb-16 sm:pb-24 max-[640px]:pt-20">
      <PageShell>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <Badge pulse className="mb-6">
              {hero.availability}
            </Badge>

            <h1 className="text-display font-semibold text-ink-bright tracking-tight">
              <span className="font-mono text-ink-dim mr-2">$</span>
              hi, I&apos;m{' '}
              <span className="text-accent">{personal.firstName}</span>
              <span
                className="inline-block w-[0.42em] h-[0.85em] ml-1 align-[-0.05em] bg-accent animate-blink"
                aria-hidden
              />
            </h1>

            <p className="mt-4 font-mono text-sm sm:text-[15px] text-ink-dim">
              {hero.tagline}
            </p>

            <p className="mt-5 text-base sm:text-[17px] leading-relaxed text-ink-dim max-w-xl">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                onClick={() => handleCta(hero.primaryCta.action)}
                className="shrink-0"
              >
                {hero.primaryCta.text}
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleCta(hero.secondaryCta.action)}
                className="shrink-0"
              >
                {hero.secondaryCta.text}
              </Button>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={SOCIAL_URLS.WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp +91 9099400550"
                  title="WhatsApp +91 9099400550"
                  className={iconBtn}
                >
                  <FaWhatsapp size={18} />
                </a>
                <a
                  href={SOCIAL_URLS.LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className={iconBtn}
                >
                  <FaLinkedin size={16} />
                </a>
                <a
                  href={SOCIAL_URLS.UPWORK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Upwork"
                  title="Upwork"
                  className={iconBtn}
                >
                  <SiUpwork size={16} />
                </a>
              </div>
            </div>
          </div>

          <HeroAskChat />
        </div>
      </PageShell>
    </section>
  );
}
