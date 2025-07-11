import React, { useState } from 'react';
import '../styles/styles.css';

export default function Services() {
  const services = [
    {
      title: 'Custom Software Development',
      description:
        'We build personalized software solutions from the ground up based on your specific business needs — whether it’s a customer portal, an inventory system, or an internal management tool. Everything is tailor-made to fit your workflow.',
    },
    {
      title: 'Website Development',
      description:
        'Get a modern, mobile-friendly website built to showcase your brand, products, or services. We handle everything from design and layout to performance and SEO — making sure it looks great and works fast.',
    },
    {
      title: 'System Design & Consulting',
      description:
        'Not sure what kind of software you need? We help plan, design, and advise on the right system architecture, technologies, and workflows before development begins — ensuring your investment is efficient and scalable.',
    },
    {
      title: 'System Upgrades',
      description:
        'Is your current software or website slow, outdated, or no longer serving your needs? We upgrade your systems to make them faster, more secure, and compatible with the latest technologies.',
    },
    {
      title: 'API Integration',
      description:
        'APIs allow different systems to talk to each other. Whether it’s integrating mobile payment options, connecting your app with Google Maps, or syncing with an inventory system — we make your tools work together smoothly.',
    },
    {
      title: 'Database Design',
      description:
        'We design and implement smart, secure databases that safely store your business information — like customer details, transactions, or records — making it easy to search, sort, and retrieve what you need.',
    },
    {
      title: 'UI/UX Design',
      description:
        'User Interface (UI) and User Experience (UX) design is all about how your software looks and feels. We create clean, intuitive designs that are easy for anyone to use — even without a tech background.',
    },
    {
      title: 'Software Training',
      description:
        'Once we build your system, we don’t just hand it over. We train you and your team on how to use it properly, so everyone is confident navigating, inputting data, and managing tasks efficiently.',
    },
    {
      title: 'Maintenance & Support',
      description:
        'Software needs care to stay secure and up-to-date. We offer ongoing support to fix bugs, update features, monitor performance, and ensure everything keeps running smoothly long after launch.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle
  };

  const closeService = () => {
    setActiveIndex(null); // Close the active service
  };

  return (
    <section className="page services-section">
      <h2 className="section-title">Services</h2>
      <p className="section-subtitle">
        I offer a range of professional software development services tailored to meet your business needs:
      </p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-card ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleClick(index)}
          >
            <div className="service-icon">🛠</div>
            <h3 className="service-title">{service.title}</h3>
            {activeIndex === index && (
              <div className="service-expanded">
                <button className="close-button" onClick={closeService}>×</button>
                <p className="service-description">{service.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
      }
