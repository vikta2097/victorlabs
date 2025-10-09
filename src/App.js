import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/login';

function App() {
  // State to track admin authentication
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Example: check localStorage for a saved token/session
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) setIsAdminAuthenticated(true);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          isAdminAuthenticated ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />
      <Route
        path="/admin/login"
        element={<Login setIsAdminAuthenticated={setIsAdminAuthenticated} />}
      />

      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
