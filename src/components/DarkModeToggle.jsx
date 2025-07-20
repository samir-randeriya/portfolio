import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDark = () => {
    setIsAnimating(true);
    const newDarkState = !isDark;
    setIsDark(newDarkState);
    
    if (newDarkState) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      onClick={toggleDark}
      className="group relative p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
      aria-label="Toggle Dark Mode"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-blue-400 dark:to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      
      {/* Icon container with rotation */}
      <div className={`relative transition-transform duration-500 ${isAnimating ? 'animate-spin' : ''}`}>
        {isDark ? (
          <svg 
            className="w-5 h-5 text-yellow-400 transition-all duration-300 transform group-hover:scale-110" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
              clipRule="evenodd" 
            />
            {/* Sun rays animation */}
            <g className="animate-pulse">
              <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.6"/>
            </g>
          </svg>
        ) : (
          <svg 
            className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-all duration-300 transform group-hover:scale-110" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            {/* Moon phases animation */}
            <circle cx="13" cy="7" r="1" fill="currentColor" opacity="0.4" className="animate-ping"/>
          </svg>
        )}
      </div>

      {/* Ripple effect on click */}
      {isAnimating && (
        <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"></div>
      )}
    </button>
  );
}
