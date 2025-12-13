import React, { useState } from 'react';
import Login from './Login';
import AdminDashboard from './AdminDashboard';

export default function Admin() {
  const [user, setUser] = useState(null);

  // Handle login success
  const handleLogin = (data) => {
    setUser({ token: data.token, fullname: data.fullname, role: data.role });
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
  };

  // Show login if no user, dashboard if logged in
  return user ? (
    <AdminDashboard token={user.token} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}