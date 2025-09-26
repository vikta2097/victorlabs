import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/policy.css';

export default function PrivacyPolicy() {
  return (
    <section className="page privacy-policy">
      <h1>Privacy Policy</h1>
      <p>
        At <strong>VictorLabs</strong>, your privacy is very important to us. 
        This Privacy Policy explains how we collect, use, store, and protect your personal information 
        when you use our website, applications, or services.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, or other details you provide voluntarily.</li>
        <li><strong>Account Information:</strong> Login details, employee data, or profile information in our EMS platform.</li>
        <li><strong>Usage Data:</strong> Pages visited, features used, device type, browser type, and IP address.</li>
        <li><strong>Cookies & Tracking:</strong> To improve website performance and user experience.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use collected data to:</p>
      <ul>
        <li>Provide, operate, and improve our services.</li>
        <li>Personalize user experience and support.</li>
        <li>Communicate with you regarding updates, services, and security alerts.</li>
        <li>Ensure compliance with applicable laws and regulations.</li>
      </ul>

      <h2>3. Data Storage & Security</h2>
      <p>
        We take security seriously. All personal data is stored securely using encryption and access controls. 
        While no system is 100% secure, we implement industry-standard measures to protect your data.
      </p>

      <h2>4. Sharing of Information</h2>
      <p>
        We do not sell or rent your personal information. We may share data with trusted third-party 
        service providers (e.g., hosting, analytics) only to support our services. Any such partners 
        are required to maintain strict confidentiality.
      </p>

      <h2>5. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access, update, or delete your personal data.</li>
        <li>Opt out of marketing communications.</li>
        <li>Request details on how your data is processed.</li>
      </ul>

      <h2>6. Cookies</h2>
      <p>
        Our site uses cookies to enhance functionality and analyze traffic. You can disable cookies 
        in your browser settings, but some features may not work properly without them.
      </p>

      <h2>7. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party sites. We are not responsible for the privacy 
        practices or content of external websites.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page 
        with a revised “Last Updated” date.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at: <br />
        <strong>Email:</strong> victorlabs854@gmail.com <br />
        <strong>Phone:</strong> +254 759205319
      </p>
      <Link to="/contact" className="btn-link">Contact Us</Link>
    </section>
  );
}
