import portfolioData from '../data/portfolioContent.json';

export default function Education() {
  // Get data from portfolioContent.json
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 px-4" data-aos="fade-up">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            {education.title}
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {education.subtitle}
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-12 mb-16">
          {education.education.map((edu, index) => (
            <div 
              key={index}
              className="relative pl-8 md:pl-12"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 w-px h-full bg-blue-200 dark:bg-blue-800"></div>
              
              {/* Timeline Dot */}
              <div className="absolute left-0 top-2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 shadow-lg"></div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ml-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                      {edu.period}
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      GPA: {edu.gpa}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-600 dark:text-gray-300 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Relevant Coursework</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div data-aos="fade-up" data-aos-delay="600">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Certifications
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {education.certifications.map((cert, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
                data-aos="flip-up"
                data-aos-delay={index * 100}
              >
                <div className="text-3xl mb-3">🏆</div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">{cert.name}</h4>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">{cert.issuer}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
  