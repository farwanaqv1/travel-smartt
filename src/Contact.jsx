import { motion } from 'framer-motion';
import { useState } from 'react';
import './Contact.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaLinkedin 
} from 'react-icons/fa';

// Placeholder image URL for the hero section
const heroImageUrl = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80';

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'General',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'General',
      message: ''
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.03,
      backgroundColor: "#3a5612",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const socialIconHover = {
    hover: {
      scale: 1.2,
      color: "#3a5612",
      y: -3,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <div className="contact">
      <Navbar/>
      <motion.div
        className="contact__container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section with Image */}
        <motion.div 
          className="contact__hero"
          variants={itemVariants}
        >
          <div className="contact__hero-image">
            <img src={heroImageUrl} alt="Travel Smart Team" />
            <div className="contact__hero-overlay"></div>
          </div>
          <motion.div 
            className="contact__hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="contact__hero-title">Get in Touch With Us</h1>
            <p className="contact__hero-subtitle">
              Our team is here to help you plan unforgettable journeys and answer any questions you may have.
            </p>
          </motion.div>
        </motion.div>

        <div className="contact__grid">
          {/* Left Column - Contact Info */}
          <motion.div 
            className="contact__info"
            variants={itemVariants}
          >
            {/* Address */}
            <motion.div 
              className="contact__card"
              variants={itemVariants}
              whileHover="hover"
              animate="visible"
              initial="hidden"
            >
              <div className="contact__card-inner">
                <motion.div 
                  className="contact__icon-container"
                  whileHover={{ rotate: 10 }}
                >
                  <FaMapMarkerAlt className="contact__icon" />
                </motion.div>
                <div>
                  <h3 className="contact__card-title">Address</h3>
                  <p className="contact__card-text">
                    Travel Smart Headquarters<br />
                    12 Aurora Street, Green Valley District<br />
                    London, UK
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Phone Numbers */}
            <motion.div 
              className="contact__card"
              variants={itemVariants}
              whileHover="hover"
              animate="visible"
              initial="hidden"
            >
              <div className="contact__card-inner">
                <motion.div 
                  className="contact__icon-container"
                  whileHover={{ rotate: 10 }}
                >
                  <FaPhone className="contact__icon" />
                </motion.div>
                <div>
                  <h3 className="contact__card-title">Phone Numbers</h3>
                  <p className="contact__card-text">
                    <span className="contact__text-bold">General Inquiries:</span> +92 3322375985
                  </p>
                  <p className="contact__card-text">
                    <span className="contact__text-bold">24/7 Customer Support (WhatsApp):</span> +92 3322375985
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Email Addresses */}
            <motion.div 
              className="contact__card"
              variants={itemVariants}
              whileHover="hover"
              animate="visible"
              initial="hidden"
            >
              <div className="contact__card-inner">
                <motion.div 
                  className="contact__icon-container"
                  whileHover={{ rotate: 10 }}
                >
                  <FaEnvelope className="contact__icon" />
                </motion.div>
                <div>
                  <h3 className="contact__card-title">Email Addresses</h3>
                  <p className="contact__card-text">
                    <span className="contact__text-bold">General Queries:</span> contestazam2025@gmail.com
                  </p>
                  <p className="contact__card-text">
                    <span className="contact__text-bold">Partnerships:</span> partners@travelsmart.com
                  </p>
                  <p className="contact__card-text">
                    <span className="contact__text-bold">Media & PR:</span> press@travelsmart.com
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Working Hours */}
            <motion.div 
              className="contact__card"
              variants={itemVariants}
              whileHover="hover"
              animate="visible"
              initial="hidden"
            >
              <div className="contact__card-inner">
                <motion.div 
                  className="contact__icon-container"
                  whileHover={{ rotate: 10 }}
                >
                  <FaClock className="contact__icon" />
                </motion.div>
                <div>
                  <h3 className="contact__card-title">Working Hours</h3>
                  <p className="contact__card-text">
                    <span className="contact__text-bold">Monday – Friday:</span> 9:00 AM – 6:00 PM (PST)
                  </p>
                  <p className="contact__card-text">
                    <span className="contact__text-bold">Saturday:</span> 10:00 AM – 4:00 PM (PST)
                  </p>
                  <p className="contact__card-text">
                    <span className="contact__text-bold">Sunday & Public Holidays:</span> Closed
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div 
              className="contact__card"
              variants={itemVariants}
              whileHover="hover"
              animate="visible"
              initial="hidden"
            >
              <h3 className="contact__card-title">Connect With Us</h3>
              <div className="contact__social">
                <motion.a 
                  href="https://facebook.com/travelsmart" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact__social-icon"
                  whileHover={{ scale: 1.2, color: "#3a5612", y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaFacebook size={24} />
                </motion.a>
                <motion.a 
                  href="https://instagram.com/travelsmart_official" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact__social-icon"
                  whileHover={{ scale: 1.2, color: "#3a5612", y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaInstagram size={24} />
                </motion.a>
                <motion.a 
                  href="https://twitter.com/travelsmart_travel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact__social-icon"
                  whileHover={{ scale: 1.2, color: "#3a5612", y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaTwitter size={24} />
                </motion.a>
                <motion.a 
                  href="https://youtube.com/TravelSmartOfficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact__social-icon"
                  whileHover={{ scale: 1.2, color: "#3a5612", y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaYoutube size={24} />
                </motion.a>
                <motion.a 
                  href="https://linkedin.com/company/travel-smart-ltd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact__social-icon"
                  whileHover={{ scale: 1.2, color: "#3a5612", y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaLinkedin size={24} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            className="contact__form-container"
            variants={itemVariants}
          >
            <motion.h2 
              className="contact__form-title"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Send Us a Message
            </motion.h2>
            <form onSubmit={handleSubmit} className="contact__form">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="contact__form-label">
                  Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="contact__form-input"
                  whileFocus={{ 
                    boxShadow: "0 0 0 2px rgba(74, 107, 34, 0.5)",
                    borderColor: "#4a6b22"
                  }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="contact__form-label">
                  Email Address
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="contact__form-input"
                  whileFocus={{ 
                    boxShadow: "0 0 0 2px rgba(74, 107, 34, 0.5)",
                    borderColor: "#4a6b22"
                  }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="phone" className="contact__form-label">
                  Phone Number (optional)
                </label>
                <motion.input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="contact__form-input"
                  whileFocus={{ 
                    boxShadow: "0 0 0 2px rgba(74, 107, 34, 0.5)",
                    borderColor: "#4a6b22"
                  }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="inquiryType" className="contact__form-label">
                  Inquiry Type
                </label>
                <motion.select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="contact__form-select"
                  whileFocus={{ 
                    boxShadow: "0 0 0 2px rgba(74, 107, 34, 0.5)",
                    borderColor: "#4a6b22"
                  }}
                >
                  <option value="General">General</option>
                  <option value="Booking">Booking</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Media">Media</option>
                </motion.select>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="contact__form-label">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="contact__form-textarea"
                  whileFocus={{ 
                    boxShadow: "0 0 0 2px rgba(74, 107, 34, 0.5)",
                    borderColor: "#4a6b22"
                  }}
                ></motion.textarea>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="contact__submit-button"
                  whileHover={{ scale: 1.03, backgroundColor: "#3a5612" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          className="contact__map-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="contact__map-title">Visit Our Office</h3>
          <p className="contact__map-caption">
            "Visit our office and let's plan your next trip together!"
          </p>
          <div className="contact__map-container">
            <iframe
              title="Travel Smart Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.680380487932!2d-0.1277583230257566!3d51.50073297181325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce3941eb1f%3A0x1a5342fdf089dd69!2sBig%20Ben!5e0!3m2!1sen!2suk!4v1683123868393!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
      <Footer/>
    </div>
  );
};

export default Contactus;