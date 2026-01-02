import React, { useState, useRef, useEffect } from 'react';
import { AnimatedCard } from './ScrollAnimations';

export default function ProjectSlider({ projects, className = "" }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

  const slidesPerView = 2;
  const totalSlides = Math.ceil(projects.length / slidesPerView);
  const maxSlide = Math.max(0, totalSlides - 1);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && totalSlides > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, maxSlide, totalSlides]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(Math.max(0, Math.min(slideIndex, maxSlide)));
  };

  const nextSlide = () => {
    goToSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    goToSlide(currentSlide - 1);
  };

  const getVisibleProjects = () => {
    const startIndex = currentSlide * slidesPerView;
    return projects.slice(startIndex, startIndex + slidesPerView);
  };

  if (projects.length <= slidesPerView) {
    // If we have 2 or fewer projects, display them normally without slider
    return (
      <div className={`grid md:grid-cols-2 gap-8 ${className}`}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slider Container */}
      <div 
        ref={sliderRef}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className="flex transition-transform duration-500 ease-in-out">
          {getVisibleProjects().map((project, index) => (
            <div 
              key={project.id} 
              className="w-full md:w-1/2 flex-shrink-0 px-4"
            >
              <ProjectCard 
                project={project} 
                index={index} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center mt-8 space-x-4">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <svg 
            className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={currentSlide === maxSlide}
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <svg 
            className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {currentSlide + 1} of {totalSlides}
        </span>
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project, index }) {
  return (
    <AnimatedCard delay={index * 0.1} hoverScale={1.03} className="h-full group">
      <div className="relative h-full p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col min-h-[450px]">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        {/* Project Icon */}
        <div className="relative z-10 mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
            {project.image}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Top Section */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              {/* <span className="text-sm font-mono text-gray-400">{project.id}</span> */}
              <span className={`px-2 py-1 bg-gradient-to-r ${project.color} text-white rounded text-xs font-medium`}>
                {project.category}
              </span>
            </div>

            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
              {project.title}
            </h4>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Bottom Section - Action Buttons */}
          <div className="flex gap-4 mt-auto">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-center text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              View Live
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-center text-sm font-medium hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            >
              Code
            </a>
          </div>
        </div>

        {/* Hover Arrow */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center text-white`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
} 