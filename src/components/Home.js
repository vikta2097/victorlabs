import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';


export default function Home() {
  return (
    <>
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <Link to="/">VictorLabs</Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
          <Link to="/contact" className="btn-primary">Get Quote</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Hello, we are VictorLabs</h1>
          <p>
            Passionate software developers building modern, reliable software and websites.
            Welcome to our portfolio!
          </p>
          <Link to="/services" className="btn-primary">Explore Services</Link>
        </div>
        <div className="hero-img">
          <img src="/victorlabslogo.png" alt="VictorLabs Illustration" />
        </div>
      </section>

      
      {/* Services / Cards Section */}
      <section id="services" className="services">
        <h2>What We Do</h2>
        <div className="service-grid">
          <div className="service-card">
            <h3>Services</h3>
            <p>Custom software, website development, API integration, and more.</p>
            <Link to="/services" className="btn-link">Explore Services</Link>
          </div>
          <div className="service-card">
            <h3>Projects</h3>
            <p>See our recent work including EMS and e-commerce platforms.</p>
            <Link to="/projects" className="btn-link">View Projects</Link>
          </div>
          <div className="service-card">
            <h3>About Us</h3>
            <p>Learn about our background, skills, and mission as a team of developers.</p>
            <Link to="/about" className="btn-link">Learn More</Link>
          </div>
          <div className="service-card">
            <h3>Contact</h3>
            <p>Let’s discuss your project or just say hello!</p>
            <Link to="/contact" className="btn-link">Contact Us</Link>
          </div>
        </div>
      </section>


      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>Ready to Work With Us?</h2>
        <Link to="/contact" className="btn-primary">Contact Us</Link>
      </section>

    

      {/* Footer */}
      <footer className="footer">
        <p>© { new Date().getFullYear()} VictorLabs. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <a href="tel:+254759205319">Phone</a>
        </div>
      </footer>
    </>
  );
}
