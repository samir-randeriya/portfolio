import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SpeedInsights } from "@vercel/speed-insights/react";

// AI Page - Modern UI from Lovable demo-ui
import AIPage from './pages/AIPage';

// Portfolio Home - Lazy load
const PortfolioHome = lazy(() => import('./pages/PortfolioHome'));

// Shared page background - matches portfolio dark theme for seamless transitions
const gridStyle = {
  backgroundImage: `
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
  `,
  backgroundSize: '60px 60px',
};

// Loading fallback - matches portfolio dark theme (no visual breakdown)
const LoadingFallback = () => (
  <div
    className="flex items-center justify-center min-h-screen transition-opacity duration-300"
  >
    <div className="absolute inset-0 pointer-events-none" style={gridStyle} />
    <div className="relative z-10 text-center">
      <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-sky-500/50 border-t-sky-400" />
      <p className="mt-4 text-slate-400 text-sm">Loading...</p>
    </div>
  </div>
);

// Page transition wrapper - smooth fade between routes
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2, ease: 'easeInOut' }}
    style={{ minHeight: '100vh' }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/ai" element={
            <PageTransition>
              <AIPage />
            </PageTransition>
          } />
          <Route
            path="/"
            element={
              <PageTransition>
                <Suspense fallback={<LoadingFallback />}>
                  <PortfolioHome />
                </Suspense>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
      <SpeedInsights />
    </>
  );
}
