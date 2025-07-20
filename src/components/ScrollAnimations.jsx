import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Hook to detect scroll direction
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    const throttledUpdateScrollDirection = () => {
      requestAnimationFrame(updateScrollDirection);
    };

    window.addEventListener("scroll", throttledUpdateScrollDirection);

    return () => {
      window.removeEventListener("scroll", throttledUpdateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
};

// Fade and slide animation component
export const FadeSlideUp = ({ children, delay = 0, className = "", threshold = 0.1, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold,
    margin: "-100px 0px -100px 0px"
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    },
    exit: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scale animation component
export const ScaleIn = ({ children, delay = 0, className = "", threshold = 0.2, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold,
    margin: "-50px 0px -50px 0px"
  });

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -5
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotate: -5,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide from edge animation
export const SlideFromEdge = ({ children, direction = "left", delay = 0, className = "", threshold = 0.1, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold,
    margin: "-80px 0px -80px 0px"
  });

  const getInitialX = () => {
    switch (direction) {
      case "left": return -100;
      case "right": return 100;
      default: return 0;
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      x: getInitialX(),
      y: 30
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    },
    exit: {
      opacity: 0,
      x: getInitialX(),
      y: 30,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered container animation
export const StaggerContainer = ({ children, delay = 0, staggerDelay = 0.1, className = "", threshold = 0.1, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold,
    margin: "-50px 0px -50px 0px"
  });

  const variants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered child component
export const StaggerItem = ({ children, className = "", ...props }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Timeline dot animation with enhanced bi-directional support
export const TimelineDot = ({ children, delay = 0, className = "", ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold: 0.3,
    margin: "-50px 0px -50px 0px"
  });

  const variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: {
      scale: 0,
      opacity: 0,
      rotate: 180,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card animation with enhanced hover and scroll states
export const AnimatedCard = ({ children, delay = 0, className = "", hoverScale = 1.02, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold: 0.2,
    margin: "-100px 0px -100px 0px"
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.9,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    },
    exit: {
      opacity: 0,
      y: 80,
      scale: 0.9,
      rotateX: 15,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    },
    hover: {
      y: -8,
      scale: hoverScale,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      whileHover="hover"
      variants={variants}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Progress bar animation
export const AnimatedProgressBar = ({ percentage, delay = 0, className = "", color = "blue" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold: 0.5,
    margin: "-50px 0px -50px 0px"
  });

  const progressVariants = {
    hidden: {
      width: "0%",
      opacity: 0
    },
    visible: {
      width: `${percentage}%`,
      opacity: 1,
      transition: {
        duration: 1.5,
        delay,
        ease: "easeOut"
      }
    },
    exit: {
      width: "0%",
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeIn"
      }
    }
  };

  const glowVariants = {
    visible: {
      boxShadow: [
        `0 0 0px rgba(59, 130, 246, 0)`,
        `0 0 20px rgba(59, 130, 246, 0.4)`,
        `0 0 0px rgba(59, 130, 246, 0)`
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div ref={ref} className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className}`}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "exit"}
        variants={progressVariants}
        className={`bg-gradient-to-r from-${color}-500 to-${color}-600 h-2 rounded-full`}
        style={{ transformOrigin: "left" }}
      >
        <motion.div
          variants={glowVariants}
          animate={isInView ? "visible" : "hidden"}
          className="w-full h-full rounded-full"
        />
      </motion.div>
    </div>
  );
};

// Section header animation
export const SectionHeader = ({ badge, title, subtitle, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold: 0.3,
    margin: "-100px 0px -100px 0px"
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: delay
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={containerVariants}
      className={`text-center ${className}`}
    >
      {badge && (
        <motion.div variants={itemVariants} className="mb-4">
          {badge}
        </motion.div>
      )}
      
      <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export { useScrollDirection }; 