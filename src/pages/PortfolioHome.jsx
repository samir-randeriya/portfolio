import React, { lazy, Suspense } from 'react';

// Critical components - loaded immediately
import Navbar from '../components/Navbar';
import Home from './Home';
import ErrorBoundary from '../components/ErrorBoundary';
import PageBackgroundWrapper from '../components/PageBackgroundWrapper';

// Non-critical components - lazy loaded
const Footer = lazy(() => import('../components/Footer'));
const SocialSidebar = lazy(() => import('../components/SocialSidebar'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const About = lazy(() => import('./About'));
const Skills = lazy(() => import('./Skills'));
const Projects = lazy(() => import('./Projects'));
const Experience = lazy(() => import('./Experience'));
const Contact = lazy(() => import('./Contact'));

// Section loading fallback - matches portfolio dark theme (seamless, no breakdown)
const SectionFallback = () => (
  <div className="py-20 relative">
    <div
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-white/10 rounded w-1/4 mx-auto" />
        <div className="h-4 bg-white/5 rounded w-1/2 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-white/5 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * PortfolioHome - Main portfolio page with all sections
 * This is the homepage that shows all your portfolio content
 */
const PortfolioHome = () => {
  return (
    <PageBackgroundWrapper>
      <div className="page-container bg-transparent text-gray-800 dark:text-white transition-all duration-300">
        {/* Skip to Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all"
        >
          Skip to main content
        </a>

        {/* Social Sidebar */}
        <ErrorBoundary>
          <Suspense fallback={null}>
            <SocialSidebar />
          </Suspense>
        </ErrorBoundary>

        {/* Navbar */}
        <Navbar />

        <main id="main-content" role="main">
          {/* Hero Section */}
          <Home />

          {/* All Portfolio Sections */}
          <ErrorBoundary>
            <Suspense fallback={<SectionFallback />}>
              <About />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionFallback />}>
              <Skills />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionFallback />}>
              <Projects />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionFallback />}>
              <Testimonials />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionFallback />}>
              <Experience />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionFallback />}>
              <Contact />
            </Suspense>
          </ErrorBoundary>
        </main>

        {/* Footer */}
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </div>
    </PageBackgroundWrapper>
  );
};

export default PortfolioHome;

