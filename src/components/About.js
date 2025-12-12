import React, { useEffect, useRef, useState } from 'react';
import '../styles/about.css';
import { API_BASE } from '../config';

export default function About() {
  const aboutRef = useRef(null);
  const [dynamicSections, setDynamicSections] = useState([]);

  useEffect(() => {
    if (aboutRef.current) aboutRef.current.style.opacity = 1;

    // Fetch dynamic about sections from backend
    fetch(`${API_BASE}/api/about`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDynamicSections(data);
        }
      })
      .catch(err => console.error('Error fetching about sections:', err));
  }, []);

  // --- Static content ---
  const staticSections = [
    {
      title: 'Our Mission',
      content: 'Our mission is to simplify technology by delivering innovative, reliable, and accessible solutions. We bridge the gap between business goals and technology, ensuring growth, efficiency, and lasting impact.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      reverse: false,
    },
    {
      title: 'What We Do',
      content: 'From sleek React frontends to powerful Node.js backends and optimized MySQL databases, we build full-stack solutions tailored to modern business needs. Our expertise spans Employee Management Systems, AI-powered dashboards, secure messaging platforms, and seamless integrations.',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      reverse: true,
    },
    {
      title: 'Our Approach',
      content: 'We don’t just write code — we build partnerships. By collaborating closely with clients, understanding their unique vision, and delivering transparent, value-driven solutions, we ensure long-term success.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      reverse: false,
    },
    {
      title: 'Beyond Technology',
      content: 'At VictorLabs, innovation goes beyond software. We explore emerging technologies, engage with developer communities, and find creative solutions to global challenges. Together, let’s create digital products that inspire and make a difference.',
      image: 'https://images.pexels.com/photos/1181343/pexels-photo-1181343.jpeg',
      reverse: true,
    },
  ];

  return (
    <section className="about-page" ref={aboutRef}>
      {/* Hero Section */}
      <div className="about-hero">
        <img src="/victorlabslogo.png" alt="VictorLabs Logo" className="about-logo" />
        <h1>About Us</h1>
        <p>
          At <strong>VictorLabs</strong>, we transform ideas into powerful digital solutions. 
          Our passion lies in building scalable, user-friendly software that empowers businesses 
          and people to thrive in the digital age.
        </p>
      </div>

      {/* Render static sections */}
      {staticSections.map((sec, idx) => (
        <div key={idx} className={`about-section ${sec.reverse ? 'reverse' : ''}`}>
          <div className="about-text">
            <h2>{sec.title}</h2>
            <p>{sec.content}</p>
          </div>
          <div className="about-image">
            <img src={sec.image} alt={sec.title} />
          </div>
        </div>
      ))}

      {/* Render dynamic backend sections */}
      {dynamicSections.map((sec, idx) => (
        <div key={idx} className={`about-section ${sec.is_reverse ? 'reverse' : ''}`}>
          <div className="about-text">
            <h2>{sec.title}</h2>
            <p>{sec.content}</p>
          </div>
          {sec.image_url && (
            <div className="about-image">
              <img src={sec.image_url} alt={sec.title} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
