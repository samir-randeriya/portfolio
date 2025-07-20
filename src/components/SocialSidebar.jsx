import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaWhatsapp, 
  FaInstagram, 
  FaTwitter,
  FaShareAlt,
  FaTimes
} from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

export default function SocialSidebar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  // Track scroll for smooth animations
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside drawer to close and ESC key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isDrawerOpen]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/samir-randeriya',
      color: '#333',
      darkColor: '#fff',
      hoverColor: '#4F46E5',
      bgGradient: 'from-gray-500 to-gray-700'
    },
    {
      name: 'Upwork',
      icon: SiUpwork,
      url: 'https://www.upwork.com/freelancers/~014e94a19f6e639b39',
      color: '#14A800',
      darkColor: '#14A800',
      hoverColor: '#14A800',
      bgGradient: 'from-green-500 to-green-600'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/samir-randeriya-578a17185/',
      color: '#0077B5',
      darkColor: '#0077B5',
      hoverColor: '#0077B5',
      bgGradient: 'from-blue-500 to-blue-600'
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: 'https://wa.me/9190999400550',
      color: '#25D366',
      darkColor: '#25D366',
      hoverColor: '#25D366',
      bgGradient: 'from-green-400 to-green-500'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/sam_randeriya__/',
      color: '#E4405F',
      darkColor: '#E4405F',
      hoverColor: '#E4405F',
      bgGradient: 'from-pink-500 to-purple-500'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://x.com/s_randeriya',
      color: '#1DA1F2',
      darkColor: '#1DA1F2',
      hoverColor: '#1DA1F2',
      bgGradient: 'from-sky-400 to-blue-500'
    }
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 1.4
      }
    }
  };

  // Individual icon animation variants
  const iconVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.15,
      x: 8,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };



  // Tooltip animation variants
  const tooltipVariants = {
    hidden: { 
      opacity: 0, 
      x: -15,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Desktop & Large Tablet Sidebar */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col gap-4"
          style={{
            transform: `translateY(${scrollY * 0.02}px)` // Subtle parallax effect
          }}
        >
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            
            return (
              <div key={social.name} className="relative group">
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.name} profile`}
                  variants={iconVariants}
                  whileHover="hover"
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative flex items-center justify-center w-14 h-14 bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 dark:border-gray-700/50 transition-all duration-300 overflow-hidden group"
                >
                  {/* Glassmorphic background with enhanced blur */}
                  <div className="absolute inset-0 bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg rounded-2xl" />
                  
                  {/* Animated gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${social.bgGradient} opacity-0 group-hover:opacity-90 transition-opacity duration-300 rounded-2xl`}
                    animate={hoveredIndex === index ? { opacity: 0.9 } : { opacity: 0 }}
                  />
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur-xl"
                    style={{ backgroundColor: social.hoverColor }}
                    animate={hoveredIndex === index ? { opacity: 0.3 } : { opacity: 0 }}
                  />
                  
                  {/* Icon */}
                  <IconComponent 
                    className="w-7 h-7 text-gray-700 dark:text-gray-200 group-hover:text-white transition-colors duration-300 relative z-10"
                    style={{
                      color: hoveredIndex === index ? '#fff' : undefined
                    }}
                  />
                  
                  {/* Hover ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent group-hover:border-white/50 rounded-2xl transition-colors duration-300"
                    animate={hoveredIndex === index ? { borderColor: 'rgba(255,255,255,0.5)' } : { borderColor: 'transparent' }}
                  />
                </motion.a>

                {/* Enhanced Tooltip */}
                <motion.div
                  initial="hidden"
                  animate={hoveredIndex === index ? "visible" : "hidden"}
                  variants={tooltipVariants}
                  className="absolute left-20 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-900/90 dark:bg-gray-700/90 backdrop-blur-md text-white text-sm font-medium rounded-xl whitespace-nowrap pointer-events-none shadow-lg border border-gray-700/50"
                >
                  {social.name}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900/90 dark:border-r-gray-700/90" />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>



      {/* Mobile Slide-in Drawer (< 768px) */}
      <div className="md:hidden">
        {/* Toggle Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.5 }}
          onClick={toggleDrawer}
          className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label={isDrawerOpen ? "Close social menu" : "Open social menu"}
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full" />
          <motion.div
            animate={{ rotate: isDrawerOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-10"
          >
            {isDrawerOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaShareAlt className="w-5 h-5" />
            )}
          </motion.div>
        </motion.button>

        {/* Drawer Panel */}
        <motion.div
          ref={drawerRef}
          initial={false}
          animate={{
            x: isDrawerOpen ? 0 : '100%',
            opacity: isDrawerOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed right-0 bottom-16 w-44 z-40"
        >
          <div className="flex flex-col gap-4 items-center py-6 px-4 bg-white/10 dark:bg-zinc-900/80 backdrop-blur-md rounded-l-xl shadow-xl border-l border-t border-b border-white/20 dark:border-zinc-700/50">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.name} profile`}
                  title={social.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isDrawerOpen ? 1 : 0, 
                    y: isDrawerOpen ? 0 : 20 
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: isDrawerOpen ? index * 0.05 : 0,
                    ease: "easeOut"
                  }}
                  className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/20 active:scale-95 text-white"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <IconComponent 
                    className="w-5 h-5 transition-colors duration-300"
                    style={{
                      color: hoveredIndex === index ? social.hoverColor : undefined
                    }}
                  />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Backdrop overlay */}
        {isDrawerOpen && (
                     <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.3 }}
             className="fixed inset-0 bg-black/20 z-30"
             onClick={() => setIsDrawerOpen(false)}
           />
         )}
      </div>
    </>
  );
} 