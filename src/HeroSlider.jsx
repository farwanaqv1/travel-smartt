import { useState, useEffect, useRef } from 'react';
import './HeroSlider.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slideInterval = useRef(null);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      heading: 'Explore the World with Travel Smart',
      subheading: 'Find the best destinations, plan your dream trips, and enjoy exclusive travel deals — all in one place.'
    },
    {
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1968&q=80',
      heading: 'Discover Hidden Gems',
      subheading: 'Uncover places you never knew existed with our expert-curated travel guides.'
    },
    {
      image: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      heading: 'Luxury Meets Adventure',
      subheading: 'Experience world-class comfort while exploring breathtaking destinations.'
    },
    {
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80',
      heading: 'Create Lasting Memories',
      subheading: 'Your perfect vacation is just a click away with our personalized travel planning.'
    }
  ];

  const startAutoPlay = () => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
  };

  const stopAutoPlay = () => {
    clearInterval(slideInterval.current);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay">
            <div className={`slide-content ${index === currentSlide ? 'active' : ''}`}>
              <h1>{slide.heading}</h1>
              <p>{slide.subheading}</p>
              <div className="cta-buttons">
                <button className="btn-primary">Start Your Journey</button>
                <button className="btn-secondary">View Destinations</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="slider-nav">
        <button className="nav-btn prev" onClick={goToPrev}>
          &larr;
        </button>
        <button className="nav-btn next" onClick={goToNext}>
          &rarr;
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;