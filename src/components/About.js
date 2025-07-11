import React from 'react';
import '../styles/styles.css';

export default function About() {
  return (
    <section className="page about">
      <img src="/victorlabslogo.png" alt="Vikta Mwangi" className="profile-image" />

      <h1>About Me</h1>

      <p>
        Welcome to my portfolio! I’m <strong>Vikta Mwangi</strong>, a passionate and detail-oriented software developer
        with a strong commitment to delivering high-quality, scalable, and maintainable web applications.
      </p>

      <p>
        With a solid background in both frontend and backend development, I specialize in building responsive React-based interfaces,
        designing robust Node.js backend systems, and managing efficient MySQL databases. My goal is to bridge the gap between
        business needs and technology through clean, user-friendly solutions.
      </p>

      <h2>My Mission</h2>
      <p>
        I strive to empower businesses and individuals by crafting digital solutions that improve efficiency, enhance user experience,
        and drive innovation. I believe technology should be accessible, reliable, and tailored to solve real-world challenges.
      </p>

      <h2>Professional Background</h2>
      <p>
        Over the years, I have contributed to diverse projects ranging from comprehensive Employee Management Systems to seamless
        Contact Form integrations using third-party services like EmailJS. These experiences have sharpened my ability to adapt and
        apply best practices in software development.
      </p>

      <p>
        I enjoy collaborating with cross-functional teams, learning emerging technologies, and continuously honing my craft to stay
        at the forefront of the software industry.
      </p>

      <h2>Outside of Coding</h2>
      <p>
        When I’m not writing code, I’m passionate about exploring new tech trends, participating in developer communities, and
        finding innovative ways to solve problems creatively.
      </p>

      <p>
        Thank you for taking the time to learn more about me. Feel free to explore my projects and reach out if you’re interested
        in working together or have any questions.
      </p>
    </section>
  );
}
