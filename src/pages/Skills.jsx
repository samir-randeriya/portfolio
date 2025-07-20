import { 
  FadeSlideUp, 
  StaggerContainer, 
  StaggerItem, 
  AnimatedCard,
  SectionHeader,
  ScaleIn
} from '../components/ScrollAnimations';
import portfolioData from '../data/portfolioContent.json';

export default function Skills() {
  // Get data from portfolioContent.json
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50/20 to-purple-50/20 dark:from-gray-800/20 dark:to-purple-900/20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          title={
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {skills.title}
            </span>
          }
          subtitle={skills.subtitle}
          className="mb-16"
        />

        {/* Skills Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {skills.categories.map((category, index) => (
            <StaggerItem key={index}>
              <AnimatedCard delay={category.delay} className="h-full">
                <div className={`relative p-8 bg-gradient-to-br ${category.gradient} rounded-3xl text-white overflow-hidden group hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl h-full flex flex-col min-h-[320px]`}>
                  {/* Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tl from-white/15 to-white/5" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Top Section */}
                    <div className="flex-1">
                      {/* Icon */}
                      <div className="text-5xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        {category.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-200 transition-colors duration-300">
                        {category.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-white/90 mb-6 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    
                    {/* Bottom Section - Skills Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium hover:bg-white/30 transition-colors duration-200 cursor-default"
                          style={{ animationDelay: `${skillIndex * 0.1}s` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Proficiency Overview */}
        <ScaleIn delay={0.6}>
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Proficiency Overview
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A breakdown of my expertise levels across different technologies and frameworks.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.proficiencyLevels.map((level, index) => (
                <StaggerItem key={index} delay={index * 0.1}>
                  <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${level.color} rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300`}>
                      {level.count}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {level.name}
                    </h4>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 bg-gradient-to-r ${level.color} rounded-full transition-all duration-1000 delay-500`}
                        style={{ width: `${level.percentage}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {level.percentage}% Confidence
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </div>
        </ScaleIn>

        {/* Learning Goals */}
        <ScaleIn delay={0.8}>
          <div className="text-center bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Currently Learning & Exploring
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I believe in continuous learning. Here are some technologies I'm currently exploring to stay ahead of the curve.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {skills.currentlyLearning.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-default"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScaleIn>

        {/* CTA Section */}
        <ScaleIn delay={1.0} className="text-center mt-16">
          <div className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl text-white relative overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                {skills.cta.title}
              </h3>
              <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                {skills.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {skills.cta.buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.href}
                    className={`px-8 py-3 rounded-xl font-semibold transition-colors duration-300 ${
                      button.type === 'primary'
                        ? 'bg-white text-purple-600 hover:bg-gray-100'
                        : 'border-2 border-white/30 text-white hover:bg-white/10'
                    }`}
                  >
                    {button.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
