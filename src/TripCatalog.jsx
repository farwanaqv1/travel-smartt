import React, { useState } from "react";
import data from "./trips.json";
import { motion } from "framer-motion";
import "./TripCatalog.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

function TripCatalog() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("none");

  const { banner, landmarks, trips } = data; // added landmarks

  const filteredTrips = trips.filter(
    (trip) => filter === "all" || trip.category.toLowerCase() === filter
  );

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sort === "priceLow") return a.price - b.price;
    if (sort === "priceHigh") return b.price - a.price;
    if (sort === "popularity") return b.rating - a.rating;
    return 0;
  });

  return (

    <div className="my -container">
        
        <Navbar/>
      {/* Banner Video Section */}
      <section className="myTripCatalog-video-section">
        <video
          className="myTripCatalog-video"
          src={banner.video}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="myTripCatalog-video-overlay">
          <h1>{banner.title}</h1>
          <p>{banner.subtitle}</p>
          <button className="myTripCatalog-banner-btn">Discover More</button>
        </div>
      </section>

      {/* New Iconic Landmarks Section */}
      <section className="myTripCatalog-landmarks">
        <h2 className="myTripCatalog-landmarks-title">Iconic Landmarks</h2>
        <div className="myTripCatalog-landmarks-grid">
          {landmarks.map((landmark, index) => (
            <motion.div
              key={index}
              className="myTripCatalog-landmark-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={landmark.image}
                alt={landmark.title}
                className="myTripCatalog-landmark-img"
              />
              <h3>{landmark.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <h1 className="myTripCatalog-header">Our Travel Destinations</h1>

      {/* Filters */}
      <div className="myTripCatalog-filters">
        <select
          className="myTripCatalog-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="romantic">Romantic</option>
          <option value="adventure">Adventure</option>
          <option value="culinary">Culinary</option>
          <option value="cultural">Cultural</option>
          <option value="relaxation">Relaxation</option>
          <option value="roadtrip">Roadtrip</option>
          <option value="nature">Nature</option>
        </select>

        <select
          className="myTripCatalog-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="none">Sort By</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      {/* Trip Grid */}
      <div className="myTripCatalog-grid">
        {sortedTrips.map((trip) => (
          <motion.div
            className="myTripCatalog-card"
            key={trip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={trip.image}
              alt={trip.title}
              className="myTripCatalog-image"
            />
            <div className="myTripCatalog-card-content">
              <h3 className="myTripCatalog-card-title">{trip.title}</h3>
              <p className="myTripCatalog-card-desc">
                {trip.location} — {trip.duration}
              </p>
              <div className="myTripCatalog-card-footer">
                <span className="myTripCatalog-price">${trip.price}</span>
                <button className="myTripCatalog-button">Book Now</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="tripcatalog-next-section">
  <div className="tripcatalog-next-container">
    {/* Left Content */}
    <div className="tripcatalog-next-text">
      <p className="tripcatalog-next-smalltitle">{data.nextAdventureSection.smallTitle}</p>
      <h2 className="tripcatalog-next-title">{data.nextAdventureSection.mainTitle}</h2>
      <p className="tripcatalog-next-description">{data.nextAdventureSection.description}</p>

      {/* Progress Bars */}
      <div className="tripcatalog-next-progressbars">
        {data.nextAdventureSection.progressBars.map((bar, index) => (
          <div key={index} className="tripcatalog-progress-item">
            <div className="tripcatalog-progress-label">{bar.label}</div>
            <div className="tripcatalog-progress-track">
              <div
                className="tripcatalog-progress-fill"
                style={{ width: `${bar.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <a href="#" className="tripcatalog-next-button">
        {data.nextAdventureSection.buttonText}
      </a>
    </div>

    {/* Right Image */}
    <div className="tripcatalog-next-image-wrapper">
      <img
        src={data.nextAdventureSection.image}
        alt={data.nextAdventureSection.mainTitle}
        className="tripcatalog-next-image"
      />
    </div>
  </div>
</section>

{/* Stats Section */}
{data.statsSection && (
  <section className="tripcatalog-stats-section">
    <div className="tripcatalog-stats-container">
      {data.statsSection.stats.map((stat, index) => (
        <div key={index} className="tripcatalog-stat-item">
          <h3>{stat.number}</h3>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
)}

{/* Promo Section */}
{data.promoSection && (
  <section className="tripcatalog-promo-section">
    <div className="tripcatalog-promo-content">
      <div className="tripcatalog-promo-text">
        <h2>{data.promoSection.title}</h2>
        <h3>{data.promoSection.subtitle}</h3>
        <p>{data.promoSection.description}</p>
        <button>{data.promoSection.buttonText}</button>
      </div>
      <div className="tripcatalog-promo-images">
        <img
          src={data.promoSection.mainImage}
          alt="Main Promo"
          className="tripcatalog-promo-main"
        />
        <img
          src={data.promoSection.overlayImage}
          alt="Overlay Promo"
          className="tripcatalog-promo-overlay"
        />
      </div>
    </div>
  </section>
)}

<Footer/>
    </div>

    

    
  );
}

export default TripCatalog;