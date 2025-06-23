import React from 'react';
import '../styles/styles.css';

export default function Projects() {
  return (
    <section className="page projects">
      <h2>Projects</h2>

      <div className="project">
        <h3>Employee Management System (EMS)</h3>
        <p>A comprehensive web application designed to manage employee records, attendance, leave requests, and payroll efficiently.</p>
        <p><strong>Technologies:</strong> React, Node.js, MySQL</p>
      </div>

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
