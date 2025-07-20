import { 
  FadeSlideUp, 
  SlideFromEdge, 
  StaggerContainer, 
  StaggerItem, 
  AnimatedCard,
  SectionHeader,
  ScaleIn
} from '../components/ScrollAnimations';
import portfolioData from '../data/portfolioContent.json';

export default function Projects() {
  // Get data from portfolioContent.json
  const { projects } = portfolioData;
  
  const featuredProjects = projects.projects.filter(project => project.featured);
  const otherProjects = projects.projects.filter(project => !project.featured);

  const scrollToContact = () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  };

  const openGithub = () => {
    window.open('https://github.com/username', '_blank');
  };

  const buttonActions = {
    scrollToContact,
    openGithub
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-tl from-gray-50/30 to-green-50/30 dark:from-gray-800/30 dark:to-green-900/30" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          title={
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {projects.title}
            </span>
          }
          subtitle={projects.subtitle}
          className="mb-16"
        />

        {/* Featured Projects */}
        <div className="space-y-16 lg:space-y-24 mb-20">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={project.id}
                className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center"
              >
                {/* Project Info */}
                <SlideFromEdge 
                  direction={isEven ? "left" : "right"} 
                  delay={0.2 + index * 0.1}
                  className={`${isEven ? 'md:order-1' : 'md:order-2'}`}
                >
                  <div className="space-y-6">
                    {/* Project Number & Category */}
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-mono text-gray-400 dark:text-gray-500">
                        {project.id}
                      </span>
                      <span className={`px-3 py-1 bg-gradient-to-r ${project.color} text-white rounded-full text-xs font-medium`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <StaggerContainer 
                      staggerDelay={0.1}
                      className="grid grid-cols-3 gap-4"
                    >
                      {project.metrics.map((metric, metricIndex) => (
                        <StaggerItem key={metricIndex}>
                          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                            <div className={`text-lg font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                              {metric.value}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {metric.label}
                            </div>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>

                    {/* Action Buttons */}
                    <div className="flex justify-start">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-6 py-3 bg-gradient-to-r ${project.color} text-white rounded-xl font-semibold text-center hover:shadow-lg hover:scale-105 transition-all duration-300`}
                      >
                        View Code
                      </a>
                    </div>
                  </div>
                </SlideFromEdge>

                {/* Project Visual */}
                <ScaleIn 
                  delay={0.4 + index * 0.1}
                  className={`${isEven ? 'md:order-2' : 'md:order-1'}`}
                >
                  <div className="group relative">
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${project.color} rounded-3xl p-8 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105`}>
                      {/* Background Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tl from-white/15 to-white/5" />
                      
                      {/* Project Icon */}
                      <div className="relative z-10 h-full flex items-center justify-center">
                        <div className="text-8xl sm:text-9xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          {project.image}
                        </div>
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute top-6 right-6 w-4 h-4 bg-white/30 rounded-full animate-ping" />
                      <div className="absolute bottom-6 left-6 w-3 h-3 bg-white/40 rounded-full animate-pulse" />
                      <div className="absolute top-1/4 left-6 w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                    </div>

                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 scale-110`} />
                  </div>
                </ScaleIn>
              </div>
            );
          })}
        </div>

        {/* Other Projects Grid */}
        <FadeSlideUp delay={0.2} className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            More Projects
          </h3>
          
          <StaggerContainer 
            staggerDelay={0.15}
            className="grid md:grid-cols-2 gap-8"
          >
            {otherProjects.map((project, index) => (
              <StaggerItem key={project.id}>
                <AnimatedCard delay={index * 0.1} hoverScale={1.03} className="h-full">
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
                          <span className="text-sm font-mono text-gray-400">{project.id}</span>
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeSlideUp>

        {/* Call to Action */}
        <ScaleIn delay={0.6}>
          <div className="text-center">
            <div className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-3xl text-white relative overflow-hidden">
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/8 to-white/2" />
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  {projects.cta.title}
                </h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  {projects.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {projects.cta.buttons.map((button, index) => (
                    <button
                      key={index}
                      onClick={button.action ? buttonActions[button.action] : () => {}}
                      className={`px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 ${
                        button.type === 'primary'
                          ? 'bg-white text-gray-900 hover:bg-gray-100'
                          : 'border-2 border-white/30 text-white hover:bg-white/10'
                      }`}
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
