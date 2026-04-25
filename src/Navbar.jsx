import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  const navLinks = [
    { name: 'Home', to: '/', isRouterLink: true },
    { name: 'Destination', to: '/Destination', isRouterLink: true },
    { name: 'Trips Catalog', to: '/TripCatalog', isRouterLink: true },
    { name: 'About Us', to: '/about', isRouterLink: true },
    { name: 'Contact', to: '/contact', isRouterLink: true },
    { name: 'Feedback', to: '/Feedback', isRouterLink: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'FR' : 'EN');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
       
        <RouterLink to="/" className="logo">
          <img 
            src="logo.png" 
            alt="Travel Smart Logo" 
            className="logo-img"
          />          
          <h5>TravelSmart</h5>
        </RouterLink>
      
        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            link.isRouterLink ? (
              <RouterLink
                key={link.to}
                to={link.to}
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </RouterLink>
            ) : (
              <ScrollLink
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                duration={500}
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </ScrollLink>
            )
          ))}
          <div className="mobile-actions">
            <button className="language-btn" onClick={toggleLanguage}>
              {language}
              <span className="language-arrow">▼</span>
            </button>
            <RouterLink to="/book" className="cta-btn">
              <span className="btn-icon">✈</span> Book Now
            </RouterLink>
          </div>
        </div>

        <div className="desktop-actions">
          <button className="language-btn" onClick={toggleLanguage}>
            {language}
            <span className="language-arrow">▼</span>
          </button>
         
          <RouterLink to="/BookASession" className="cta-btn">
            <span className="btn-icon">✈</span> Book Now
          </RouterLink>
        </div>

        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;