import { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/travelsmart', icon: '📘' },
    { name: 'Instagram', url: 'https://instagram.com/travelsmart', icon: '📷' },
    { name: 'Twitter', url: 'https://twitter.com/travelsmart', icon: '🐦' },
    { name: 'YouTube', url: 'https://youtube.com/travelsmart', icon: '▶️' }
  ];

  const quickLinks = [
    'Home', 'Destinations', 'Trip Catalog', 'Activities', 
    'About Us', 'Contact Us', 'Feedback'
  ];

  const topDestinations = [
    'Paris, France', 'Bali, Indonesia', 'Santorini, Greece',
    'Swiss Alps, Switzerland', 'Dubai, UAE', 'Kyoto, Japan'
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Brand Section */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon">✈️</span>
            <span className="footer__logo-text">Travel Smart</span>
          </div>
          <p className="footer__tagline">"Your journey, our passion."</p>
          <p className="footer__description">
            Travel Smart is your trusted partner for unforgettable travel experiences. 
            From exotic destinations to personalized trip planning, we make your travel dreams come true.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer__section">
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__links">
            {quickLinks.map((link, index) => (
              <li key={index} className="footer__link-item">
                <a href="#" className="footer__link">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Destinations */}
        <div className="footer__section">
          <h3 className="footer__heading">Top Destinations</h3>
          <ul className="footer__links">
            {topDestinations.map((destination, index) => (
              <li key={index} className="footer__link-item">
                <a href="#" className="footer__link">
                  <span className="footer__destination-icon">📍</span>
                  {destination}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="footer__section">
          <h3 className="footer__heading">Contact Us</h3>
          <address className="footer__contact">
            <p className="footer__contact-item">
              <span className="footer__contact-icon">✉️</span>
              <a href="mailto:support@travelsmart.com">support@travelsmart.com</a>
            </p>
            <p className="footer__contact-item">
              <span className="footer__contact-icon">📞</span>
              +1 (555) 987-6543
            </p>
            <p className="footer__contact-item">
              <span className="footer__contact-icon">🏢</span>
              221B Adventure Street, Wanderlust City, Earth
            </p>
            <p className="footer__contact-item">
              <span className="footer__contact-icon">⏱️</span>
              Mon – Sat, 9 AM – 7 PM
            </p>
          </address>

          <h3 className="footer__heading">Follow Us</h3>
          <div className="footer__social">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label={social.name}
              >
                <span className="footer__social-icon">{social.icon}</span>
                <span className="footer__social-text">{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer__section">
          <h3 className="footer__heading">Newsletter</h3>
          <p className="footer__newsletter-text">
            Subscribe to our newsletter for exclusive travel deals and tips!
          </p>
          <form onSubmit={handleSubmit} className="footer__newsletter">
            <div className="footer__input-group">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer__input"
                required
              />
              <button type="submit" className="footer__button">
                Subscribe
              </button>
            </div>
            {isSubscribed && (
              <p className="footer__success-message">
                Thank you for subscribing! 🎉
              </p>
            )}
          </form>
        </div>
      </div>
 
    </footer>
  );
};

export default Footer;