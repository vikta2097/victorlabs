import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.css';
import EMSDemo from './EMSDemo';
/* eslint-disable no-unused-vars */

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
<lable>EMPLOYEE MANAGMENT SYSTEM</lable>
      {/* Employee Management System Project */}
      <div className="ems-demo-wrapper">
        <h4>Live Demo for employee management system:</h4>
        <EMSDemo />
      </div>


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
        <p><strong>Technologies Used:</strong> React for frontend React.js, Node.js/Express backend, Stripe API for payments, and MYSQLDB for data storage.</p>
        <p><strong>Benefits:</strong> Empowers the business to expand sales online, reduce manual booking tasks, and improve customer satisfaction.</p>
      </div>
    </section>
  );
}
