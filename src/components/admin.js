import React, { useState } from 'react';
import Login from './login';
import AdminDashboard from './AdminDashboard';

export default function Admin() {
  const [user, setUser] = useState(null);

  return user ? (
    <AdminDashboard token={user.token} />
  ) : (
    <Login onLogin={setUser} />
  );
}
