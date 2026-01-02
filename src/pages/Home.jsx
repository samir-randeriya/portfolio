import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolioContent.json';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Get data from portfolioContent.json
  const { personal, hero } = portfolioData;
  const roles = personal.roles;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Start typing animation after component loads
      setTimeout(() => {
        setDisplayedText(''); // Reset displayed text
        setCurrentRole(0); // Start with first role
        setAnimationStarted(true);
        setIsTyping(true);
      }, 1000);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (!animationStarted) return;

    const currentRoleText = roles[currentRole];
    let timeout;

    if (isTyping) {
      if (displayedText.length < currentRoleText.length) {
        // Type next character
        timeout = setTimeout(() => {
          setDisplayedText(currentRoleText.slice(0, displayedText.length + 1));
        }, 80 + Math.random() * 40); // 80-120ms per character
      } else {
        // Finished typing, pause then start erasing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1500); // Pause for 1.5 seconds
      }
    } else {
      if (displayedText.length > 0) {
        // Erase character
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 40); // 40ms per character when erasing
      } else {
        // Finished erasing, move to next role
        timeout = setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
          setIsTyping(true);
        }, 300); // Brief pause before starting next role
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, currentRole, roles, animationStarted]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 400); // Faster blinking to match faster typing
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    window.open(personal.resumeUrl, '_blank');
  };

  // Button action handlers
  const buttonActions = {
    scrollToProjects,
    scrollToContact,
    downloadResume
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        {/* Dynamic Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-blue-50/10 dark:from-gray-900/50 dark:to-blue-900/10 transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        
        {/* Enhanced Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-blue-500/10 via-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }} />
        
        {/* Particle Effect */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-12 py-8">
          {/* Clean Professional Header */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div className={`transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
                  <span className="block text-xl sm:text-2xl md:text-3xl font-light text-gray-300 mb-2">
                    {hero.greeting}
                  </span>
                  <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text animate-gradient-x">
                    {personal.name}
                  </span>
                </h1>
                
                {/* Role with Typing Effect */}
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mt-6">
                  <span className="text-gray-300 font-light">{hero.rolePrefix}</span>
                  <span className="relative inline-block">
                    <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text animate-gradient-x">
                      {animationStarted ? displayedText : personal.title}
                      {/* Typing cursor */}
                      <span className={`inline-block w-0.5 h-8 sm:h-10 md:h-12 bg-gradient-to-b from-blue-400 to-purple-400 ml-1 ${(animationStarted && showCursor) ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`} />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Description */}
          <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-4">{hero.description.primary.split('**').map((part, index) => index % 2 === 0 ? part : <span key={index} className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold">{part}</span>)}</p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed font-light">
              {hero.description.secondary.split('**').map((part, index) => 
                index % 2 === 0 ? part : (
                  <span key={index} className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">
                    {part}
                  </span>
                )
              )}
            </p>
          </div>

          {/* Professional Tech Stack */}
          <div className={`flex flex-wrap items-center justify-center gap-4 sm:gap-6 transition-all duration-1000 delay-900 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {hero.techStack.map((tech, index) => (
              <div
                key={tech}
                className="group relative px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-xl text-white text-sm font-semibold hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-400/50 hover:scale-110 hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{tech}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 rounded-xl transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* Professional CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-4 pb-12 transition-all duration-1000 delay-1100 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {hero.buttons.map((button, index) => (
              <button
                key={index}
                onClick={buttonActions[button.action]}
                className={`group relative px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer ${
                  button.type === 'primary'
                    ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-blue-500/30'
                    : 'border-2 border-white/30 text-white hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:border-white/50 hover:shadow-lg hover:shadow-white/20 backdrop-blur-lg'
                }`}
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-2">{button.icon}</span>
                  {button.text}
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                {button.type === 'primary' ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className={`absolute bottom-8 right-8 flex flex-col items-center space-y-3 text-white transition-all duration-1000 delay-1300 ${
        isLoaded ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <span className="text-sm font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent whitespace-nowrap">
          Scroll to explore
        </span>
        <div className="relative w-8 h-20 flex flex-col items-center">
          {/* Background line */}
          <div className="w-px h-16 bg-gradient-to-b from-white/40 via-white/20 to-transparent" />
          
          {/* Animated dots along the line */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-white/40 animate-scroll-dot-1" />
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-white/40 animate-scroll-dot-2" />
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-white/40 animate-scroll-dot-3" />
          <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-white/40 animate-scroll-dot-4" />
          
          {/* Main animated pointer moving top to bottom */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg shadow-blue-400/50 animate-scroll-pointer-smooth" />
          
          {/* Trailing effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-blue-300/60 to-purple-300/60 blur-sm animate-scroll-pointer-trail" />
          
          {/* Arrow at bottom */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 via-purple-400/5 to-transparent rounded-full blur-xl animate-pulse" />
        </div>
      </div>

      {/* Enhanced Texture Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
