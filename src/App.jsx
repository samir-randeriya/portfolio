import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';
import StatsCounter from './components/StatsCounter';
import Testimonials from './components/Testimonials';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-all duration-300">
      <SocialSidebar />
      <Navbar />
      <main>
        <Home />
        <StatsCounter />
        <About />
        <Skills />
        <Projects />
        <Testimonials />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
}
