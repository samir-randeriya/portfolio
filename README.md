# Samir Randeriya - Portfolio Website

A modern, responsive portfolio website showcasing my work as a Senior Lead Software Engineer. Built with React.js, Tailwind CSS, and modern web technologies.

## 🚀 Live Demo

[View Live Portfolio](https://your-portfolio-url.com)

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices and screen sizes
- **Dark Mode**: Toggle between light and dark themes
- **Performance Optimized**: Fast loading times and smooth interactions
- **SEO Friendly**: Optimized for search engines
- **Accessible**: WCAG compliant for better accessibility
- **Interactive**: Smooth scroll animations and engaging user experience

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

### Deployment
- **Netlify/Vercel** - Hosting platform
- **GitHub Actions** - CI/CD pipeline

## 📁 Project Structure

```
portfolio-website/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── DarkModeToggle.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ScrollAnimations.jsx
│   │   ├── SocialSidebar.jsx
│   │   ├── StatsCounter.jsx
│   │   └── Testimonials.jsx
│   ├── data/
│   │   └── portfolioContent.json
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── Reviews.jsx
│   │   └── Skills.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── index.js
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/samir-randeriya/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🎨 Customization

### Updating Content

All content is stored in `src/data/portfolioContent.json`. You can easily update:

- Personal information
- Skills and technologies
- Project details
- Experience and education
- Contact information

### Styling

The project uses Tailwind CSS for styling. You can customize:

- Colors in `tailwind.config.js`
- Global styles in `src/index.css`
- Component-specific styles in individual files

### Adding New Sections

1. Create a new component in `src/components/`
2. Add the component to `src/App.jsx`
3. Update navigation in `portfolioContent.json`

## 📱 Responsive Design

The website is fully responsive with breakpoints for:

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🌙 Dark Mode

The website includes a dark mode toggle that:

- Persists user preference
- Smoothly transitions between themes
- Maintains accessibility standards

## ⚡ Performance

- Optimized images and assets
- Lazy loading for components
- Efficient bundle splitting
- Minimal dependencies

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=Samir Randeriya Portfolio
VITE_APP_DESCRIPTION=Senior Lead Software Engineer Portfolio
```

### Build Configuration

The project uses Vite for building. Configuration can be found in:

- `vite.config.js` - Build configuration
- `tailwind.config.js` - Tailwind CSS configuration

## 🚀 Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### GitHub Pages

1. Add to `package.json`:
   ```json
   {
     "homepage": "https://username.github.io/repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Deploy: `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: sam.randeriya121@gmail.com
- **LinkedIn**: [Samir Randeriya](https://www.linkedin.com/in/samir-randeriya-578a17185/)
- **GitHub**: [@samir-randeriya](https://github.com/samir-randeriya)
- **Twitter**: [@s_randeriya](https://x.com/s_randeriya)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vite](https://vitejs.dev/) - Build tool

---

⭐ If you found this portfolio helpful, please give it a star!
