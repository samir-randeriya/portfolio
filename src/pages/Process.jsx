import { motion } from 'framer-motion';
import { 
  SectionHeader,
  StaggerContainer,
  StaggerItem
} from '../components/ScrollAnimations';

export default function Process() {
  const processSteps = [
    {
      id: 1,
      title: "Understand",
      icon: "🔍",
      description: "Deep dive into your business goals, target audience, and technical requirements. I ask the right questions to align development with your vision.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-700",
      iconBg: "bg-blue-100 dark:bg-blue-800/50",
      deliverables: [
        "Requirements analysis",
        "Technical feasibility study",
        "Project timeline & milestones"
      ]
    },
    {
      id: 2,
      title: "Design",
      icon: "🎨",
      description: "Architect scalable solutions with clean system design. Database schemas, API structures, and user flows that prioritize performance and security.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-700",
      iconBg: "bg-purple-100 dark:bg-purple-800/50",
      deliverables: [
        "System architecture design",
        "Database schema design",
        "API documentation"
      ]
    },
    {
      id: 3,
      title: "Build",
      icon: "⚡",
      description: "Write clean, maintainable code following best practices. Laravel backends, React frontends, and robust APIs built to scale with your business.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-700",
      iconBg: "bg-orange-100 dark:bg-orange-800/50",
      deliverables: [
        "Feature development",
        "Unit & integration tests",
        "Code reviews & refactoring"
      ]
    },
    {
      id: 4,
      title: "Deploy",
      icon: "🚀",
      description: "Ship to production with confidence. CI/CD pipelines, environment configurations, and monitoring to ensure smooth deployments and zero downtime.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-700",
      iconBg: "bg-green-100 dark:bg-green-800/50",
      deliverables: [
        "CI/CD pipeline setup",
        "Production deployment",
        "Performance monitoring"
      ]
    },
    {
      id: 5,
      title: "Optimize",
      icon: "📈",
      description: "Continuous improvement through monitoring, feedback, and iterations. Performance tuning, security audits, and feature enhancements based on real usage.",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-700",
      iconBg: "bg-indigo-100 dark:bg-indigo-800/50",
      deliverables: [
        "Performance optimization",
        "Security audits",
        "User feedback integration"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const arrowVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    }
  };

  return (
    <section id="process" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-transparent dark:to-gray-900/50" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-100 to-orange-100 dark:from-pink-900/10 dark:to-orange-900/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          title={
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Development Process
            </span>
          }
          subtitle="From idea to production—here's how I turn your vision into reliable, scalable software that delivers results."
          className="mb-16"
        />

        {/* Process Steps - Desktop View */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="hidden lg:block relative"
        >
          {/* Connecting Line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 via-green-500 to-indigo-500 rounded-full opacity-20" />
          
          <div className="grid grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Step Card */}
                <div className={`${step.bgColor} ${step.borderColor} border-2 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden h-full`}>
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-400 dark:text-gray-600">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${step.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto relative`}>
                    <span className="text-3xl">{step.icon}</span>
                    {/* Pulse animation */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20 rounded-2xl animate-pulse`} />
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-3 text-center bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Deliverables:
                    </div>
                    {step.deliverables.map((deliverable, idx) => (
                      <div key={idx} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
                        <span className={`mr-2 mt-0.5 text-transparent bg-gradient-to-r ${step.color} bg-clip-text font-bold`}>✓</span>
                        {deliverable}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    variants={arrowVariants}
                    className="absolute top-20 -right-4 z-10 hidden lg:block"
                  >
                    <svg className="w-8 h-8 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Steps - Mobile & Tablet View */}
        <div className="lg:hidden">
          <StaggerContainer staggerDelay={0.15} className="space-y-6">
            {processSteps.map((step, index) => (
              <StaggerItem key={step.id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`${step.bgColor} ${step.borderColor} border-2 rounded-2xl p-6 shadow-lg relative overflow-hidden group`}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10 flex items-start gap-4">
                    {/* Icon & Number */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 ${step.iconBg} rounded-2xl flex items-center justify-center mb-2 relative`}>
                        <span className="text-3xl">{step.icon}</span>
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20 rounded-2xl animate-pulse`} />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-400 dark:text-gray-600 mx-auto">
                        {step.id}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                        {step.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Deliverables */}
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Deliverables:
                        </div>
                        {step.deliverables.map((deliverable, idx) => (
                          <div key={idx} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
                            <span className={`mr-2 mt-0.5 text-transparent bg-gradient-to-r ${step.color} bg-clip-text font-bold`}>✓</span>
                            {deliverable}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Arrow Down for Mobile */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center my-4"
                  >
                    <svg className="w-6 h-6 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
              Let's discuss how this proven process can bring your ideas to life with quality, speed, and reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Let's Talk
              </a>
              <a
                href="#projects"
                className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300"
              >
                View My Work
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

