// Destinations.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Destination.css';
import destinationsData from './Destination.json';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';


const Destination = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    continent: '',
    priceRange: '',
    bestSeason: '',
    activities: ''
  });
  const [sortOption, setSortOption] = useState('popularity');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialInterval = useRef(null);

  useEffect(() => {
    setDestinations(destinationsData.destinations);
    setFilteredDestinations(destinationsData.destinations);
  }, []);

  useEffect(() => {
    let results = [...destinations];
    
    if (searchTerm) {
      results = results.filter(destination => 
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.continent.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.continent) {
      results = results.filter(destination => 
        destination.continent === filters.continent
      );
    }

    if (filters.priceRange) {
      results = results.filter(destination => 
        destination.priceRange === filters.priceRange
      );
    }

    if (filters.bestSeason) {
      results = results.filter(destination => 
        destination.bestSeason.includes(filters.bestSeason)
      );
    }

    if (filters.activities) {
      results = results.filter(destination => 
        destination.activities.includes(filters.activities)
      );
    }

    switch(sortOption) {
      case 'price-low':
        results.sort((a, b) => a.priceRange.length - b.priceRange.length);
        break;
      case 'price-high':
        results.sort((a, b) => b.priceRange.length - a.priceRange.length);
        break;
      case 'newest':
        results.sort((a, b) => b.id - a.id);
        break;
      case 'popularity':
      default:
        results.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    }

    setFilteredDestinations(results);
  }, [searchTerm, filters, sortOption, destinations]);

  useEffect(() => {
    testimonialInterval.current = setInterval(() => {
      setActiveTestimonial(prev => 
        (prev + 1) % destinationsData.testimonials.length
      );
    }, 5000);

    return () => clearInterval(testimonialInterval.current);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value === prev[filterType] ? '' : value
    }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      continent: '',
      priceRange: '',
      bestSeason: '',
      activities: ''
    });
    setSortOption('popularity');
  };

  const spotlightDestination = destinations.find(
    d => d.id === destinationsData.spotlight.id
  );

  return (
    <div className="destinations-page">
      <Navbar/>
      {/* Hero Section */}
      <section className="destinations-hero">
        <div className="destinations-hero-content">
          <h1 className="destinations-hero-title">Discover the World's Most Iconic Destinations</h1>
          <p className="destinations-hero-subtitle">Find your perfect getaway with our curated collection of breathtaking locations</p>
        </div>
        <div className="destinations-hero-airplane"></div>
      </section>

      {/* Search & Filter Section */}
      <section className="destinations-search-filter">
        <div className="destinations-search-container">
          <input
            type="text"
            placeholder="Search by city, country, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="destinations-search-input"
          />
          <button 
            className="destinations-mobile-filter-toggle"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            {isMobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className={`destinations-filters-container ${isMobileFiltersOpen ? 'destinations-filters-open' : ''}`}>
          {/* Continent Filter - Updated to use allContinents */}
          <div className="destinations-filter-group">
            <h3 className="destinations-filter-title">Continent</h3>
            <div className="destinations-filter-options">
              {destinationsData.allContinents.map(continent => (
                <button
                  key={continent.name}
                  className={`destinations-filter-option ${filters.continent === continent.name ? 'destinations-filter-active' : ''}`}
                  onClick={() => handleFilterChange('continent', continent.name)}
                >
                  {continent.name}
                </button>
              ))}
            </div>
          </div>

          {/* Other filters remain the same */}
          <div className="destinations-filter-group">
            <h3 className="destinations-filter-title">Price Range</h3>
            <div className="destinations-filter-options">
              {['$', '$$', '$$$', '$$$$'].map(range => (
                <button
                  key={range}
                  className={`destinations-filter-option ${filters.priceRange === range ? 'destinations-filter-active' : ''}`}
                  onClick={() => handleFilterChange('priceRange', range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="destinations-filter-group">
            <h3 className="destinations-filter-title">Best Season</h3>
            <div className="destinations-filter-options">
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                <button
                  key={month}
                  className={`destinations-filter-option ${filters.bestSeason === month ? 'destinations-filter-active' : ''}`}
                  onClick={() => handleFilterChange('bestSeason', month)}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          <div className="destinations-filter-group">
            <h3 className="destinations-filter-title">Activities</h3>
            <div className="destinations-filter-options">
              {['Adventure', 'Beach', 'Cultural', 'Historical', 'Nature', 'Romantic', 'Urban', 'Wildlife', 'Winter Sports'].map(activity => (
                <button
                  key={activity}
                  className={`destinations-filter-option ${filters.activities === activity ? 'destinations-filter-active' : ''}`}
                  onClick={() => handleFilterChange('activities', activity)}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          <div className="destinations-filter-group">
            <h3 className="destinations-filter-title">Sort By</h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="destinations-sort-select"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price Low→High</option>
              <option value="price-high">Price High→Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <button 
            className="destinations-reset-filters"
            onClick={resetFilters}
          >
            Reset All Filters
          </button>
        </div>
      </section>

      {/* Featured Destinations Grid */}
      <section className="destinations-featured">
        <h2 className="destinations-section-title">
          <span className="destinations-section-title-icon">✨</span> Popular Picks
        </h2>
        <div className="destinations-grid">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map(destination => (
              <div key={destination.id} className="destinations-card">
                <div className="destinations-card-image-container">
                  <img 
                    src={destination.image} 
                    alt={destination.alt} 
                    className="destinations-card-image"
                    loading="lazy"
                  />
                  {destination.badges.length > 0 && (
                    <div className="destinations-card-badges">
                      {destination.badges.map(badge => (
                        <span key={badge} className={`destinations-card-badge destinations-badge-${badge.toLowerCase().replace(' ', '-')}`}>
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="destinations-card-content">
                  <h3 className="destinations-card-title">{destination.name}</h3>
                  <p className="destinations-card-description">{destination.description}</p>
                  <div className="destinations-card-meta">
                    <span className="destinations-card-continent">{destination.continent}</span>
                    <span className="destinations-card-price">{destination.priceRange}</span>
                  </div>
                  <div className="destinations-card-rating">
                    {'★'.repeat(Math.floor(destination.rating))}
                    {'☆'.repeat(5 - Math.floor(destination.rating))}
                    <span className="destinations-card-reviews">({destination.reviews})</span>
                  </div>
                  <button className="destinations-card-button">View Details</button>
                </div>
              </div>
            ))
          ) : (
            <div className="destinations-no-results">
              <p>No destinations match your search criteria.</p>
              <button onClick={resetFilters}>Reset Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* Explore by Continent - Updated to use continents with Unsplash images */}
      <section className="destinations-continents">
        <h2 className="destinations-section-title">Explore by Continent</h2>
        <div className="destinations-continents-grid">
          {destinationsData.continents.map(continent => (
            <div 
              key={continent.name} 
              className="destinations-continent-card"
              onClick={() => handleFilterChange('continent', continent.name)}
            >
              <img 
                src={continent.image} 
                alt={continent.name} 
                className="destinations-continent-image"
                loading="lazy"
              />
              <h3 className="destinations-continent-name">{continent.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Destination Spotlight */}
      {spotlightDestination && (
        <section className="destinations-spotlight">
          <h2 className="destinations-section-title">{destinationsData.spotlight.title}</h2>
          <p className="destinations-spotlight-subtitle">{destinationsData.spotlight.subtitle}</p>
          <div className="destinations-spotlight-card">
            <div className="destinations-spotlight-image-container">
              <img 
                src={spotlightDestination.image} 
                alt={spotlightDestination.alt} 
                className="destinations-spotlight-image"
                loading="lazy"
              />
            </div>
            <div className="destinations-spotlight-content">
              <h3 className="destinations-spotlight-title">{spotlightDestination.name}</h3>
              <p className="destinations-spotlight-description">{spotlightDestination.description}</p>
              
              <div className="destinations-spotlight-details">
                <div className="destinations-spotlight-detail">
                  <h4>Must-Do Activities</h4>
                  <ul className="destinations-spotlight-list">
                    {spotlightDestination.activities.map(activity => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="destinations-spotlight-detail">
                  <h4>Best Season to Visit</h4>
                  <p>{spotlightDestination.bestSeason.join(', ')}</p>
                </div>
                
                <div className="destinations-spotlight-detail">
                  <h4>Top Attractions</h4>
                  <ul className="destinations-spotlight-list">
                    {spotlightDestination.attractions.map(attraction => (
                      <li key={attraction}>{attraction}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <button className="destinations-spotlight-button">Plan Your Trip</button>
            </div>
          </div>
        </section>
      )}

      {/* Travel Inspiration */}
      <section className="destinations-inspiration">
        <h2 className="destinations-section-title">Travel Inspiration</h2>
        <div className="destinations-inspiration-grid">
          {destinationsData.travelInspiration.map(category => (
            <div key={category.id} className="destinations-inspiration-card">
              <img 
                src={category.image} 
                alt={category.title} 
                className="destinations-inspiration-image"
                loading="lazy"
              />
              <div className="destinations-inspiration-overlay">
                <h3 className="destinations-inspiration-title">{category.title}</h3>
                <p className="destinations-inspiration-count">{category.count}+ destinations</p>
                <button className="destinations-inspiration-button">Explore</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Traveler Reviews */}
      <section className="destinations-reviews">
        <h2 className="destinations-section-title">Traveler Reviews</h2>
        <div className="destinations-reviews-carousel">
          {destinationsData.testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`destinations-review ${index === activeTestimonial ? 'destinations-review-active' : ''}`}
            >
              <div className="destinations-review-content">
                <div className="destinations-review-rating">
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
                <p className="destinations-review-text">"{testimonial.comment}"</p>
                <div className="destinations-review-author">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="destinations-review-avatar"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="destinations-review-name">{testimonial.name}</h4>
                    <p className="destinations-review-location">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="destinations-review-dots">
            {destinationsData.testimonials.map((_, index) => (
              <button
                key={index}
                className={`destinations-review-dot ${index === activeTestimonial ? 'destinations-review-dot-active' : ''}`}
                onClick={() => {
                  setActiveTestimonial(index);
                  clearInterval(testimonialInterval.current);
                  testimonialInterval.current = setInterval(() => {
                    setActiveTestimonial(prev => 
                      (prev + 1) % destinationsData.testimonials.length
                    );
                  }, 5000);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="destinations-cta">
        <h2 className="destinations-cta-title">Ready to Pack Your Bags?</h2>
        <p className="destinations-cta-subtitle">Start your journey today with Travel Smart</p>
        <Link to="/BookASession" className="destinations-cta-button">
  Book Your Trip
</Link>
      </section>
      <Footer/>
    </div>
  );
};

export default Destination;