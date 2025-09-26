import React from "react";
import "../styles/projects.css";

const projects = [
  {
    title: "Employee Management System",
    category: "Web Application",
    client: "Internal / Personal Project",
    role: "Full-Stack Developer",
    description:
      "A comprehensive EMS with payroll, leave, attendance, notifications, and chatbot assistant. Built as a role-based system for both admins and employees.",
    features: [
      "Role-based dashboards (Admin & Employee)",
      "Payroll and payslip management",
      "Leave requests and balances",
      "Attendance tracking",
      "Real-time notifications and chatbot assistant",
    ],
    tech: ["React", "LocalStorage", "Node.js (planned)", "MySQL (planned)"],
    status: "In Progress",
    timeline: "Jun 2024 – Present",
    github: "https://github.com/yourusername/ems",
    live: "https://vikta2097.github.io/test2",
    caseStudy: "#", // later replace with blog or detailed page
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80", // dashboard / code theme
  },
  {
    title: "Portfolio Website",
    category: "Portfolio",
    client: "Personal",
    role: "Frontend Developer",
    description:
      "A clean, modern, and fully responsive portfolio website to showcase skills, projects, and contact information.",
    features: [
      "Responsive layout (desktop, tablet, mobile)",
      "Interactive project galleries",
      "SEO optimized",
      "Contact form integration",
    ],
    tech: ["HTML5", "CSS3", "JavaScript"],
    status: "Completed",
    timeline: "Mar 2024– Apr 2024",
    github: "https://github.com/yourusername/portfolio",
    live: "https://victorlabs.netlify.app/",
    caseStudy: "#",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", // laptop/dev theme
  },
  {
    title: "Custom Business Website",
    category: "Business Website",
    client: "Demo Project",
    role: "Full-Stack Developer",
    description:
      "A tailor-made business site with e-commerce and booking capabilities to enhance customer experience.",
    features: [
      "E-commerce with payment gateway",
      "Booking system integration",
      "Admin dashboard for management",
      "Mobile-first design",
    ],
    tech: ["React", "Node.js/Express", "Stripe API", "MySQL"],
    status: "Prototype",
    timeline: "Aug 2024– Sep 2024",
    github: "https://github.com/yourusername/business-site",
    live: "https://vikta2097.github.io/project",
    caseStudy: "#",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80", // business / modern office
  },
];

export default function Projects() {
  return (
    <section
      className="projects-section page projects"
      aria-labelledby="projects-title"
    >
      <h2 id="projects-title">Projects</h2>
      <div className="projects-grid" role="list">
        {projects.map((project, idx) => (
          <article key={idx} className="project-card" role="listitem">
            <div className="project-media">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                loading="lazy"
              />
            </div>
            <div className="project-body">
              <span className="project-category">{project.category}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              {/* Features */}
              <ul className="project-features">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              {/* Meta info */}
              <div className="project-meta">
                <p>
                  <strong>Client:</strong> {project.client}
                </p>
                <p>
                  <strong>Role:</strong> {project.role}
                </p>
                <p>
                  <strong>Status:</strong> {project.status}
                </p>
                <p>
                  <strong>Timeline:</strong> {project.timeline}
                </p>
              </div>

              {/* Tech stack */}
              <ul className="project-tech">
                {project.tech.map((t, i) => (
                  <li key={i} className="tech-tag">
                    {t}
                  </li>
                ))}
              </ul>

              {/* Links */}
              <div className="project-ctas">
                {project.live && (
                  <a
                    className="btn btn-primary"
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    className="btn btn-ghost"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {project.caseStudy && (
                  <a
                    className="btn btn-outline"
                    href={project.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Case Study
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
