import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import AIPage from './pages/AIPage';

const PortfolioHome = lazy(() => import('./pages/PortfolioHome'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-bg relative overflow-hidden">
    <div className="fixed inset-0 dot-grid opacity-40 pointer-events-none" aria-hidden />
    <div className="page-shell relative z-10 pt-6">
      <div className="flex items-center justify-between h-14 mb-16">
        <div className="h-4 w-28 bg-surface-2 rounded-sm animate-pulse" />
        <div className="flex gap-2">
          <div className="h-9 w-9 bg-surface-2 rounded-md animate-pulse" />
          <div className="h-9 w-9 bg-surface-2 rounded-md animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="h-6 w-48 bg-surface-2 rounded-full animate-pulse" />
          <div className="h-12 w-full max-w-md bg-surface-2 rounded-sm animate-pulse" />
          <div className="h-4 w-3/4 bg-surface-2/70 rounded-sm animate-pulse" />
          <div className="h-4 w-2/3 bg-surface-2/50 rounded-sm animate-pulse" />
          <div className="flex gap-3 pt-4">
            <div className="h-11 w-36 bg-surface-2 rounded-md animate-pulse" />
            <div className="h-11 w-36 bg-surface-2 rounded-md animate-pulse" />
          </div>
        </div>
        <div className="h-[380px] bg-surface border border-border rounded-lg animate-pulse" />
      </div>
    </div>
  </div>
);

export default function App() {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/ai" element={<AIPage />} />
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PortfolioHome />
            </Suspense>
          }
        />
      </Routes>
      <SpeedInsights />
    </>
  );
}
