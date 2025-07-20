import { useState, useEffect, useRef } from 'react';
import { 
  FadeSlideUp, 
  StaggerContainer, 
  StaggerItem, 
  SectionHeader 
} from './ScrollAnimations';

export default function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      number: 50,
      suffix: '+',
      label: 'Projects Completed',
      description: 'Full-stack applications, websites, and mobile apps delivered',
      icon: '🚀',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      number: 15,
      suffix: '+',
      label: 'Technologies Mastered',
      description: 'Frontend, backend, database, and DevOps technologies',
      icon: '💻',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      number: 3,
      suffix: '+',
      label: 'Years of Experience',
      description: 'Building scalable web applications and digital solutions',
      icon: '📅',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      number: 99,
      suffix: '%',
      label: 'Code Quality',
      description: 'Commitment to clean, maintainable, and well-tested code',
      icon: '✨',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  // Individual counter states for each stat
  const [count0, setCount0] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const setters = [setCount0, setCount1, setCount2, setCount3];
  const counts = [count0, count1, count2, count3];

  // Intersection Observer to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animate counters when visible
  useEffect(() => {
    if (!isVisible) return;

    stats.forEach((stat, index) => {
      const setter = setters[index];
      const duration = 2000 + index * 200;
      const increment = stat.number / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.number) {
          setter(stat.number);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    });
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-100/30 to-transparent dark:from-gray-700/30 dark:to-transparent" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          title={
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Developer Statistics
            </span>
          }
          subtitle="A quick look at my journey as a developer, showcasing experience, projects, and commitment to quality."
          className="mb-16"
        />

        {/* Stats Grid */}
        <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const animatedNumber = counts[index];
            
            return (
              <StaggerItem key={index}>
                <div className="relative group h-full">
                  <div className="card-hover bg-white dark:bg-gray-800 rounded-2xl p-8 text-center relative overflow-hidden border border-gray-100 dark:border-gray-700 group-hover:shadow-2xl transition-all duration-500 h-full flex flex-col justify-between min-h-[280px]">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Top Section */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      {/* Icon */}
                      <div className="text-4xl mb-4 group-hover:scale-110 group-hover:animate-bounce transition-all duration-300">
                        {stat.icon}
                      </div>
                      
                      {/* Number */}
                      <div className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 transition-all duration-300`}>
                        {isVisible ? animatedNumber : 0}{stat.suffix}
                      </div>
                      
                      {/* Label */}
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {stat.label}
                      </h3>
                    </div>
                    
                    {/* Bottom Section */}
                    <div className="relative z-10">
                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {stat.description}
                      </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Additional Info */}
        <FadeSlideUp delay={0.8} className="text-center mt-16">
          <div className="max-w-3xl mx-auto">
            <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Continuous Growth & Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                These numbers represent my journey so far, but I'm always growing. Every project teaches me something new, 
                and I'm committed to staying current with the latest technologies and best practices in software development.
              </p>
              
              {/* Mini Achievement List */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {[
                  '🏆 Top 5% Developer on Upwork',
                  '⭐ 100% Client Satisfaction Rate',
                  '🎯 Zero-Bug Production Deployments',
                  '🚀 Performance Optimization Specialist'
                ].map((achievement, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-200"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeSlideUp>
      </div>
    </section>
  );
} 