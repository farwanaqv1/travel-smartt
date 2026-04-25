import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BookASession.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from './Navbar';
import Footer from './Footer';
import BgVideo from './assets/travel-road.mp4';

const BookASession = () => {
  const [price, setPrice] = useState(8000);
  const [startDate, setStartDate] = useState(null);
  const [destination, setDestination] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    duration: '',
    rating: '',
    amenities: []
  });

  const popularDestinations = [
    "Paris, France",
    "Bali, Indonesia",
    "Tokyo, Japan",
    "New York, USA",
    "Rome, Italy"
  ];

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleBooking = () => {
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 5000);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const scaleUp = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  if (showThankYou) {
    return (
      <div className="thank-you-3d">
        <Navbar />
        <motion.div 
          className="thank-you-content"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={scaleUp}
        >
          <h2>Thank you for trusting us!</h2>
          <p>We will be the best guides for your journey.</p>
          <motion.button 
            className="bookasession-button"
            onClick={() => setShowThankYou(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Booking
          </motion.button>
        </motion.div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="bookasession-container">
        <video autoPlay loop muted playsInline className="bookasession-video">
          <source src={BgVideo} type="video/mp4" />
        </video>

        <motion.div 
          className="bookasession-form"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.h1 
            className="bookasession-title"
            variants={slideUp}
          >
            OUR PACKAGES
          </motion.h1>
          <motion.h2 
            className="bookasession-subtitle"
            variants={slideUp}
          >
            Find Your Perfect Holiday
          </motion.h2>

          <motion.div 
            className="bookasession-form-row"
            variants={slideUp}
          >
            <div className="bookasession-form-group">
              <label>Destination</label>
              <input 
                type="text" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to?"
                list="destinations"
                className="bookasession-input"
              />
              <datalist id="destinations">
                {popularDestinations.map((place, index) => (
                  <option key={index} value={place} />
                ))}
              </datalist>
            </div>

            <div className="bookasession-form-group">
              <label>Travel Dates</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className="bookasession-input"
              />
            </div>
          </motion.div>

          <motion.div 
            className="bookasession-form-group"
            variants={slideUp}
          >
            <label>Max Price: <span className="bookasession-price">${price}</span></label>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bookasession-slider"
            />
          </motion.div>

          <AnimatePresence>
            {showFilters && (
              <motion.div 
                className="filters-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4>Additional Filters</h4>
                
                <div className="filter-group">
                  <label>Trip Duration</label>
                  <select 
                    value={selectedFilters.duration}
                    onChange={(e) => setSelectedFilters({...selectedFilters, duration: e.target.value})}
                  >
                    <option value="">Any Duration</option>
                    <option value="weekend">Weekend Getaway</option>
                    <option value="7days">7 Days</option>
                    <option value="14days">14 Days</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Minimum Rating</label>
                  <div className="rating-stars">
                    {[5,4,3,2,1].map((star) => (
                      <motion.span 
                        key={star}
                        className={selectedFilters.rating >= star ? "star active" : "star"}
                        onClick={() => setSelectedFilters({...selectedFilters, rating: star})}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                <div className="filter-group">
                  <label>Amenities</label>
                  {['Pool', 'Spa', 'Gym', 'WiFi'].map((item) => (
                    <motion.label 
                      key={item} 
                      className="amenity-checkbox"
                      whileHover={{ scale: 1.05 }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.amenities.includes(item)}
                        onChange={() => {
                          const updated = selectedFilters.amenities.includes(item)
                            ? selectedFilters.amenities.filter(a => a !== item)
                            : [...selectedFilters.amenities, item];
                          setSelectedFilters({...selectedFilters, amenities: updated});
                        }}
                      />
                      {item}
                    </motion.label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            className="bookasession-button-group"
            variants={slideUp}
          >
            <motion.button 
              className="bookasession-secondary-button"
              onClick={toggleFilters}
              whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
              whileTap={{ scale: 0.95 }}
            >
              {showFilters ? 'HIDE FILTERS' : 'MORE FILTERS'}
            </motion.button>
            <motion.button 
              className="bookasession-primary-button" 
              onClick={handleBooking}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              BOOK NOW
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </>
  );
};

export default BookASession;