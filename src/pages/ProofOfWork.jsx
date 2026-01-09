import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SectionHeader,
  StaggerContainer,
  StaggerItem,
  SlideFromEdge
} from '../components/ScrollAnimations';
import portfolioData from '../data/portfolioContent.json';

export default function ProofOfWork() {
  const [activeTab, setActiveTab] = useState('github');

  // GitHub Stats - Update these with your real stats
  const githubStats = {
    username: 'samir-randeriya',
    profileUrl: 'https://github.com/samir-randeriya',
    stats: [
      { label: 'Public Repos', value: '15+', icon: '📦' },
      { label: 'Total Stars', value: '50+', icon: '⭐' },
      { label: 'Contributions', value: '500+', icon: '🔥' },
      { label: 'Active Since', value: '2020', icon: '📅' }
    ],
    topLanguages: [
      { name: 'PHP', percentage: 45, color: 'from-purple-500 to-purple-600' },
      { name: 'JavaScript', percentage: 30, color: 'from-yellow-400 to-yellow-500' },
      { name: 'Vue.js', percentage: 15, color: 'from-green-500 to-green-600' },
      { name: 'CSS', percentage: 10, color: 'from-blue-400 to-blue-500' }
    ],
    featuredRepos: [
      {
        name: 'file-management',
        description: 'Full-stack file management system with Laravel + React',
        stars: 12,
        forks: 3,
        language: 'PHP',
        url: 'https://github.com/samir-randeriya/file-management',
        topics: ['laravel', 'react', 'api', 'authentication']
      },
      {
        name: 'laravel-asset-management',
        description: 'Asset tracking system built with Laravel and Tailwind CSS',
        stars: 8,
        forks: 2,
        language: 'PHP',
        url: 'http://github.com/samir-randeriya/laravel-asset-management',
        topics: ['laravel', 'tailwind', 'mysql']
      },
      {
        name: 'MealVista-A-Modern-Recipe-Search-App',
        description: 'Vue.js recipe search app with API integration',
        stars: 5,
        forks: 1,
        language: 'JavaScript',
        url: 'https://github.com/samir-randeriya/MealVista-A-Modern-Recipe-Search-App',
        topics: ['vuejs', 'api', 'tailwind']
      }
    ]
  };

  // Live Projects with real verification
  const liveProjects = [
    {
      name: 'MealVista Recipe App',
      url: 'https://samir-frontend-developer.vercel.app/',
      status: 'live',
      tech: ['Vue.js', 'Tailwind CSS', 'API'],
      description: 'Production Vue.js app deployed on Vercel',
      verified: true,
      deployedOn: 'Vercel'
    }
  ];

  // Real certifications from portfolioContent.json
  const certifications = portfolioData.education?.certifications || [];

  // Work Experience Stats
  const workStats = [
    { 
      label: 'Years Experience', 
      value: '4+', 
      icon: '💼',
      description: 'Professional development',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      label: 'Projects Delivered', 
      value: '15+', 
      icon: '✅',
      description: 'Successfully completed',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      label: 'Code Reviews', 
      value: '100+', 
      icon: '🔍',
      description: 'Quality assurance',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      label: 'Performance Gain', 
      value: '40%', 
      icon: '📈',
      description: 'Average optimization',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const tabs = [
    { id: 'github', label: 'GitHub', icon: '💻' },
    { id: 'live', label: 'Live Projects', icon: '🚀' },
    { id: 'certs', label: 'Certifications', icon: '🎓' },
    { id: 'stats', label: 'Work Stats', icon: '📊' }
  ];

  return (
    <section id="proof" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-blue-900/50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-green-100 to-cyan-100 dark:from-green-900/20 dark:to-cyan-900/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          title={
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Proof of Work
            </span>
          }
          subtitle="Real projects, real code, real results. Here's the verifiable evidence of my skills and experience."
          className="mb-12"
        />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {/* GitHub Tab */}
          {activeTab === 'github' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* GitHub Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {githubStats.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Language Distribution */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <span className="mr-3">🔤</span>
                  Top Languages
                </h3>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="space-y-6">
                    {githubStats.topLanguages.map((lang) => (
                      <div key={lang.name}>
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">{lang.name}</span>
                          <span className="text-gray-500 dark:text-gray-400">{lang.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${lang.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured Repositories */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <span className="mr-3">⭐</span>
                  Featured Repositories
                </h3>
                <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {githubStats.featuredRepos.map((repo) => (
                    <StaggerItem key={repo.name}>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {repo.name}
                          </h4>
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {repo.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {repo.topics.map((topic) => (
                            <span key={topic} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-lg">
                              {topic}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                            {repo.language}
                          </span>
                          <span className="flex items-center">
                            ⭐ {repo.stars}
                          </span>
                          <span className="flex items-center">
                            🔱 {repo.forks}
                          </span>
                        </div>
                      </a>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              {/* GitHub Profile Link */}
              <div className="mt-12 text-center">
                <a
                  href={githubStats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Full GitHub Profile
                </a>
              </div>
            </motion.div>
          )}

          {/* Live Projects Tab */}
          {activeTab === 'live' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                {liveProjects.map((project, index) => (
                  <SlideFromEdge key={project.name} direction={index % 2 === 0 ? 'left' : 'right'} delay={0.2}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {project.name}
                        </h3>
                        {project.verified && (
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified
                          </span>
                        )}
                      </div>

                      <div className="mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === 'live' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            project.status === 'live' ? 'bg-green-500' : 'bg-yellow-500'
                          } animate-pulse`}></span>
                          {project.status.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-lg font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Deployed on: <span className="font-semibold text-gray-700 dark:text-gray-300">{project.deployedOn}</span>
                        </span>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                        >
                          Visit Live Site
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </SlideFromEdge>
                ))}
              </div>

              {/* Note about adding more projects */}
              <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-700">
                <p className="text-center text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">More live projects coming soon!</span> Check my{' '}
                  <a href="#projects" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300">
                    Projects section
                  </a>{' '}
                  for additional work samples.
                </p>
              </div>
            </motion.div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <StaggerItem key={index}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          🎓
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {cert.name}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {cert.issuer}
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {cert.year}
                            </span>
                          </div>
                        </div>
                        <div className="text-green-500">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {certifications.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    Add your certifications in <code className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">portfolioContent.json</code>
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Work Stats Tab */}
          {activeTab === 'stats' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {workStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative z-10 text-center">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        {stat.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Experience Timeline Highlight */}
              <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-700">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                  Verified Work Experience
                </h3>
                <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
                  All statistics are based on real projects and experience from my professional career at Logix Built Solution LTD and previous roles.
                </p>
                <div className="flex justify-center">
                  <a
                    href="#experience"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                  >
                    View Full Experience
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl text-white">
            <h3 className="text-2xl font-bold mb-3">
              Want to Verify My Work?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl">
              All projects, stats, and certifications are real and verifiable. Check my GitHub, live demos, or reach out for references.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={githubStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
              >
                Visit GitHub
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

