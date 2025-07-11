import React, { useState } from 'react';
import { FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/styles.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const serviceID = 'service_a9fcff8';
  const templateID = 'template_x7cj4ct';
  const userID = 'L8okaOTl9S4KpCdI-';

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceID,
        template_id: templateID,
        user_id: userID,
        template_params: templateParams,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Email sent successfully!');
          setSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
        } else {
          console.error('Failed to send email.');
          alert('Failed to send message. Please try again later.');
        }
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send message. Please try again later.');
      });
  };

  return (
    <section className="page contact">
      <h1>Contact Me</h1>
      {submitted ? (
        <>
          <p className="thank-you">Thank you for reaching out! I will get back to you soon.</p>
          <div className="social-icons">
            <a href="mailto:thigamwangi2027@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href="https://www.facebook.com/vikta.mwangi.2025?ref=profile" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/thiga-mwangi-bb2a89328" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Or call me directly at <a href="tel:+254759205319">+254 759205319</a>
          </p>
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
            <a href="mailto:thigamwangi2027@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href="https://www.facebook.com/vikta.mwangi.2025?ref=profile" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/thiga-mwangi-bb2a89328" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Or call me directly at <a href="tel:+254759205319">+254 759205319</a>
          </p>
        </>
      )}
    </section>
  );
}
