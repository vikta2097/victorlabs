import React, { useEffect, useRef } from 'react';
import '../styles/about.css';

export default function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    if (aboutRef.current) {
      aboutRef.current.style.opacity = 1;
    }
  }, []);

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

      {/* Mission Section */}
      <div className="about-section">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            Our mission is to simplify technology by delivering innovative, reliable,
            and accessible solutions. We bridge the gap between business goals and
            technology, ensuring growth, efficiency, and lasting impact.
          </p>
        </div>
        <div className="about-image">
          <img src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg" alt="Team Mission" />
        </div>
      </div>

      {/* What We Do Section */}
      <div className="about-section reverse">
        <div className="about-text">
          <h2>What We Do</h2>
          <p>
            From sleek <strong>React frontends</strong> to powerful <strong>Node.js backends </strong> 
            and optimized <strong>MySQL databases</strong>, we build full-stack solutions tailored 
            to modern business needs.
          </p>
          <p>
            Our expertise spans Employee Management Systems, AI-powered dashboards,
            secure messaging platforms, and seamless integrations.
          </p>
        </div>
        <div className="about-image">
          <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg" alt="Web Development" />
        </div>
      </div>

      {/* Approach Section */}
      <div className="about-section">
        <div className="about-text">
          <h2>Our Approach</h2>
          <p>
            We don’t just write code — we build partnerships. By collaborating closely with
            clients, understanding their unique vision, and delivering transparent,
            value-driven solutions, we ensure long-term success.
          </p>
        </div>
        <div className="about-image">
          <img src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg" alt="Collaboration" />
        </div>
      </div>

      {/* Beyond Tech Section */}
      <div className="about-section reverse">
        <div className="about-text">
          <h2>Beyond Technology</h2>
          <p>
            At VictorLabs, innovation goes beyond software. We explore emerging technologies,
            engage with developer communities, and find creative solutions to global challenges.
          </p>
          <p>
            Together, let’s create digital products that inspire and make a difference.
          </p>
        </div>
        <div className="about-image">
          <img src="https://images.pexels.com/photos/1181343/pexels-photo-1181343.jpeg" alt="Innovation" />
        </div>
      </div>
    </section>
  );
} 