import { 
  StaggerContainer, 
  StaggerItem, 
  SectionHeader,
  SlideFromEdge
} from './ScrollAnimations';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechStart Inc.',
      rating: 5,
      content: 'Alex delivered an exceptional full-stack application that exceeded our expectations. His attention to detail and proactive communication made the entire process smooth and enjoyable.',
      avatar: '👩‍💼',
      projectType: 'Full-Stack Web App'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      company: 'Digital Solutions Co.',
      rating: 5,
      content: 'Working with Alex was a game-changer for our startup. He built a scalable architecture that handled our rapid growth seamlessly. Highly recommend for any serious development work.',
      avatar: '👨‍💻',
      projectType: 'Backend API & Database'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      company: 'Creative Agency',
      rating: 5,
      content: 'Alex transformed our outdated website into a modern, responsive platform that tripled our conversion rate. His React expertise and design sense are top-notch.',
      avatar: '👩‍🎨',
      projectType: 'React Website Redesign'
    },
    {
      name: 'David Thompson',
      role: 'Business Owner',
      company: 'Local Restaurant Chain',
      rating: 5,
      content: 'The mobile app Alex built for our restaurant helped us stay competitive during tough times. The ordering system is intuitive and our customers love it.',
      avatar: '👨‍🍳',
      projectType: 'React Native Mobile App'
    },
    {
      name: 'Lisa Wang',
      role: 'Operations Manager',
      company: 'E-commerce Platform',
      rating: 5,
      content: 'Alex optimized our application performance and reduced load times by 60%. His expertise in both frontend and backend technologies is truly impressive.',
      avatar: '👩‍💼',
      projectType: 'Performance Optimization'
    },
    {
      name: 'James Miller',
      role: 'Startup Founder',
      company: 'FinTech Startup',
      rating: 5,
      content: 'From MVP to production, Alex guided us through every step. His technical leadership and mentorship were invaluable. We couldn\'t have launched without him.',
      avatar: '👨‍💼',
      projectType: 'Full Product Development'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-l from-gray-100/25 to-blue-50/25 dark:from-gray-700/25 dark:to-blue-900/25" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          title={
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              What Clients Say About Me
            </span>
          }
          subtitle="Real feedback from clients who trusted me with their projects. Every testimonial represents a successful collaboration and lasting partnership."
          className="mb-16"
        />

        {/* Testimonials Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <div className="card-hover h-full bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group relative overflow-hidden flex flex-col min-h-[320px]">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Top Section */}
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="text-3xl flex-shrink-0">
                          {testimonial.avatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 truncate">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {testimonial.role}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      
                      {/* Project Type Badge */}
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium flex-shrink-0 ml-2">
                        {testimonial.projectType}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {renderStars(testimonial.rating)}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {testimonial.rating}.0
                      </span>
                    </div>

                    {/* Content */}
                    <blockquote className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed break-words">
                      "{testimonial.content}"
                    </blockquote>
                  </div>

                  {/* Decorative Quote */}
                  <div className="absolute top-4 right-4 text-blue-200 dark:text-blue-800 text-4xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none">
                    "
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stats Section */}
        <SlideFromEdge direction="up" delay={0.6} className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '100%', label: 'Client Satisfaction', icon: '⭐' },
              { number: '50+', label: 'Projects Delivered', icon: '🚀' },
              { number: '4.9/5', label: 'Average Rating', icon: '🏆' },
              { number: '95%', label: 'Repeat Clients', icon: '🤝' }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-2xl mb-2 group-hover:animate-bounce">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </SlideFromEdge>

        {/* CTA Section */}
        <SlideFromEdge direction="up" delay={0.8} className="text-center mt-16">
          <div className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to Be My Next Success Story?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join the growing list of satisfied clients who trust me with their most important projects. 
                Let's create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  Start Your Project
                </a>
                <a
                  href="#projects"
                  className="px-8 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300"
                >
                  View Case Studies
                </a>
              </div>
            </div>
          </div>
        </SlideFromEdge>
      </div>
    </section>
  );
} 