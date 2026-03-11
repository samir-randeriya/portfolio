import portfolioData from '../data/portfolioContent.json';
import { NAV_ANCHORS } from '../constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Get data from portfolioContent.json
  const { footer } = portfolioData;

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [firstName, ...rest] = footer.brand.name.split(' ');

  return (
    <>
      <style>{`
        .footer-grid-bg {
          background-size: 60px 60px;
        }
      `}</style>

      <footer className="footer-grid-bg text-white py-12 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-blue-400">{firstName}</span>
                {rest.length > 0 && <span className="text-white"> {rest.join(' ')}</span>}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                {footer.brand.description}
              </p>
              <div className="flex space-x-4">
                {footer.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {footer.quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-2 text-gray-300">
                {footer.contactInfo.map((contact, index) => (
                  <p key={index} className="flex items-center">
                    <span className="mr-2">{contact.icon}</span>
                    {contact.value}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} {footer.copyright}
              </p>
              
              <div className="flex space-x-6 text-sm text-gray-400">
                {footer.legalLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href} 
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
                <button
                  onClick={() => scrollToSection(NAV_ANCHORS.HOME)}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Back to Top ↑
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}