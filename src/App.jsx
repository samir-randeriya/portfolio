import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BACKGROUND_DARK } from './constants';

// AI Page - Modern UI from Lovable demo-ui
import AIPage from './pages/AIPage';

// Portfolio Home - Lazy load
const PortfolioHome = lazy(() => import('./pages/PortfolioHome'));

// Shared page background - matches portfolio dark theme for seamless transitions
const PAGE_BG = BACKGROUND_DARK;

// Loading fallback — skeleton that mirrors the portfolio layout
const LoadingFallback = () => (
  <div
    className="min-h-screen relative overflow-hidden"
    style={{ background: PAGE_BG }}
  >
    {/* Orbs — identical to Home.jsx */}
    <div className="absolute pointer-events-none"
      style={{
        top: '-10%', left: '-10%', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 65%)',
        filter: 'blur(60px)'
      }} />
    <div className="absolute pointer-events-none"
      style={{
        bottom: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 65%)',
        filter: 'blur(60px)'
      }} />
    <div className="absolute pointer-events-none"
      style={{
        top: '40%', right: '15%', width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 65%)',
        filter: 'blur(50px)'
      }} />

    {/* Shimmer keyframes */}
    <style>{`
      @keyframes skel-shimmer {
        0%   { background-position: -600px 0; }
        100% { background-position:  600px 0; }
      }
      .skel {
        background: linear-gradient(90deg,
          rgba(255,255,255,0.04) 25%,
          rgba(255,255,255,0.10) 50%,
          rgba(255,255,255,0.04) 75%
        );
        background-size: 600px 100%;
        animation: skel-shimmer 1.6s ease-in-out infinite;
        border-radius: 6px;
      }
    `}</style>

    {/* ── Skeleton Navbar ── */}
    <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="skel w-9 h-9 rounded-full" />
        <div className="space-y-1.5">
          <div className="skel h-3 w-28" />
          <div className="skel h-2 w-20" />
        </div>
      </div>
      {/* Nav links */}
      <div className="hidden md:flex items-center gap-6">
        {[56, 44, 48, 60, 72, 52].map((w, i) => (
          <div key={i} className="skel h-2.5" style={{ width: w }} />
        ))}
      </div>
      {/* CTA button */}
      <div className="skel h-8 w-20 rounded-full" />
    </div>

    {/* ── Skeleton Hero ── */}
    <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 gap-5">
      {/* Badge pill */}
      <div className="skel h-6 w-40 rounded-full" />

      {/* Headline — 2 lines */}
      <div className="space-y-3 w-full max-w-xl">
        <div className="skel h-10 w-full rounded-lg" />
        <div className="skel h-10 w-4/5 rounded-lg mx-auto" />
        <div className="skel h-10 w-2/3 rounded-lg mx-auto" />
      </div>

      {/* Subtitle */}
      <div className="space-y-2 w-full max-w-md mt-1">
        <div className="skel h-3.5 w-full" />
        <div className="skel h-3.5 w-5/6 mx-auto" />
      </div>

      {/* CTA buttons */}
      <div className="flex items-center gap-4 mt-3">
        <div className="skel h-11 w-36 rounded-full" />
        <div className="skel h-11 w-36 rounded-full" />
      </div>

      {/* Tech-stack tags */}
      <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-lg">
        {[72, 64, 88, 56, 68, 80, 60, 76].map((w, i) => (
          <div key={i} className="skel h-6 rounded-full" style={{ width: w }} />
        ))}
      </div>
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
