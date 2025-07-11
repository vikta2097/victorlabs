import React from 'react';
import '../styles/styles.css';

export default function Services() {
  const services = [
    'Custom Software Development',
    'Website Development',
    'System Design & Consulting',
    'System Upgrades',
    'API Integration',
    'Database Design',
    'UI/UX Design',
    'Software Training',
    'Maintenance & Support',
  ];

  return (
    <section className="page services-section">
      <h2 className="section-title">Services</h2>
      <p className="section-subtitle">
        I offer a range of professional software development services tailored to meet your business needs:
      </p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">🛠</div>
            <h3 className="service-title">{service}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
