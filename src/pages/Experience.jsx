import { 
  FadeSlideUp, 
  SlideFromEdge, 
  StaggerContainer, 
  StaggerItem, 
  TimelineDot,
  SectionHeader,
  ScaleIn
} from '../components/ScrollAnimations';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import portfolioData from '../data/portfolioContent.json';

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const lineControls = useAnimation();
  
  // Scroll-linked animation setup
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  
  // Transform scroll progress to timeline progress (0 to 1)
  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Track active timeline item based on scroll position
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // Get data from portfolioContent.json
  const { experience } = portfolioData;
  const experiences = experience.experiences;

  useEffect(() => {
    if (isInView) {
      lineControls.start({
        height: "100%",
        transition: {
          duration: 2,
          ease: "easeOut",
          delay: 0.5
        }
      });
    }
  }, [isInView, lineControls]);

  // Update active item based on scroll progress
  useEffect(() => {
    const unsubscribe = timelineProgress.onChange((progress) => {
      const itemCount = experiences.length;
      const currentIndex = Math.min(
        Math.floor(progress * itemCount),
        itemCount - 1
      );
      setActiveItemIndex(Math.max(0, currentIndex));
    });

    return () => unsubscribe();
  }, [timelineProgress, experiences.length]);

  const scrollToContact = () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/40 to-blue-50/40 dark:from-gray-800/40 dark:to-blue-900/40" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          title={
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              {experience.title}
            </span>
          }
          subtitle={experience.subtitle}
          className="mb-20"
        />

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative max-w-6xl mx-auto">
          {/* Animated Central Line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 hidden lg:block">
            {/* Base line that grows on view */}
            <motion.div
              ref={lineRef}
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"
              initial={{ height: 0 }}
              animate={lineControls}
              style={{ transformOrigin: "top" }}
            />
            
            {/* Scroll-linked progress indicator */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-blue-400 to-purple-500 rounded-full"
              style={{ 
                height: useTransform(timelineProgress, [0, 1], ["0%", "100%"]),
                transformOrigin: "top",
                filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))"
              }}
            />
          </div>

          {/* Mobile Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 lg:hidden">
            {/* Base line */}
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"
              initial={{ height: 0 }}
              animate={lineControls}
              style={{ transformOrigin: "top" }}
            />
            
            {/* Mobile scroll progress */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-blue-400 to-purple-500 rounded-full"
              style={{ 
                height: useTransform(timelineProgress, [0, 1], ["0%", "100%"]),
                transformOrigin: "top",
                filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))"
              }}
            />
          </div>

          {/* Experience Cards */}
          <StaggerContainer 
            staggerDelay={0.3}
            className="space-y-16 lg:space-y-20"
          >
            {experiences.map((exp, index) => {
              // For zig-zag starting from LEFT: even indexes (0,2,4) = LEFT side, odd indexes (1,3,5) = RIGHT side
              const isOnRight = index % 2 === 1;
              
              return (
                <StaggerItem key={exp.id}>
                  <div className="relative flex items-center min-h-[200px]">
                    
                    {/* Timeline Dot - positioned based on content side */}
                    <TimelineDot 
                      delay={index * 0.2}
                      className={`absolute z-20 transform ${
                        isOnRight 
                          ? 'left-8 lg:right-[calc(50%-2rem)] lg:left-auto' // Right side on desktop, left on mobile
                          : 'left-8 lg:left-[calc(50%-2rem)]' // Left side on desktop, left on mobile
                      } -translate-x-1/2 lg:translate-x-0 top-1/2 -translate-y-1/2`}
                    >
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center shadow-2xl border-4 ${
                          activeItemIndex === index 
                            ? 'border-cyan-400 dark:border-cyan-400' 
                            : 'border-white dark:border-gray-900'
                        } transition-colors duration-300`}
                        animate={{
                          scale: activeItemIndex === index ? [1, 1.1, 1] : 1,
                          filter: activeItemIndex === index 
                            ? ["drop-shadow(0 0 0px rgba(34, 211, 238, 0))", "drop-shadow(0 0 20px rgba(34, 211, 238, 0.8))", "drop-shadow(0 0 0px rgba(34, 211, 238, 0))"]
                            : "drop-shadow(0 0 0px rgba(34, 211, 238, 0))"
                        }}
                        transition={{
                          scale: { duration: 0.6, repeat: activeItemIndex === index ? Infinity : 0 },
                          filter: { duration: 1.5, repeat: activeItemIndex === index ? Infinity : 0 }
                        }}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 5,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl">{exp.icon}</span>
                      </motion.div>
                      
                      {/* Enhanced Pulse Effect for Active Item */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                          activeItemIndex === index ? 'from-cyan-400 to-blue-500' : exp.gradient
                        } ${activeItemIndex === index ? 'opacity-30' : 'opacity-20'}`}
                        animate={{
                          scale: activeItemIndex === index ? [1, 1.8, 1] : [1, 1.5, 1],
                          opacity: activeItemIndex === index ? [0.3, 0, 0.3] : [0.2, 0, 0.2]
                        }}
                        transition={{
                          duration: activeItemIndex === index ? 2 : 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Active Item Glow Ring */}
                      {activeItemIndex === index && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-cyan-400"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.8, 0, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </TimelineDot>

                    {/* Enhanced Connector Line - connects timeline dot to content */}
                    <motion.div 
                      className={`hidden lg:block absolute z-10 top-1/2 w-8 h-0.5 bg-gradient-to-r ${
                        activeItemIndex === index ? 'from-cyan-400 to-blue-500' : exp.gradient
                      } ${
                        isOnRight 
                          ? 'right-[calc(50%+1rem)] translate-x-8' // Right side connector
                          : 'left-[calc(50%+1rem)] -translate-x-8'  // Left side connector
                      }`}
                      animate={{
                        opacity: activeItemIndex === index ? [0.7, 1, 0.7] : 0.5,
                        filter: activeItemIndex === index 
                          ? ["drop-shadow(0 0 0px rgba(34, 211, 238, 0))", "drop-shadow(0 0 8px rgba(34, 211, 238, 1))", "drop-shadow(0 0 0px rgba(34, 211, 238, 0))"]
                          : "drop-shadow(0 0 0px rgba(34, 211, 238, 0))"
                      }}
                      transition={{
                        duration: activeItemIndex === index ? 2 : 0.3,
                        repeat: activeItemIndex === index ? Infinity : 0
                      }}
                    />

                    {/* Content Card - zig-zag positioning */}
                    <SlideFromEdge
                      direction={isOnRight ? "right" : "left"}
                      delay={0.3 + index * 0.1}
                      className={`w-full ${
                        isOnRight 
                          ? 'lg:w-5/12 lg:ml-auto lg:pl-20 lg:text-right' // Right side
                          : 'lg:w-5/12 lg:mr-auto lg:pr-20 lg:text-left'   // Left side
                      } ml-20 lg:ml-0 text-left relative`}
                    >
                      <motion.div
                        whileHover={{ 
                          y: -8,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="group relative p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
                          {/* Gradient Background on Hover */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                          
                          {/* Glow Effect */}
                          <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${exp.gradient} blur-xl -z-10 transform scale-110`} />

                          <div className="relative z-10">
                            {/* Header */}
                            <div className="mb-6">
                              <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className={`px-3 py-1 bg-gradient-to-r ${exp.gradient} text-white rounded-full text-xs font-medium`}>
                                  {exp.period}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">
                                  {exp.type}
                                </span>
                              </div>
                              
                              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                                {exp.title}
                              </h3>
                              
                              <p className={`text-lg font-semibold bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent mb-1`}>
                                {exp.company}
                              </p>
                              
                              <p className="text-gray-500 dark:text-gray-400 text-sm">
                                📍 {exp.location}
                              </p>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                              {exp.description}
                            </p>

                            {/* Achievements */}
                            <div className="mb-6">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                                Key Achievements
                              </h4>
                              <ul className="space-y-2">
                                {exp.achievements.slice(0, 2).map((achievement, i) => (
                                  <motion.li 
                                    key={i} 
                                    className="flex items-start text-sm text-gray-600 dark:text-gray-400"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <span className="text-green-500 mr-3 mt-0.5 flex-shrink-0">✓</span>
                                    {achievement}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>

                            {/* Technologies */}
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                                Technologies
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.technologies.slice(0, 4).map((tech, i) => (
                                  <motion.span 
                                    key={i}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                                    whileHover={{ 
                                      scale: 1.05,
                                      backgroundColor: "rgb(59 130 246 / 0.1)"
                                    }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {tech}
                                  </motion.span>
                                ))}
                                {exp.technologies.length > 4 && (
                                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-xs">
                                    +{exp.technologies.length - 4}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Floating Elements */}
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping" />
                        </div>
                      </motion.div>
                    </SlideFromEdge>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Call to Action */}
        <ScaleIn delay={2.5} className="text-center mt-20">
          <div className="p-8 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl text-white relative overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent" />
            
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                {experience.cta.title}
              </h3>
              <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
                {experience.cta.description}
              </p>
              <motion.button
                onClick={scrollToContact}
                className="px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {experience.cta.buttonText}
              </motion.button>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
