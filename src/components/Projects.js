import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.css';

const emsImages = [
  '/images/ems-1.png',
  '/images/ems-2.png',
  '/images/ems-3.png',
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const timeoutRef = useRef(null);
  const delay = 4000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === emsImages.length - 1 ? 0 : prev + 1
      );
    }, delay);
    return () => resetTimeout();
  }, [currentIndex]);

  const nextImage = () => {
    resetTimeout();
    setCurrentIndex((prev) =>
      prev === emsImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    resetTimeout();
    setCurrentIndex((prev) =>
      prev === 0 ? emsImages.length - 1 : prev - 1
    );
  };

  return (
    <section className="page projects">
      <h2>Projects</h2>

      <div className="project">
        <h3>Employee Management System (EMS)</h3>
        <p>
          A comprehensive web application designed to manage employee records,
          attendance, leave requests, and payroll efficiently.
        </p>
        <p><strong>Technologies:</strong> React, Node.js, MySQL</p>

        {/* EMS Image Slider */}
        <div className="ems-gallery">
          <button onClick={prevImage} className="gallery-btn">&#10094;</button>
          <img
            src={emsImages[currentIndex]}
            alt={`EMS Screenshot ${currentIndex + 1}`}
            className="ems-image"
            onClick={() => setEnlarged(true)}
          />
          <button onClick={nextImage} className="gallery-btn">&#10095;</button>
        </div>
      </div>

      {/* Enlarged Modal Image */}
      {enlarged && (
        <div className="image-overlay" onClick={() => setEnlarged(false)}>
          <img
            src={emsImages[currentIndex]}
            alt="Enlarged EMS"
            className="enlarged-image"
          />
        </div>
      )}

      <div className="project">
        <h3>Portfolio Website</h3>
        <p>A responsive personal portfolio website showcasing projects, skills, and contact info.</p>
        <p><strong>Technologies:</strong> HTML, CSS, JavaScript</p>
      </div>

      <div className="project">
        <h3>Custom Business Website</h3>
        <p>Tailored website for a local business with e-commerce and booking features.</p>
        <p><strong>Technologies:</strong> React, Node.js, Stripe API</p>
      </div>
    </section>
  );
}
