import React, { useEffect, useState } from 'react';
import portfolioData from '../data/portfolioContent.json';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const { brand, menuItems } = portfolioData.navigation;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = menuItems.map((m) => m.href.replace('#', ''));
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [menuItems]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`
          fixed top-0 inset-x-0 z-50
          transition-colors duration-200
          ${scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border' : 'bg-transparent'}
        `}
      >
        <div className="page-shell flex items-center justify-between h-14 sm:h-16">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go('#home');
            }}
            className="flex items-center gap-2.5 font-mono text-[15px] font-semibold tracking-tight text-ink-bright"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
            <span>
              {brand.name}
              <span className="text-ink-dim">{brand.tld || '.dev'}</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className={`
                  py-2 px-3.5 font-mono text-[13px] rounded-sm transition-colors
                  ${active === item.href ? 'text-accent' : 'text-ink-dim hover:text-ink-bright'}
                `}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-9 h-9 border border-border rounded-md text-ink-dim hover:text-ink-bright"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`
          fixed inset-0 z-40 lg:hidden transition-opacity duration-200
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <button
          type="button"
          className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
        />
        <div
          className={`
            absolute top-14 sm:top-16 right-0 left-0 mx-gutter
            bg-surface border border-border rounded-lg p-3 shadow-lg
            transition-transform duration-200
            ${open ? 'translate-y-0' : '-translate-y-2'}
          `}
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className={`
                  block py-3 px-4 font-mono text-sm rounded-sm transition-colors
                  ${active === item.href ? 'text-accent bg-accent/5' : 'text-ink-dim hover:text-ink-bright hover:bg-surface-2'}
                `}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
