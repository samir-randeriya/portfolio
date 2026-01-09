import React, { lazy, Suspense } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Critical components - loaded immediately
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Non-critical components - lazy loaded
const Footer = lazy(() => import('./components/Footer'));
const SocialSidebar = lazy(() => import('./components/SocialSidebar'));
const StatsCounter = lazy(() => import('./components/StatsCounter'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const Process = lazy(() => import('./pages/Process'));
const ProofOfWork = lazy(() => import('./pages/ProofOfWork'));
const Experience = lazy(() => import('./pages/Experience'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

// Section loading fallback (smaller, for individual sections)
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

export default function App() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all duration-300">
      {/* Skip to Content Link - Visible on Keyboard Focus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all"
      >
        Skip to main content
      </a>

      {/* Lazy load sidebar - non-critical */}
      <Suspense fallback={null}>
        <SocialSidebar />
      </Suspense>

      {/* Navbar is critical - loaded immediately */}
      <Navbar />

      <main id="main-content" role="main">
        {/* Home (Hero) is critical - loaded immediately */}
        <Home />

        {/* All sections below the fold - lazy loaded with fallbacks */}
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

      {/* Footer - lazy loaded */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <SpeedInsights />
    </div>
  );
}
