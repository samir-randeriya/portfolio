import React, { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Home from './Home';
import ErrorBoundary from '../components/ErrorBoundary';

const Footer = lazy(() => import('../components/Footer'));
const About = lazy(() => import('./About'));
const Services = lazy(() => import('./Services'));
const Experience = lazy(() => import('./Experience'));
const Projects = lazy(() => import('./Projects'));
const Skills = lazy(() => import('./Skills'));
const Process = lazy(() => import('./Process'));
const Testimonials = lazy(() => import('./Testimonials'));
const Contact = lazy(() => import('./Contact'));

const SectionFallback = () => (
  <div className="section-block section-rule">
    <div className="page-shell animate-pulse space-y-4">
      <div className="h-3 w-24 bg-surface-2 rounded-sm" />
      <div className="h-8 w-2/3 max-w-md bg-surface-2 rounded-sm" />
      <div className="h-4 w-full max-w-xl bg-surface-2/60 rounded-sm" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        <div className="h-32 bg-surface rounded-lg border border-border" />
        <div className="h-32 bg-surface rounded-lg border border-border" />
      </div>
    </div>
  </div>
);

const PortfolioHome = () => {
  return (
    <div className="min-h-screen bg-bg text-ink relative">
      <div className="fixed inset-0 dot-grid pointer-events-none opacity-40" aria-hidden />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-on-accent focus:rounded-md focus:font-mono focus:text-sm"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" role="main" className="relative z-10">
        <Home />

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Services />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Experience />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Process />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </ErrorBoundary>
      </main>

      <ErrorBoundary>
        <Suspense fallback={null}>
          <div className="relative z-10">
            <Footer />
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default PortfolioHome;
