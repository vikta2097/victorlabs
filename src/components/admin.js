import React, { useState, useEffect } from 'react';
import Login from './login';
import AdminDashboard from './AdminDashboard';

export default function Admin() {
  const [user, setUser] = useState(null);

  // Check localStorage on mount to persist login
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) setUser({ token });
  }, []);

  // Handle login success
  const handleLogin = (data) => {
    localStorage.setItem('adminToken', data.token);
    setUser({ token: data.token });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
  };

  return user ? (
    <AdminDashboard token={user.token} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}
