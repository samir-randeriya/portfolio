/**
 * AI Response Engine
 * Portfolio-scoped AI assistant with intelligent out-of-scope handling
 * Response variations to avoid repetition
 * Professional, assistant-style tone
 */

// Initial welcome message
export const getInitialMessages = () => {
  return [
    {
      id: 1,
      text: "Hi! I'm Samir's AI assistant. 👋\n\nI can help you explore his portfolio, including:\n• Technical skills and expertise\n• Work experience and achievements\n• Projects he's built\n• Educational background\n• Contact information\n\nWhat would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ];
};

// Response variations for natural conversation
const responseVariations = {
  skills: [
    {
      text: `Samir is a full-stack developer with **4+ years of professional experience**. Here's his technical expertise:

**Backend Development:**
• PHP & Laravel (Expert level)
• Laravel Nova, RESTful APIs, GraphQL
• Strong focus on scalable architecture

**Frontend Development:**
• React.js, Vue.js, Nuxt.js
• Livewire, Tailwind CSS, TypeScript
• Modern, responsive UI development

**Database & Storage:**
• PostgreSQL, MySQL, MongoDB
• Redis, Firebase
• Performance optimization

**DevOps & Tools:**
• Azure DevOps, GitLab CI/CD, GitHub Actions
• Docker, automated testing
• Security & performance testing

He specializes in Laravel backend systems and has led multiple enterprise projects.

*Want to see what he's built with these skills?*`,
    },
    {
      text: `Here's an overview of Samir's technical capabilities:

With **4+ years** in professional development, he brings deep expertise across the full stack:

**Core Strengths:**
• **Laravel & PHP** - Expert-level backend development
• **Modern JavaScript** - React, Vue, TypeScript
• **Database Design** - SQL and NoSQL solutions
• **Cloud & DevOps** - CI/CD pipelines, Docker, Azure

**What Sets Him Apart:**
• Led teams and mentored junior developers
• Optimized systems for 40% better performance
• Built secure, scalable applications from scratch
• Delivered 5+ high-impact projects on time

His skill set is perfect for building production-ready web applications.

*Curious about his work experience or projects?*`,
    },
  ],

  experience: [
    {
      text: `Samir currently serves as a **Senior Lead Software Engineer** at **Logix Built Solution LTD** (2021 - Present) in Surat, Gujarat.

**Key Achievements:**
• **40% performance boost** through codebase optimization
• **5+ major projects** delivered with 100% on-time completion
• **Mentored 5 developers**, improving their code quality by 30%
• **Scaled systems** to handle 3x user traffic growth

**Career Journey:**
• **SK AI Technologies** - Full Stack Development internship
• **Olcademy** - Web Development internship

He's built strong expertise in leading technical teams and delivering production-grade software.

*Want to explore his educational background or see his projects?*`,
    },
    {
      text: `Let me tell you about Samir's professional journey:

**Current Role:**
Senior Lead Software Engineer at Logix Built Solution LTD (2021-Present)

**Impact & Leadership:**
• Architected solutions resulting in 40% faster performance
• Led cross-functional teams on 5+ major deliverables
• Mentored junior developers with 30% code quality improvement
• Built systems supporting 3x user growth

**Previous Experience:**
He gained valuable hands-on experience through internships at SK AI Technologies and Olcademy, where he honed his full-stack development skills.

**Leadership Style:**
Combines technical excellence with team mentorship and clear communication.

*Interested in learning about his education or projects?*`,
    },
  ],

  projects: [
    {
      text: `Samir has built several impressive production applications. Here are the highlights:

**1. Dynamic File Management System** (January 2025)
• Full-stack with Laravel REST APIs + React frontend
• Secure authentication & real-time search
• Multi-file operations with optimized performance

**2. Asset Management Platform** (August 2024)
• Enterprise-grade Laravel application
• Role-based access control & real-time tracking
• Intuitive admin panel with Tailwind CSS

**3. MealVista – Recipe Search App** (2025)
• Modern Vue.js application
• Third-party API integration
• Deployed on Vercel with optimized performance

**4. E-commerce Platform** (2024)
• Complete online store solution
• Product catalog, cart, secure checkout
• Comprehensive admin dashboard

All projects emphasize **scalability, security, and excellent UX**.

*Want to know more about his technical skills or experience?*`,
    },
    {
      text: `Here's a look at some of Samir's notable work:

He's built **production-ready applications** across different domains, always focusing on quality and user experience.

**Featured Projects:**

**File Management System**
Full-stack solution with secure auth, real-time features, and optimized file handling (Laravel + React)

**Asset Management Platform**
Enterprise solution with role-based access, tracking, and admin controls for organizations

**MealVista Recipe App**
Modern Vue.js application with API integration and responsive design

**E-commerce Platform**
Complete store with catalog, checkout, payments, and admin dashboard

Each project showcases his ability to handle **complex requirements and deliver scalable solutions**.

*Curious about his technical expertise or work experience?*`,
    },
  ],

  contact: [
    {
      text: `Samir is currently **open to new opportunities** — both freelance projects and full-time roles!

**Contact Information:**

📧 **Email:** sam.randeriya121@gmail.com
📱 **Phone:** +91 909 9940 0550
📍 **Location:** Surat, Gujarat, India

**Professional Profiles:**
💼 **LinkedIn:** linkedin.com/in/samir-randeriya-578a17185/
🐙 **GitHub:** github.com/samir-randeriya

**Response Time:** He typically responds within 24 hours and would love to discuss potential collaborations or opportunities.

*Feel free to reach out directly, or ask me more about his work!*`,
    },
  ],

  education: [
    {
      text: `Here's Samir's educational background and continuous learning journey:

**Academic Credentials:**

🎓 **Master of Computer Applications** (2019-2022)
• Dr. Vishwanath Karad MIT World Peace University
• GPA: **9.0/10** ⭐

🎓 **Bachelor of Computer Applications** (2016-2019)
• SDJ International College
• GPA: 7.8/10

**Professional Certifications:**
• Introduction to SQL - Coursera (2020)
• Building Web Applications in PHP - Coursera (2020)
• JavaScript Basic to Advanced - Udemy (2021)
• The Complete ReactJs Course - Udemy (2021)

**Currently Learning:**
• AI/ML Integration
• Web3 Security
• Serverless Architecture
• DevSecOps

He's committed to **continuous learning** and staying ahead of industry trends.

*Want to know about his practical experience or projects?*`,
    },
  ],

  about: [
    {
      text: `Let me tell you about **Samir Randeriya**:

He's a **Senior Lead Software Engineer** with **4+ years** of experience building secure, scalable web applications that businesses depend on.

**His Journey:**
Four years ago, he wrote his first Laravel API endpoint that crashed spectacularly. Today, he architects backend systems that handle thousands of users without breaking a sweat. The difference? He learned that great software isn't just about code—it's about **solving real problems** for real people.

**What He Does:**
Samir helps startups and enterprises ship **production-ready applications faster** — without compromising quality or performance. He specializes in Laravel backend systems and modern full-stack solutions.

**His Philosophy:**
• **Leads by building** - Solves problems alongside the team
• **Obsesses over performance** - Every millisecond matters
• **Builds secure by default** - Security is the foundation
• **Never stops learning** - Tomorrow's code will be better

**Track Record:**
• 15+ major projects delivered
• 20+ technologies mastered
• 100% code passion maintained

*Want to explore his specific skills or see his projects?*`,
    },
  ],
};

// Out-of-scope keywords (topics the assistant cannot help with)
const outOfScopeKeywords = [
  'weather', 'climate', 'temperature', 'forecast',
  'recipe', 'cook', 'food', 'restaurant', 'eat',
  'movie', 'film', 'show', 'netflix',
  'music', 'song', 'album', 'spotify',
  'game', 'gaming', 'play',
  'sport', 'football', 'basketball',
  'news', 'politics', 'election',
  'joke', 'funny', 'laugh',
  'story', 'poem', 'write for me',
  'code for me', 'debug', 'fix my code', 'help me code',
  'calculate', 'math', 'solve', 'equation',
  'translate', 'language',
  'health', 'medical', 'doctor', 'symptom',
  'legal', 'law', 'lawyer',
];

// Portfolio keywords (in-scope topics)
const portfolioKeywords = [
  'samir', 'portfolio', 'developer', 'engineer',
  'skill', 'experience', 'project', 'education',
  'work', 'job', 'tech', 'contact', 'about',
  'resume', 'hire', 'available', 'background',
  'laravel', 'react', 'vue', 'php', 'javascript',
];

// Response definitions
const responses = {
  skills: {
    keywords: ['skill', 'technology', 'tech', 'stack', 'expertise', 'know', 'language', 'framework', 'tool', 'capability'],
    variations: responseVariations.skills,
  },

  experience: {
    keywords: ['experience', 'work', 'job', 'career', 'company', 'role', 'position', 'employment', 'professional'],
    variations: responseVariations.experience,
  },

  projects: {
    keywords: ['project', 'portfolio', 'build', 'built', 'developed', 'created', 'application', 'app', 'work'],
    variations: responseVariations.projects,
  },

  contact: {
    keywords: ['contact', 'reach', 'email', 'phone', 'hire', 'available', 'availability', 'connect', 'message', 'linkedin'],
    variations: responseVariations.contact,
  },

  education: {
    keywords: ['education', 'degree', 'study', 'university', 'college', 'qualification', 'certification', 'learning', 'school'],
    variations: responseVariations.education,
  },

  about: {
    keywords: ['about', 'who', 'background', 'story', 'tell me', 'introduce', 'yourself'],
    variations: responseVariations.about,
  },

  greeting: {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo', 'hola'],
    response: `Hello! 👋 It's great to have you here.

I'm Samir's AI assistant, designed to help you explore his portfolio and professional background.

**I can help you with:**
• His technical skills and expertise
• Work experience and career achievements
• Portfolio projects he's built
• Educational background and certifications
• How to get in touch

What would you like to learn about first?`,
  },

  thanks: {
    keywords: ['thank', 'thanks', 'appreciate', 'helpful', 'great', 'awesome', 'perfect', 'good job', 'well done'],
    response: `You're very welcome! 😊 I'm here to help.

Feel free to ask more questions about Samir's skills, experience, projects, education, or anything else you'd like to know about his work!`,
  },
};

// Track response history to prevent repetition
let responseHistory = {};

// Get varied response
function getVariedResponse(category) {
  const variations = responses[category]?.variations;
  if (!variations || variations.length === 0) return null;

  const lastIndex = responseHistory[category] || -1;
  const nextIndex = (lastIndex + 1) % variations.length;

  responseHistory[category] = nextIndex;
  return variations[nextIndex].text;
}

// Check if message is out of scope
function isOutOfScope(message) {
  const messageLower = message.toLowerCase();

  // First check if it contains portfolio keywords
  const hasPortfolioKeyword = portfolioKeywords.some(kw => messageLower.includes(kw));
  if (hasPortfolioKeyword) return false;

  // Check for out-of-scope keywords
  const hasOutOfScopeKeyword = outOfScopeKeywords.some(kw => messageLower.includes(kw));
  if (hasOutOfScopeKeyword) return true;

  // Very short messages are likely greetings, not out of scope
  if (message.trim().split(' ').length <= 3) return false;

  return false;
}

// Out-of-scope response
const outOfScopeResponse = `I appreciate your question, but I'm specifically designed to help with **Samir's portfolio** exploration! 🎯

I can't assist with that topic, but I'd be happy to answer questions like:

• "What are his technical skills?"
• "What projects has he built?"
• "Tell me about his work experience"
• "What's his educational background?"
• "How can I contact him?"

What would you like to know about Samir's work?`;

// Default fallback
const defaultResponse = `That's an interesting question! Let me help you better understand what I can assist with.

**About Samir:**
• **Technical Skills** - Laravel, React, Vue.js, full-stack development
• **Experience** - 4+ years as Senior Lead Software Engineer
• **Projects** - File Management, Asset Management, E-commerce platforms
• **Education** - Master's in Computer Applications (9.0 GPA)
• **Availability** - Open for new opportunities

What aspect of his portfolio would you like to explore?`;

// Main AI response function
export const getAIResponse = (userMessage) => {
  const messageLower = userMessage.toLowerCase();

  // Check out-of-scope first
  if (isOutOfScope(userMessage)) {
    return outOfScopeResponse;
  }

  // Check for greeting
  if (responses.greeting.keywords.some(kw => messageLower.includes(kw))) {
    return responses.greeting.response;
  }

  // Check for thanks
  if (responses.thanks.keywords.some(kw => messageLower.includes(kw))) {
    return responses.thanks.response;
  }

  // Check each category
  for (const [category, data] of Object.entries(responses)) {
    if (category === 'greeting' || category === 'thanks') continue;

    if (data.keywords && data.keywords.some(kw => messageLower.includes(kw))) {
      const variedResponse = getVariedResponse(category);
      return variedResponse || data.response || defaultResponse;
    }
  }

  // Default fallback
  return defaultResponse;
};

// Reset history (useful for testing or clearing state)
export const resetResponseHistory = () => {
  responseHistory = {};
};

