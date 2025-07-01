import React from 'react';
import '../styles/styles.css';
<img src="/profile.jpg" alt="Vikta Mwangi" className="profile-image" />


export default function About() {
  return (
    <section className="page about">
      <img src="/victoriamwangi.jpg" alt="Vikta Mwangi" className="profile-image" />
      <h1>About Me</h1>
      <p>Welcome to my portfolio! I’m <strong>Vikta Mwangi</strong>, a passionate and driven software developer with experience in building modern, user-friendly web applications.</p>

      <p>I specialize in creating React-based frontends, Node.js backend systems, and MySQL-powered databases. I enjoy solving real-world problems with technology and constantly improving my skills.</p>

      <h2>My Mission</h2>
      <p>My mission is to build reliable, responsive, and efficient digital solutions that make people's lives easier.</p>

      <h2>Background</h2>
      <p>I’ve worked on several projects ranging from Employee Management Systems to Contact Form integrations using third-party services like EmailJS.</p>

      <p>When I’m not coding, I enjoy learning new technologies, collaborating with other developers, and exploring innovative solutions.</p>

      <p>Thank you for visiting my site. Feel free to check out my projects and contact me if you’d like to work together or have any questions.</p>
    </section>
  );
}
