import { useState, useCallback } from 'react';
import { 
  SlideFromEdge, 
  StaggerContainer, 
  StaggerItem, 
  SectionHeader
} from '../components/ScrollAnimations';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolioContent.json';

// Animation variants - moved outside component to prevent re-creation
const formFieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get data from portfolioContent.json
  const { contact } = portfolioData;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setShowSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  }, []);

  const FloatingLabelInput = ({ label, type = "text", name, value, onChange, required = false, rows = null }) => {
    const Element = rows ? 'textarea' : 'input';

    return (
      <div className="relative group">
        <Element
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          placeholder=" " // Important: single space to make CSS :placeholder-shown work
          className="w-full px-4 pt-6 pb-2 border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-200 peer focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 border-gray-200 dark:border-gray-600"
          style={{ resize: rows ? 'none' : 'auto' }}
        />
        <label className="absolute left-4 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-400 peer-focus:font-medium top-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
          {label} {required && '*'}
        </label>
        
        {/* Focus indicator using CSS peer selector */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full opacity-0 peer-focus:opacity-100 transition-opacity duration-200 animate-pulse"></div>
      </div>
    );
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-bl from-gray-50/25 to-pink-50/25 dark:from-gray-800/25 dark:to-pink-900/25" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

      {/* Success Toast */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-8 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {contact.form.successMessage}
          </div>
        </motion.div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          title={
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {contact.title}
            </span>
          }
          subtitle={contact.subtitle}
          className="mb-16"
        />

        <div className="space-y-8">
          {/* 1. Available for Projects - Top, Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700 rounded-2xl p-8 overflow-hidden group">
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300" />
              
              {/* Pulsing background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-2xl animate-pulse" />
              
              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping animation-delay-500" />
              
              <div className="relative z-10 flex items-center justify-center text-center">
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-4 h-4 bg-green-500 rounded-full mr-4"
                    />
                    <h3 className="text-2xl lg:text-3xl font-bold text-green-800 dark:text-green-300">
                      {contact.availability.status}
                    </h3>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="w-4 h-4 bg-emerald-500 rounded-full ml-4"
                    />
                  </div>
                  <p className="text-lg text-green-700 dark:text-green-400 max-w-3xl mx-auto">
                    {contact.availability.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Contact Information & Send Message Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Contact Information - 8 columns */}
            <div className="col-span-12 lg:col-span-8">
              <SlideFromEdge direction="left" delay={0.3}>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden group h-full hover:shadow-2xl transition-all duration-500">
                  {/* Glassmorphic background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-purple/5 dark:from-gray-700/10 dark:to-purple-900/5" />
                  
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4" />
                      Contact Information
                    </h3>
                    
                    <StaggerContainer staggerDelay={0.1} className="space-y-6">
                      {contact.contactInfo.map((info, index) => (
                        <StaggerItem key={index}>
                          <motion.a
                            href={info.link}
                            target={info.link.startsWith('http') ? '_blank' : '_self'}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                            className="flex items-center p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 group/info hover:shadow-lg hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300"
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Icon with glassmorphic background */}
                            <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center mr-4 group-hover/info:scale-110 transition-transform duration-300`}>
                              <span className="text-xl">{info.icon}</span>
                            </div>
                            
                            <div className="flex-grow">
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 group-hover/info:text-gray-600 dark:group-hover/info:text-gray-300 transition-colors duration-300">
                                {info.label}
                              </div>
                              <div className="font-semibold text-gray-800 dark:text-white group-hover/info:text-blue-600 dark:group-hover/info:text-blue-400 transition-colors duration-300">
                                {info.value}
                              </div>
                            </div>
                            
                            {/* Arrow icon */}
                            <svg className="w-5 h-5 text-gray-400 group-hover/info:text-blue-500 group-hover/info:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </motion.a>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </div>
              </SlideFromEdge>
            </div>

            {/* Send Message Form - 4 columns */}
            <div className="col-span-12 lg:col-span-4">
              <SlideFromEdge direction="right" delay={0.5}>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden group h-full">
                  {/* Blur background with gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                      <div className="w-2 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full mr-3" />
                      {contact.form.title}
                    </h3>
                    
                    <motion.form 
                      onSubmit={handleSubmit} 
                      className="space-y-4"
                      variants={formContainerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {contact.form.fields.map((field, index) => (
                        <motion.div 
                          key={field.name}
                          variants={formFieldVariants}
                          transition={{ delay: 0.1 * (index + 1) }}
                        >
                          <FloatingLabelInput
                            label={field.label}
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            rows={field.rows}
                          />
                        </motion.div>
                      ))}

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group/btn relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        variants={buttonVariants}
                        transition={{ delay: 0.5 }}
                      >
                        {/* Button gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        
                        <span className="relative flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              {contact.form.submittingText}
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 mr-2 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                              {contact.form.submitText}
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.form>
                  </div>
                </div>
              </SlideFromEdge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
