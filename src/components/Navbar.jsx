import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';
import portfolioData from '../data/portfolioContent.json';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Get data from portfolioContent.json
  const { navigation } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    setIsMenuOpen(false);
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('#home')}
              className="group flex items-center space-x-3 cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                isScrolled ? 'shadow-lg' : 'shadow-xl'
              }`}>
                <span className="text-white font-bold text-lg">{navigation.brand.initials}</span>
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-white'
                }`}>
                  {navigation.brand.name}
                </h1>
                <p className={`text-xs transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-600 dark:text-gray-400' 
                    : 'text-gray-200'
                }`}>
                  {navigation.brand.title}
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                    : 'text-white hover:bg-white/10 hover:text-blue-200'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            <div className="ml-4 pl-4 border-l border-gray-300/30">
              <DarkModeToggle />
            </div>
            
            {/* <button
              onClick={scrollToContact}
              className={`ml-4 px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                isScrolled
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/25'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              {navigation.cta.text}
            </button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <DarkModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden transition-all duration-300 ease-out ${
        isMenuOpen 
          ? 'max-h-screen opacity-100 visible' 
          : 'max-h-0 opacity-0 invisible overflow-hidden'
      }`}>
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
            {navigation.menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl font-medium transition-all duration-200"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={scrollToContact}
              className="w-full mt-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {navigation.cta.text}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
