// Feedback.jsx
import { useState, useEffect, useRef } from 'react';
import './Feedback.css';
import Navbar from './Navbar';
import Footer from './Footer';
const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [experience, setExperience] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [recommend, setRecommend] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Validate form on changes
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    if (email && !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (experience && (experience.length < 10 || experience.length > 800)) {
      newErrors.experience = 'Experience must be between 10-800 characters';
    }

    setErrors(newErrors);

    setIsValid(
      email &&
        emailRegex.test(email) &&
        rating > 0 &&
        experience &&
        experience.length >= 10 &&
        experience.length <= 800 &&
        recommend !== null
    );
  }, [email, rating, experience, recommend]);

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      createPreview(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      createPreview(selectedFile);
    }
  };

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors({...errors, file: 'Please upload a valid image (JPEG, PNG, JPG, WEBP)'});
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors({...errors, file: 'File size must be less than 5MB'});
      return false;
    }
    return true;
  };

  const createPreview = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsSubmitted(true);
      // In a real app, you would send data to server here
    }
  };

  const closeModal = () => {
    setIsSubmitted(false);
    // Reset form if desired
    // setName('');
    // setEmail('');
    // setRating(0);
    // setExperience('');
    // setSuggestions('');
    // setRecommend(null);
    // setFile(null);
    // setPreview(null);
  };

  return (
    <main className="feedback-container">
        <Navbar/>
      <div className="background-overlay"></div>
      
      <section className="hero">
        <h1 className="hero-title">We Value Your Feedback</h1>
        <p className="hero-subtitle">Help us improve by sharing your thoughts and experience</p>
      </section>

      <section className="feedback-card">
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="name">Name (optional)</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <fieldset>
              <legend>Rating*</legend>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star}>
                    <input
                      type="radio"
                      name="rating"
                      value={star}
                      checked={rating === star}
                      onChange={() => setRating(star)}
                      required
                    />
                    <span className="star" aria-hidden="true">★</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Your Experience*</label>
            <textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              minLength="10"
              maxLength="800"
              placeholder="Tell us about your experience (10-800 characters)"
              aria-describedby={errors.experience ? "experience-error" : undefined}
            />
            <div className="char-counter">
              {experience.length}/800 characters
            </div>
            {errors.experience && <span id="experience-error" className="error-message">{errors.experience}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="suggestions">Suggestions & Ideas (optional)</label>
            <textarea
              id="suggestions"
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              placeholder="Any suggestions for improvement?"
            />
          </div>

          <div className="form-group">
            <fieldset>
              <legend>Would You Recommend Us?*</legend>
              <div className="toggle-group">
                <label>
                  <input
                    type="radio"
                    name="recommend"
                    value="yes"
                    checked={recommend === true}
                    onChange={() => setRecommend(true)}
                    required
                  />
                  <span>Yes</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="recommend"
                    value="no"
                    checked={recommend === false}
                    onChange={() => setRecommend(false)}
                    required
                  />
                  <span>No</span>
                </label>
              </div>
            </fieldset>
          </div>

          <div className="form-group">
            <label htmlFor="file-upload">Upload Screenshot (optional)</label>
            <input
              type="file"
              id="file-upload"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              style={{ display: 'none' }}
            />
            <div
              className={`drop-zone ${preview ? 'has-preview' : ''}`}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current.click()}
            >
              {preview ? (
                <div className="file-preview">
                  <img src={preview} alt="Preview" />
                  <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(); }} className="remove-file">
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <p>Drag & drop your screenshot here or click to browse</p>
                  <p className="file-hint">PNG, JPG, WEBP (max 5MB)</p>
                </>
              )}
            </div>
            {errors.file && <span className="error-message">{errors.file}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={!isValid}>
            Submit Feedback
          </button>
        </form>
      </section>

      {isSubmitted && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <h2>Thank you!</h2>
            <p>Your feedback brightens our journey <span aria-hidden="true">🌟</span></p>
            {file && (
              <p className="file-note">Our technical team will review the attached screenshot.</p>
            )}
            <button onClick={closeModal} className="modal-close-btn">
              Continue
            </button>
          </div>
        </div>
      )}
      <div className='color'>
      <Footer/>
      </div>
    </main>
  );
};

export default Feedback;