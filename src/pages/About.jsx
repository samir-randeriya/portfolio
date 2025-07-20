import { 
  FadeSlideUp, 
  SlideFromEdge, 
  StaggerContainer, 
  StaggerItem, 
  AnimatedProgressBar,
  SectionHeader,
  ScaleIn
} from '../components/ScrollAnimations';
import portfolioData from '../data/portfolioContent.json';

export default function About() {
  // Get data from portfolioContent.json
  const { about, personal } = portfolioData;

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-blue-50/30 dark:from-gray-800/30 dark:to-blue-900/30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          title={
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {about.title}
            </span>
          }
          subtitle={about.subtitle}
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Personal Story */}
          <SlideFromEdge direction="left" delay={0.2}>
            <div className="space-y-6">
              <div className="text-left">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {personal.bio.split('**').map((part, index) => 
                    index % 2 === 0 ? part : (
                      <strong key={index}>{part}</strong>
                    )
                  )}
                </p>
              </div>

              {/* Personal Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {about.personalStats.map((stat, index) => (
                  <StaggerItem key={index} delay={index * 0.1}>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </div>
          </SlideFromEdge>

          {/* Skills and Progress */}
          <SlideFromEdge direction="right" delay={0.4}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Technical Expertise
                </h3>
                <div className="space-y-6">
                  {about.skills.map((skill, index) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {skill.percentage}%
                        </span>
                      </div>
                      <AnimatedProgressBar 
                        percentage={skill.percentage} 
                        color={skill.color}
                        delay={index * 0.1}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Resume Button */}
              <div className="pt-6">
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download My Resume
                </a>
              </div>
            </div>
          </SlideFromEdge>
        </div>

        {/* Personal Qualities */}
        <div className="mt-20">
          <ScaleIn delay={0.6}>
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                What Makes Me Different
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Beyond technical skills, here are the qualities that I bring to every project and team.
              </p>
            </div>
          </ScaleIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.qualities.map((quality, index) => (
              <StaggerItem key={index}>
                <div className="card-hover p-6 bg-white dark:bg-gray-800 rounded-2xl text-center group border border-gray-100 dark:border-gray-700">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {quality.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    {quality.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {quality.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Call to Action */}
        <ScaleIn delay={0.8} className="text-center mt-16">
          <div className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white relative overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                {about.cta.title}
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                {about.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {about.cta.buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.href}
                    className={`px-8 py-3 rounded-xl font-semibold transition-colors duration-300 ${
                      button.type === 'primary'
                        ? 'bg-white text-blue-600 hover:bg-gray-100'
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
