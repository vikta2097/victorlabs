import React, { useState } from 'react';
import { FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/styles.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form submission logic here
    setSubmitted(true);
  };

  return (
    <section className="page contact">
      <h1>Contact Me</h1>
      {submitted ? (
        <>
          <p className="thank-you">Thank you for reaching out! I will get back to you soon.</p>
          <div className="social-icons">
            <a href="mailto:your.email@example.com" aria-label="Email" target="_blank" rel="noopener noreferrer">
              <FaEnvelope />
            </a>
            <a href="https://www.facebook.com/yourprofile" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/yourprofile" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </>
      ) : (
        <>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />

            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />

            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              value={formData.message} 
              onChange={handleChange} 
              required 
            />

            <button type="submit" className="btn-submit">Send</button>
          </form>

          <div className="social-icons" style={{ marginTop: '2rem' }}>
            <a href="thigamwangi2027@gmail.com" aria-label="Email" target="_blank" rel="noopener noreferrer">
              <FaEnvelope />
            </a>
            <a href="https://www.facebook.com/vikta.mwangi.2025?ref=profile" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/yourprofile" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </>
      )}
    </section>
  );
}
