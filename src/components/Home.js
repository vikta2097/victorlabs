Junimport React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo"><Link to="/">VictorLabs</Link></div>
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>  {/* Added this */}
          <li><Link to="/terms">Terms & Conditions</Link></li> {/* Optional here */}
        </ul>

      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Hello, I'm Vikta Mwangi</h1>
        <p>
          Passionate software developer building modern, reliable software and websites.
          Welcome to my portfolio!
        </p>
      </section>

      {/* Floating Cards Section */}
      <section className="floating-cards">
        <div className="card">
          <h2>Services</h2>
          <p>Custom software development, website building, API integration, and more.</p>
          <Link to="/services" className="btn-link">Explore Services</Link>
        </div>

        <div className="card">
          <h2>Projects</h2>
          <p>See my recent work including employee management systems and e-commerce platforms.</p>
          <Link to="/projects" className="btn-link">View Projects</Link>
        </div>

        <div className="card">
          <h2>About Me</h2>
          <p>A little about my background, skills, and what drives me as a developer.</p>
          <Link to="/about" className="btn-link">Learn More</Link>
        </div>

        <div className="card">
          <h2>Contact</h2>
          <p>Get in touch to discuss your project or just say hello!</p>
          <Link to="/contact" className="btn-link">Contact Me</Link>
        </div>
      </section>

      {/* Footer */}
     <footer className="footer">
        <p>© {new Date().getFullYear()} VictorLabs. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>  {/* Added this */}
          <a href="tel:+254759205319">Phone</a>
        </div>
    </footer>

    </>
  );
}
