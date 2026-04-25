import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import './About.css';
import Aboutvedio from '../src/assets/aboutus.mp4';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/About.json');
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        setContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren"
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) return (
    <motion.div 
      className="aboutus-loading"
      variants={loadingVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p variants={itemVariants}>Loading...</motion.p>
    </motion.div>
  );

  if (error) return (
    <motion.div 
      className="aboutus-error"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Error: {error}
    </motion.div>
  );

  if (!content) return (
    <motion.div 
      className="aboutus-error"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      No content found
    </motion.div>
  );

  return (
    <>
      <Navbar />
      
      <motion.div
        className="aboutus-container"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        {/* Hero Section with enhanced animations */}
        <section className="aboutus-hero">
          <motion.div 
            className="aboutus-video-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="aboutus-video-bg"
            >
              <source src={Aboutvedio} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
          
          <motion.div 
            className="aboutus-hero-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.5 }}
          />
          
          <motion.div 
            className="aboutus-hero-content" 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants}>{content.hero.title}</motion.h1>
            <motion.p variants={itemVariants}>{content.hero.subtitle}</motion.p>
            <motion.div
              className="hero-scroll-indicator"
              animate={{
                y: [0, 10, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              ↓
            </motion.div>
          </motion.div>
        </section>

        {/* Who We Are with alternating animations */}
        <section className="aboutus-section">
          <div className="aboutus-section-inner">
            <motion.h2 
              variants={itemVariants}
              viewport={{ once: true, amount: 0.5 }}
            >
              {content.whoWeAre.title}
            </motion.h2>
            
            <motion.div 
              className="aboutus-content-wrapper" 
              variants={staggerContainer}
            >
              <motion.div 
                className="aboutus-text" 
                variants={slideInFromLeft}
                viewport={{ once: true, amount: 0.5 }}
              >
                <p>{content.whoWeAre.description}</p>
              </motion.div>
              
              <motion.div 
                className="aboutus-image" 
                variants={slideInFromRight}
                viewport={{ once: true, amount: 0.5 }}
                whileHover="hover"
              >
                <img src={content.whoWeAre.image} alt={content.whoWeAre.title} />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Our Mission with parallax effect */}
        <motion.section 
          className="aboutus-section aboutus-alt-bg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="aboutus-section-inner">
            <motion.h2 
              variants={itemVariants}
              viewport={{ once: true, amount: 0.5 }}
            >
              {content.ourMission.title}
            </motion.h2>
            
            <motion.div 
              className="aboutus-content-wrapper"
              variants={staggerContainer}
            >
              <motion.div 
                className="aboutus-text" 
                variants={slideInFromRight}
                viewport={{ once: true, amount: 0.5 }}
              >
                <p>{content.ourMission.description}</p>
              </motion.div>
              
              <motion.div 
                className="aboutus-image" 
                variants={slideInFromLeft}
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <img src={content.ourMission.image} alt={content.ourMission.title} />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* What We Offer with card animations */}
        <section className="aboutus-section">
          <div className="aboutus-section-inner">
            <motion.h2 
              variants={itemVariants}
              viewport={{ once: true, amount: 0.5 }}
            >
              {content.whatWeOffer.title}
            </motion.h2>
            
            <motion.div 
              className="aboutus-offer-grid" 
              variants={staggerContainer}
            >
              {content.whatWeOffer.services.map((service, index) => (
                <motion.div 
                  className="aboutus-offer-card" 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.h3 
                    whileHover={{ color: "#95B46A" }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.title}
                  </motion.h3>
                  <p>{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us with list animations */}
        <section className="aboutus-section aboutus-alt-bg">
          <div className="aboutus-section-inner">
            <motion.h2 
              variants={itemVariants}
              viewport={{ once: true, amount: 0.5 }}
            >
              {content.whyChooseUs.title}
            </motion.h2>
            
            <motion.ul 
              className="aboutus-reasons-list" 
              variants={staggerContainer}
            >
              {content.whyChooseUs.reasons.map((reason, index) => (
                <motion.li 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.strong
                    whileHover={{ color: "#95B46A" }}
                    transition={{ duration: 0.3 }}
                  >
                    {reason.title}:
                  </motion.strong> {reason.description}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* Our Journey with timeline animations */}
        <section className="aboutus-section">
          <div className="aboutus-section-inner">
            <motion.h2 
              variants={itemVariants}
              viewport={{ once: true, amount: 0.5 }}
            >
              {content.ourJourney.title}
            </motion.h2>
            
            <motion.div 
              className="aboutus-timeline" 
              variants={staggerContainer}
            >
              {content.ourJourney.milestones.map((milestone, index) => (
                <motion.div 
                  className="aboutus-milestone" 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.div 
                    className="aboutus-milestone-year"
                    whileHover={{ scale: 1.1 }}
                  >
                    {milestone.year}
                  </motion.div>
                  <div className="aboutus-milestone-content">
                    <h3>{milestone.event}</h3>
                    <p>{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Meet the Team with enhanced card animations */}
        {content.team && (
          <section className="aboutus-section aboutus-alt-bg">
            <div className="aboutus-section-inner">
              <motion.h2 
                variants={itemVariants}
                viewport={{ once: true, amount: 0.5 }}
              >
                {content.team.title}
              </motion.h2>
              
              <motion.div 
                className="aboutus-team-grid" 
                variants={staggerContainer}
              >
                <AnimatePresence>
                  {content.team.members.map((member, index) => (
                    <motion.div 
                      className="aboutus-team-card" 
                      key={index}
                      variants={scaleUpVariants}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                      }}
                      viewport={{ once: true, amount: 0.2 }}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <motion.div 
                        className="aboutus-team-image"
                        whileHover={{ scale: 1.1 }}
                      >
                        <img src={member.image} alt={member.name} />
                      </motion.div>
                      <h3>{member.name}</h3>
                      <p className="aboutus-team-role">{member.role}</p>
                      <p className="aboutus-team-bio">{member.bio}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>
        )}

        {/* Call to Action with attention-grabbing animation */}
        <section className="aboutus-cta">
          <motion.div 
            className="aboutus-cta-content" 
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h2 
              animate={{
                scale: [1, 1.02, 1],
                textShadow: ["0 0 0 rgba(0,0,0,0)", "0 2px 10px rgba(0,0,0,0.1)", "0 0 0 rgba(0,0,0,0)"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {content.cta.title}
            </motion.h2>
            
            <p>{content.cta.subtitle}</p>
            
            <motion.button
              className="aboutus-cta-button"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "#95B46A",
                boxShadow: "0 5px 15px rgba(149, 180, 106, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: ["0 0 0 rgba(149, 180, 106, 0)", "0 0 10px rgba(149, 180, 106, 0.5)", "0 0 0 rgba(149, 180, 106, 0)"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {content.cta.buttonText}
            </motion.button>
          </motion.div>
        </section>
      </motion.div>
      
      <Footer />
    </>
  );
};

export default AboutUs;