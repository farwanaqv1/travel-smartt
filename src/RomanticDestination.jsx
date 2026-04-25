import React from "react";
import data from "./RomanticDestinationData.json";
import './RomanticDestination.css'
export default function RomanticDestination() {
  return (
    <div className="romanticdestination-container">
      {/* Header */}
      <header className="romanticdestination-header">
        <h1>{data.title}</h1>
        <div className="romanticdestination-meta">
          <span>🌍 {data.category}</span>
          <span>📅 {data.duration}</span>
        </div>
      </header>

      {/* Images */}
      <div className="romanticdestination-images">
        <img
          src={data.mainImage}
          alt={`${data.title} Main`}
          className="romanticdestination-main-image"
        />
        <div className="romanticdestination-side-images">
          {data.sideImages.map((img, index) => (
            <img key={index} src={img} alt={`${data.title} View ${index + 1}`} />
          ))}
        </div>
      </div>

      {/* Description */}
      <section className="romanticdestination-description">
        <h2>{data.descriptionTitle || "A Journey of Love & Discovery"}</h2>
        <p>
          {data.description ||
            `Escape to the serene shores of Bali, where crystal-clear waters meet
            golden sunsets. This hand-crafted romantic itinerary is designed for
            couples who dream of candle-lit beach dinners, lush tropical
            adventures, and moments that turn into lifelong memories.`}
        </p>
        <div className="romanticdestination-price-book">
          <span className="romanticdestination-price">{data.price}</span>
          <button className="romanticdestination-book-btn">
            Book Your Escape
          </button>
        </div>
      </section>

      {/* Itinerary */}
      <section className="romanticdestination-itinerary">
        <h3>Your Romantic Journey</h3>
        <ol>
          {data.itinerary && data.itinerary.length > 0 ? (
            data.itinerary.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <>
              <li>Arrival in Bali – private sunset welcome dinner</li>
              <li>Island exploration with waterfall picnic</li>
              <li>Luxury spa day for two</li>
              <li>Beach hopping & snorkeling adventures</li>
              <li>Farewell rooftop dinner under the stars</li>
            </>
          )}
        </ol>
        <img
          src={data.itineraryImage}
          alt={`${data.title} Itinerary`}
        />
      </section>

      {/* Experiences */}
      <section className="romanticdestination-experiences">
        <h3>Unforgettable Experiences</h3>
        <ul>
          {data.experiences && data.experiences.length > 0 ? (
            data.experiences.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <>
              <li>Private candle-lit dinner on the beach</li>
              <li>Couples’ spa & wellness retreat</li>
              <li>Sunset sailing with champagne</li>
              <li>Guided cultural village tour</li>
            </>
          )}
        </ul>
        <img
          src={data.experiencesImage}
          alt={`${data.title} Experiences`}
        />
      </section>

      {/* Inclusions */}
      <section className="romanticdestination-inclusions">
        <h3>Everything You’ll Enjoy</h3>
        <ul>
          {data.inclusions && data.inclusions.length > 0 ? (
            data.inclusions.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <>
              <li>5-star luxury accommodation</li>
              <li>Daily gourmet breakfast</li>
              <li>All guided tours & transfers</li>
              <li>Romantic welcome amenities</li>
            </>
          )}
        </ul>
        <img
          src={data.inclusionsImage}
          alt={`${data.title} Inclusions`}
        />
      </section>

      {/* Related Adventures */}
      <section className="romanticdestination-more-adventures">
        <h3>Other Romantic Getaways</h3>
        <div className="romanticdestination-adventure-cards">
          {data.relatedAdventures && data.relatedAdventures.length > 0 ? (
            data.relatedAdventures.map((adventure, index) => (
              <div key={index} className="romanticdestination-adventure-card">
                <img src={adventure.image} alt={adventure.title} />
                <p>{adventure.title}</p>
              </div>
            ))
          ) : (
            <>
              <div className="romanticdestination-adventure-card">
                <img src="/images/maldives.jpg" alt="Maldives" />
                <p>Maldives Paradise Retreat</p>
              </div>
              <div className="romanticdestination-adventure-card">
                <img src="/images/santorini.jpg" alt="Santorini" />
                <p>Santorini Sunset Escape</p>
              </div>
              <div className="romanticdestination-adventure-card">
                <img src="/images/paris.jpg" alt="Paris" />
                <p>Paris City of Love</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer Banner */}
      <section
        className="romanticdestination-footer-banner"
        style={{ backgroundImage: `url(${data.footerBannerImage})` }}
      >
        <h2>{data.footerBannerText || "Start Your Love Story Today"}</h2>
        <button className="romanticdestination-start-btn">
          Begin Your Journey
        </button>
      </section>
    </div>
  );
}