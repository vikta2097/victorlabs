import React, { useEffect, useRef } from 'react';
import '../styles/styles.css';

export default function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    if (aboutRef.current) {
      aboutRef.current.style.opacity = 1; // Already handled by CSS animation, but can trigger here if needed
    }
  }, []);

  return (
    <section className="page about" ref={aboutRef}>
      <img src="/victorlabslogo.png" alt="Vikta Mwangi" className="profile-image" />

      <h1>About Me</h1>

      <p>
        Welcome to my portfolio! I’m <strong>Vikta Mwangi</strong>, a passionate and detail-oriented software developer
        committed to delivering high-quality, scalable, and maintainable web applications.
      </p>

      <p>
        With expertise in building responsive React frontends, robust Node.js backends, and efficient MySQL databases,
        I create digital solutions that bridge business needs with technology.
      </p>

      <h2>My Mission</h2>
      <p>
        I empower businesses by crafting innovative, reliable, and user-friendly digital products that enhance experiences and drive growth.
      </p>

      <h2>Professional Background</h2>
      <p>
        I have worked on diverse projects including Employee Management Systems and seamless Contact Form integrations using EmailJS,
        constantly applying best practices in software development.
      </p>

      <p>
        Collaboration and continuous learning are central to my approach, keeping me at the forefront of the evolving tech landscape.
      </p>

      <h2>Outside of Coding</h2>
      <p>
        When I’m not coding, I enjoy exploring new technologies, engaging with developer communities, and solving challenges creatively.
      </p>

      <p>
        Thank you for visiting! Feel free to explore my projects and reach out for collaboration or questions.
      </p>
    </section>
  );
}
