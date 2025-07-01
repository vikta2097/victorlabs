import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

export default function Home() {
  return (
    <section className="page home">
      <h1>Welcome to victorlabs Software Development</h1>
      <p>
        Hi there! I’m Vikta Mwangi, a passionate and dedicated software developer 
        with a love for building smart, reliable, and modern software systems and websites.
      </p>
      <p>
        Whether you’re starting out or need to improve your current system, I’m here to help.
      </p>

      <div className="featured-services">
        <h2>Featured Services</h2>
        <ul>
          <li>Custom Software Development</li>
          <li>Website Development</li>
          <li>API Integration</li>
        </ul>
        <Link to="/services" className="btn-link">View All Services</Link>
      </div>

      <div className="featured-projects">
        <h2>Recent Projects</h2>
        <ul>
          <li><Link to="/projects#ems">Employee Management System</Link></li>
          <li><Link to="/projects#portfolio">Personal Portfolio Website</Link></li>
          <li><Link to="/projects#ecommerce">E-commerce Platform</Link></li>
        </ul>
        <Link to="/projects" className="btn-link">View All Projects</Link>
      </div>

      {/* Existing Contact Button */}
      <Link to="/contact" className="btn-link">Contact Me</Link>

      {/* New About Us Button */}
      <Link to="/about" className="btn-link" style={{ marginTop: '1rem', display: 'inline-block' }}>
        About Me
      </Link>
    </section>
  );
}
