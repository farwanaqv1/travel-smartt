import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSlider from './HeroSlider';
import './Home.css';
import Navbar from './Navbar';
import data from './Data.json';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  const [email, setEmail] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { featuredDestinations, travelDeals, testimonials } = data;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial(prev => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial(prev => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentTestimonial]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
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

  const cardHover = {
    scale: 1.03,
    y: -10,
    transition: { duration: 0.3 }
  };

  const testimonialVariants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  return (
    <motion.div 
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar/>
      <HeroSlider />

      {/* Featured Destinations */}
      <section className="featured-destinations">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span role="img" aria-label="globe">🌍</span> Popular Destinations
          </motion.h2>
          <motion.p 
            className="section-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover the most loved travel spots hand-picked by our experts. Whether you want beaches, mountains, or cultural wonders — we've got it all.
          </motion.p>
          
          <motion.div 
            className="destination-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {featuredDestinations.map(destination => (
              <motion.div 
                key={destination.id} 
                className="destination-card"
                variants={itemVariants}
                whileHover={cardHover}
              >
                <div 
                  className="card-image" 
                  style={{ backgroundImage: `url(${destination.image})` }}
                >
                  <div className="card-content">
                    <h3>{destination.name}</h3>
                    <p>{destination.description}</p>
                    <Link className="explore-btn" to={`/detail?id=${destination.id}`}>
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="view-more-container">
            <motion.a 
              href="/destinations" 
              className="view-more-btn"
              whileHover={{ 
                y: -3,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              View More Destinations
            </motion.a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            💡 Why Travel Smart?
          </motion.h2>
          <motion.div 
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="feature card1"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="feature-icon">💰</div>
              <h3>Best Price Guarantee</h3>
              <p>Exclusive deals you won't find anywhere else.</p>
            </motion.div>
            <motion.div 
              className="feature card2"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="feature-icon">👥</div>
              <h3>Trusted by Thousands</h3>
              <p>Our travelers love and trust us.</p>
            </motion.div>
            <motion.div 
              className="feature card3"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="feature-icon">🛎️</div>
              <h3>24/7 Support</h3>
              <p>We're here whenever you need us.</p>
            </motion.div>
            <motion.div 
              className="feature card4"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="feature-icon">🔄</div>
              <h3>Flexible Booking</h3>
              <p>Easy changes and cancellations.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Top Deals */}
      <section className="top-deals">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span role="img" aria-label="fire">🔥</span> Hot Travel Deals
          </motion.h2>
          <motion.p 
            className="section-intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Grab the latest offers before they're gone! Limited-time discounts on top-rated trips.
          </motion.p>
          
          <motion.div 
            className="deals-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {travelDeals.map(deal => (
              <motion.div 
                key={deal.id} 
                className="deal-card"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow: "0 15px 30px rgba(149, 180, 106, 0.2)"
                }}
              >
                <h3>{deal.title}</h3>
                <p className="discount">{deal.discount}</p>
                <p className="price">{deal.price}</p>
                <motion.button 
                  className="book-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="testimonials-slider">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span role="img" aria-label="speech bubble">💬</span> Feedbacks From Our Satisfied Adventurers
          </motion.h2>
          <motion.p 
            className="subheading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Whether it's scaling the towering peaks of the Himalayas, conquering the challenging 
            trails of the Rocky Mountains, or exploring the breathtaking landscapes of the Alps.
          </motion.p>
          
          <div className="slider-container">
            <motion.button 
              className="slider-arrow left-arrow" 
              onClick={handlePrevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              &#8592;
            </motion.button>
            
            <div className="slider-track">
              <AnimatePresence custom={-1} initial={false}>
                <motion.div
                  key={currentTestimonial}
                  custom={-1}
                  variants={testimonialVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="slider-card active"
                >
                  <div className="rating">★★★★★</div>
                  <motion.div 
                    className="testimonial-image" 
                    style={{ backgroundImage: `url(${testimonials[currentTestimonial].image})` }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  <div className="testimonial-content">
                    <motion.p 
                      className="quote"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      "{testimonials[currentTestimonial].quote}"
                    </motion.p>
                    <motion.p 
                      className="author"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      — {testimonials[currentTestimonial].author}
                    </motion.p>
                    <motion.p 
                      className="location"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {testimonials[currentTestimonial].location}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <motion.button 
              className="slider-arrow right-arrow" 
              onClick={handleNextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              &#8594;
            </motion.button>
          </div>
          
          <motion.div className="slider-dots">
            {testimonials.map((_, index) => (
              <motion.span 
                key={index} 
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Explore? Let's Plan Your Dream Trip!
          </motion.h2>
          <motion.button 
            className="cta-button"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#c0d89a"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </div>
      </section>
      
      <Footer/>
    </motion.div>
  );
};

export default Home;