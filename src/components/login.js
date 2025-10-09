import React, { useState } from 'react';

const API = 'https://victorlabs.onrender.com/api/auth'; // your backend URL

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
      } else {
        // pass token and user info to parent component
        onLogin(data);
      }
    } catch (err) {
      setError('Server error. Please try again.');
      console.error(err);
    }
  };

  return (
    <div style={container}>
      <h2>Admin Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        style={input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        style={input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button style={btn} onClick={handleLogin}>Login</button>
    </div>
  );
}

const container = {
  maxWidth: '400px',
  margin: '100px auto',
  padding: '30px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  textAlign: 'center',
  fontFamily: 'Arial',
};

const input = {
  display: 'block',
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const btn = {
  background: '#007BFF',
  color: '#fff',
  padding: '10px 15px',
  marginTop: '10px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
