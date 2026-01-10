import React, { lazy, Suspense } from 'react';

// Critical components - loaded immediately
import Navbar from '../components/Navbar';
import Home from './Home';

// Non-critical components - lazy loaded
const Footer = lazy(() => import('../components/Footer'));
const SocialSidebar = lazy(() => import('../components/SocialSidebar'));
const StatsCounter = lazy(() => import('../components/StatsCounter'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const About = lazy(() => import('./About'));
const Skills = lazy(() => import('./Skills'));
const Projects = lazy(() => import('./Projects'));
const Process = lazy(() => import('./Process'));
const ProofOfWork = lazy(() => import('./ProofOfWork'));
const Experience = lazy(() => import('./Experience'));
const Contact = lazy(() => import('./Contact'));

// Section loading fallback
const SectionFallback = () => (
  <div className="py-20 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
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
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all duration-300">
      {/* Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all"
      >
        Skip to main content
      </a>

      {/* Social Sidebar */}
      <Suspense fallback={null}>
        <SocialSidebar />
      </Suspense>

      {/* Navbar */}
      <Navbar />

      <main id="main-content" role="main">
        {/* Hero Section */}
        <Home />

        {/* All Portfolio Sections */}
        <Suspense fallback={<SectionFallback />}>
          <StatsCounter />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Process />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ProofOfWork />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default PortfolioHome;

