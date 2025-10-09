import React, { useState, useEffect } from 'react';

const API = 'https://victorlabs.onrender.com/api';

export default function AdminDashboard({ token }) {
  const [view, setView] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [about, setAbout] = useState('');
  const [form, setForm] = useState({ title: '', name: '', description: '', image_url: '' });

  // Common headers with token
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  // Fetch all data on mount
  useEffect(() => {
    fetchProjects();
    fetchServices();
    fetchAbout();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API}/projects`, { headers });
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API}/services`, { headers });
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  };

  const fetchAbout = async () => {
    try {
      const res = await fetch(`${API}/about`, { headers });
      const data = await res.json();
      setAbout(data[0]?.content || '');
    } catch (err) {
      console.error('Error fetching about info:', err);
    }
  };

  // Add new project
  const addProject = async () => {
    try {
      const res = await fetch(`${API}/projects`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          image_url: form.image_url,
          date_added: new Date(),
        }),
      });
      if (res.ok) {
        alert('✅ Project added!');
        fetchProjects();
        setForm({ title: '', name: '', description: '', image_url: '' });
      }
    } catch (err) {
      console.error('Error adding project:', err);
    }
  };

  // Add new service
  const addService = async () => {
    try {
      const res = await fetch(`${API}/services`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          image_url: form.image_url,
        }),
      });
      if (res.ok) {
        alert('✅ Service added!');
        fetchServices();
        setForm({ title: '', name: '', description: '', image_url: '' });
      }
    } catch (err) {
      console.error('Error adding service:', err);
    }
  };

  // Update about section
  const updateAbout = async () => {
    try {
      const res = await fetch(`${API}/about`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ content: about }),
      });
      if (res.ok) alert('✅ About updated!');
    } catch (err) {
      console.error('Error updating about section:', err);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`${API}/projects/${id}`, { method: 'DELETE', headers });
      if (res.ok) {
        alert('🗑️ Project deleted!');
        fetchProjects();
      }
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  // Delete service
  const deleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`${API}/services/${id}`, { method: 'DELETE', headers });
      if (res.ok) {
        alert('🗑️ Service deleted!');
        fetchServices();
      }
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h1>Admin Dashboard</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setView('projects')} style={btn}>Projects</button>
        <button onClick={() => setView('services')} style={btn}>Services</button>
        <button onClick={() => setView('about')} style={btn}>About</button>
      </div>

      {/* PROJECTS */}
      {view === 'projects' && (
        <div>
          <h2>Add Project</h2>
          <input
            style={input}
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <input
            style={input}
            placeholder="Image URL"
            value={form.image_url}
            onChange={e => setForm({ ...form, image_url: e.target.value })}
          />
          <textarea
            style={textarea}
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <button style={btn} onClick={addProject}>Save Project</button>

          <h3>Existing Projects</h3>
          {projects.map(p => (
            <div key={p.id} style={card}>
              <img src={p.image_url} width="100" alt="" />
              <div style={{ flex: 1 }}>
                <strong>{p.title}</strong>
                <p>{p.description}</p>
                <small>{new Date(p.date_added).toLocaleString()}</small>
              </div>
              <button style={deleteBtn} onClick={() => deleteProject(p.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* SERVICES */}
      {view === 'services' && (
        <div>
          <h2>Add Service</h2>
          <input
            style={input}
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            style={input}
            placeholder="Image URL"
            value={form.image_url}
            onChange={e => setForm({ ...form, image_url: e.target.value })}
          />
          <textarea
            style={textarea}
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <button style={btn} onClick={addService}>Save Service</button>

          <h3>Existing Services</h3>
          {services.map(s => (
            <div key={s.id} style={card}>
              <img src={s.image_url} width="100" alt="" />
              <div style={{ flex: 1 }}>
                <strong>{s.name}</strong>
                <p>{s.description}</p>
              </div>
              <button style={deleteBtn} onClick={() => deleteService(s.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* ABOUT */}
      {view === 'about' && (
        <div>
          <h2>Edit About Section</h2>
          <textarea
            style={{ ...textarea, height: '150px' }}
            value={about}
            onChange={e => setAbout(e.target.value)}
          />
          <button style={btn} onClick={updateAbout}>Update About</button>
        </div>
      )}
    </div>
  );
}

// --- Inline Styles ---
const btn = {
  background: '#007BFF',
  color: '#fff',
  padding: '10px 15px',
  margin: '5px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const deleteBtn = {
  background: '#dc3545',
  color: '#fff',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  height: 'fit-content',
  alignSelf: 'center'
};

const input = {
  display: 'block',
  margin: '10px 0',
  padding: '8px',
  width: '100%',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const textarea = {
  display: 'block',
  margin: '10px 0',
  padding: '8px',
  width: '100%',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const card = {
  display: 'flex',
  gap: '10px',
  background: '#f8f9fa',
  margin: '10px 0',
  padding: '10px',
  borderRadius: '8px',
  alignItems: 'center'
};
