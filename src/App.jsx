import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";

// AI Page - Modern UI from Lovable demo-ui
import AIPage from './pages/AIPage';

// Portfolio Home - Lazy load
const PortfolioHome = lazy(() => import('./pages/PortfolioHome'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <>
      <Routes>
        {/* AI Page - Full screen AI assistant */}
        <Route path="/ai" element={<AIPage />} />
        
        {/* Portfolio Home - All sections */}
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
