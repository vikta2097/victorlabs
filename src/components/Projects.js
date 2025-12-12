import React, { useEffect, useState } from "react";
import "../styles/projects.css";
import { API_BASE } from "../config";

// --- Static local projects ---
const staticProjects = [
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
    caseStudy: "#",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Projects() {
  const [dbProjects, setDbProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch live projects from backend ---
  useEffect(() => {
    fetch(`${API_BASE}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setDbProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  // --- Merge static + database projects ---
  const allProjects = [...staticProjects, ...dbProjects];

  return (
    <section
      className="projects-section page projects"
      aria-labelledby="projects-title"
    >
      <h2 id="projects-title">Projects</h2>

      {loading && <p>Loading live projects...</p>}

      <div className="projects-grid" role="list">
        {allProjects.map((project, idx) => (
          <article key={idx} className="project-card" role="listitem">
            <div className="project-media">
              <img
                src={project.image || project.image_url}
                alt={`${project.title} screenshot`}
                loading="lazy"
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
            </div>

            <div className="project-body">
              <span className="project-category">
                {project.category || "Web App"}
              </span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              {project.features && (
                <ul className="project-features">
                  {project.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}

              {project.tech && (
                <ul className="project-tech">
                  {project.tech.map((t, i) => (
                    <li key={i} className="tech-tag">
                      {t}
                    </li>
                  ))}
                </ul>
              )}

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
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
