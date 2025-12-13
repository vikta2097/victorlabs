import React, { useState, useEffect } from "react";
import "../styles/services.css";
import { API_BASE } from "../config";

// ✅ Complete static services
const defaultServices = [
  {
    title: "Custom Software Development",
    description:
      "We build tailor-made software solutions for your unique business needs. Whether it’s an internal management system, a customer portal, or a specialized workflow tool, our solutions are scalable, secure, and optimized for performance.",
    points: [
      "Internal ERP or management systems",
      "Customer portals & dashboards",
      "Workflow automation",
      "Performance-focused & scalable solutions",
    ],
    image:
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Website Development",
    description:
      "We design and develop responsive, modern websites tailored to your brand. Optimized for speed, SEO, and mobile-friendliness, every website provides an excellent user experience.",
    points: [
      "Responsive design for all devices",
      "SEO-friendly structure",
      "Fast-loading, high-performance websites",
      "User-focused interface and navigation",
    ],
    image:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
  },
  {
    title: "System Design & Consulting",
    description:
      "We help businesses plan and design efficient systems. Our experts provide consulting on architecture, workflows, and technology stacks to ensure cost-effective and scalable solutions.",
    points: [
      "Architecture planning",
      "Technology stack recommendations",
      "Workflow optimization",
      "Efficient & scalable system design",
    ],
    image:
      "https://images.pexels.com/photos/3184636/pexels-photo-3184636.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "System Upgrades & Migration",
    description:
      "Upgrade legacy systems or migrate databases with minimal downtime. Keep your software up-to-date, secure, and compatible with modern technologies.",
    points: [
      "Legacy software modernization",
      "Database migration & optimization",
      "Performance tuning & security updates",
      "Seamless transitions",
    ],
    image:
      "https://cdn.pixabay.com/photo/2015/01/08/18/25/startup-593327_1280.jpg",
  },
  {
    title: "API Integration",
    description:
      "We connect your applications with external services to automate workflows and enable seamless data exchange.",
    points: [
      "Payment gateway integration",
      "CRM & ERP integration",
      "Cloud and third-party services",
      "Smooth & secure data flow",
    ],
    image:
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Database Design & Management",
    description:
      "We design robust, secure, and optimized databases that make it easy to store, retrieve, and analyze your data.",
    points: [
      "Relational & NoSQL databases",
      "Performance & security optimization",
      "Data retrieval & reporting",
      "Integration with applications",
    ],
    image:
      "https://img.freepik.com/free-vector/database-design-icon-conceptual-server-room-rack-data-center_39422-527.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    title: "UI/UX Design",
    description:
      "We craft intuitive and visually appealing interfaces that enhance usability and improve user satisfaction.",
    points: [
      "User research & personas",
      "Wireframes & prototypes",
      "Accessibility & usability focus",
      "Engaging interactive designs",
    ],
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    title: "Training & Support",
    description:
      "We provide training and ongoing support so your team can confidently use and manage the software.",
    points: [
      "User training & onboarding",
      "Maintenance & bug fixes",
      "Performance monitoring",
      "Continuous support & updates",
    ],
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function Services() {
  const [services, setServices] = useState(defaultServices);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/services`);
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const liveServices = data.map((service) => ({
            title: service.name,
            description: service.description,
            image:
              service.image_url ||
              "https://via.placeholder.com/600x400?text=Service+Image",
            points: service.points && service.points.length > 0
              ? service.points
              : [
                  "Professional service",
                  "Client-focused approach",
                  "Scalable & secure design",
                  "Delivered on time",
                ],
          }));

          // Merge static + live services
          setServices([...defaultServices, ...liveServices]);
        }
      } catch (error) {
        console.warn("⚠️ Using static fallback services:", error.message);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="page services-section">
      <h2 className="section-title">Our Services</h2>
      <p className="section-subtitle">
        We provide a wide range of software and IT services tailored to help
        your business succeed.
      </p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-block ${activeIndex === index ? "active" : ""}`}
            onClick={() =>
              setActiveIndex(activeIndex === index ? null : index)
            }
          >
            <div className="service-image">
              <img src={service.image} alt={service.title} />
            </div>
            <div className="service-text">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              {service.points && (
                <ul className="service-points">
                  {service.points.map((point, idx) => (
                    <li key={idx}>✅ {point}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
