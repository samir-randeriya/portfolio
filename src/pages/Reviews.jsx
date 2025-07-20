import portfolioData from '../data/portfolioContent.json';

export default function Reviews() {
  // Get data from portfolioContent.json
  const { reviews } = portfolioData;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ⭐
      </span>
    ));
  };

  const scrollToContact = () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            {reviews.title}
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {reviews.subtitle}
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16" data-aos="fade-up" data-aos-delay="200">
          {reviews.stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.reviews.map((review, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Header */}
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-4">{review.avatar}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 dark:text-white">{review.name}</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{review.role}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{review.company}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">({review.rating}.0)</span>
              </div>

              {/* Feedback */}
              <blockquote className="text-gray-600 dark:text-gray-300 mb-4 italic leading-relaxed">
                "{review.feedback}"
              </blockquote>

              {/* Project Info */}
              <div className="border-t dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-800 dark:text-white font-medium">
                    {review.project}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {review.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="800">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{reviews.cta.title}</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {reviews.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {reviews.cta.buttons.map((button, index) => (
                <button 
                  key={index}
                  onClick={button.action ? (button.action === 'scrollToContact' ? scrollToContact : () => {}) : () => {}}
                  className={`px-8 py-3 rounded-full font-semibold transition-colors duration-200 ${
                    button.type === 'primary'
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'border-2 border-white text-white hover:bg-white hover:text-blue-600'
                  }`}
                >
                  {button.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
