import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) setIsAdminAuthenticated(true);
  }, []);

  // Handle login success from Login component
  const handleAdminLogin = (data) => {
    localStorage.setItem("adminToken", data.token);
    setIsAdminAuthenticated(true);
    navigate("/admin"); // redirect to dashboard
  };

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
        element={<Login onLogin={handleAdminLogin} />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
