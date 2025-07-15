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

  // Clears any existing timeout to avoid multiple timers running simultaneously
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Automatically cycle through images every `delay` milliseconds
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === emsImages.length - 1 ? 0 : prev + 1
      );
    }, delay);
    return () => resetTimeout();
  }, [currentIndex]);

  // Go to next image manually, resetting timer
  const nextImage = () => {
    resetTimeout();
    setCurrentIndex((prev) =>
      prev === emsImages.length - 1 ? 0 : prev + 1
    );
  };

  // Go to previous image manually, resetting timer
  const prevImage = () => {
    resetTimeout();
    setCurrentIndex((prev) =>
      prev === 0 ? emsImages.length - 1 : prev - 1
    );
  };

  return (
    <section className="page projects">
      <h2>Projects</h2>

      {/* Employee Management System Project */}
      <div className="project">
        <h3>Employee Management System (EMS)</h3>
        <p>
          The Employee Management System (EMS) is a robust, full-stack web application designed to streamline and automate HR processes for businesses. It handles employee records, attendance tracking, leave management, payroll calculations, and reporting — all in one centralized platform.
        </p>
        <p><strong>Key Features:</strong></p>
        <ul>
          <li>Employee profiles with personal and job details</li>
          <li>Real-time attendance tracking with check-in/out and location verification</li>
          <li>Leave request submissions, approvals, and history management</li>
          <li>Payroll generation including salary calculation and deductions</li>
          <li>Role-based access control for admin and employees</li>
          <li>Detailed reports and dashboards for HR analytics</li>
        </ul>
        <p><strong>Technologies Used:</strong> React for frontend UI, Node.js/Express for backend API, MySQL for relational database management, JWT for secure authentication, and CSS Flexbox/Grid for responsive design.</p>
        <p><strong>Benefits:</strong> Automates tedious HR tasks, improves accuracy, provides real-time insights, and enhances employee self-service capabilities.</p>

        {/* EMS Image Slider */}
        <div className="ems-gallery" aria-label="Employee Management System project screenshots">
          <button
            onClick={prevImage}
            className="gallery-btn"
            aria-label="Previous project screenshot"
          >
            &#10094;
          </button>

          <img
            src={emsImages[currentIndex]}
            alt={`Screenshot of EMS project, slide ${currentIndex + 1} of ${emsImages.length}`}
            className="ems-image"
            onClick={() => setEnlarged(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setEnlarged(true);
              }
            }}
          />

          <button
            onClick={nextImage}
            className="gallery-btn"
            aria-label="Next project screenshot"
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Enlarged Modal Image */}
      {enlarged && (
        <div
          className="image-overlay"
          onClick={() => setEnlarged(false)}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setEnlarged(false);
            }
          }}
        >
          <img
            src={emsImages[currentIndex]}
            alt={`Enlarged screenshot of EMS project, slide ${currentIndex + 1}`}
            className="enlarged-image"
          />
        </div>
      )}

      {/* Portfolio Website Project */}
      <div className="project">
        <h3>Personal Portfolio Website</h3>
        <p>
          A clean, modern, and fully responsive portfolio website designed to showcase my skills, projects, and contact information. Built with a focus on performance and accessibility.
        </p>
        <p><strong>Key Features:</strong></p>
        <ul>
          <li>Responsive layout for desktop, tablet, and mobile</li>
          <li>Interactive project galleries and detailed case studies</li>
          <li>Contact form integrated with email service for easy communication</li>
          <li>Clean codebase with semantic HTML, CSS, and JavaScript</li>
          <li>SEO optimization for better search engine visibility</li>
        </ul>
        <p><strong>Technologies Used:</strong> HTML5, CSS3 (including Flexbox and Grid), Vanilla JavaScript, and responsive design principles.</p>
        <p><strong>Benefits:</strong> Provides a professional online presence that helps potential clients and employers quickly understand my expertise and portfolio.</p>
      </div>

      {/* Custom Business Website Project */}
      <div className="project">
        <h3>Custom Business Website</h3>
        <p>
          A tailor-made website solution developed for a local business to boost their online presence and sales. It includes e-commerce features and booking capabilities designed to enhance customer experience and streamline operations.
        </p>
        <p><strong>Key Features:</strong></p>
        <ul>
          <li>E-commerce platform with secure payment integration</li>
          <li>Booking system allowing customers to schedule appointments or services</li>
          <li>Admin dashboard for easy management of products, orders, and bookings</li>
          <li>Mobile-first design for accessibility on all devices</li>
          <li>Integration with Stripe API for seamless payment processing</li>
        </ul>
        <p><strong>Technologies Used:</strong> React for frontend SPA, Node.js/Express backend, Stripe API for payments, and MongoDB for data storage.</p>
        <p><strong>Benefits:</strong> Empowers the business to expand sales online, reduce manual booking tasks, and improve customer satisfaction.</p>
      </div>
    </section>
  );
}
