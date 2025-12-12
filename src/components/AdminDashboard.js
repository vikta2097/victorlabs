import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = 'https://victorlabs.onrender.com/api';

export default function AdminDashboard({ token, onLogout }) {
  const [view, setView] = useState('projects');

  // Projects, Services, About sections
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [aboutSections, setAboutSections] = useState([]);

  // Forms
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: '',
    description: '',
    image_url: '',
    features: '',
    tech: '',
    github: '',
    live: ''
  });

  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    points: '',
    image_url: ''
  });

  const [aboutForm, setAboutForm] = useState({
    title: '',
    content: '',
    image_url: '',
    is_reverse: false,
    order_index: 0
  });

  // Fetch all data on mount
  useEffect(() => {
    fetchProjects();
    fetchServices();
    fetchAbout();
  }, []);

  // --- Fetch functions ---
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API}/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to fetch projects');
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API}/services`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to fetch services');
    }
  };

  const fetchAbout = async () => {
    try {
      const res = await fetch(`${API}/about`);
      const data = await res.json();
      setAboutSections(data);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to fetch about sections');
    }
  };

  // --- CRUD functions ---
  const addProject = async () => {
    try {
      const body = {
        ...projectForm,
        features: projectForm.features.split(',').map(f => f.trim()),
        tech: projectForm.tech.split(',').map(t => t.trim()),
        date_added: new Date()
      };
      const res = await fetch(`${API}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      setProjects(prev => [data, ...prev]);
      setProjectForm({
        title: '',
        category: '',
        description: '',
        image_url: '',
        features: '',
        tech: '',
        github: '',
        live: ''
      });
      toast.success('✅ Project added successfully');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to add project');
    }
  };

  const deleteProject = async id => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await fetch(`${API}/projects/${id}`, { method: 'DELETE' });
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success('✅ Project deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to delete project');
    }
  };

  const addService = async () => {
    try {
      const body = {
        ...serviceForm,
        points: serviceForm.points.split(',').map(p => p.trim())
      };
      const res = await fetch(`${API}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      setServices(prev => [data, ...prev]);
      setServiceForm({ name: '', description: '', points: '', image_url: '' });
      toast.success('✅ Service added successfully');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to add service');
    }
  };

  const deleteService = async id => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await fetch(`${API}/services/${id}`, { method: 'DELETE' });
      setServices(prev => prev.filter(s => s.id !== id));
      toast.success('✅ Service deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to delete service');
    }
  };

  const addAboutSection = async () => {
    try {
      const body = {
        ...aboutForm,
        order_index: Number(aboutForm.order_index)
      };
      const res = await fetch(`${API}/about`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      setAboutSections(prev => [...prev, data]);
      setAboutForm({ title: '', content: '', image_url: '', is_reverse: false, order_index: 0 });
      toast.success('✅ About section added successfully');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to add about section');
    }
  };

  const deleteAboutSection = async id => {
    if (!window.confirm('Delete this about section?')) return;
    try {
      await fetch(`${API}/about/${id}`, { method: 'DELETE' });
      setAboutSections(prev => prev.filter(a => a.id !== id));
      toast.success('✅ About section deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to delete about section');
    }
  };

  // --- JSX ---
  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Admin Dashboard</h1>
        <button style={{ ...btn, background: '#6c757d' }} onClick={onLogout}>
          Logout
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setView('projects')} style={btn}>Projects</button>
        <button onClick={() => setView('services')} style={btn}>Services</button>
        <button onClick={() => setView('about')} style={btn}>About</button>
      </div>

      {/* Projects */}
      {view === 'projects' && (
        <div>
          <h2>Add Project</h2>
          <input style={input} placeholder="Title" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} />
          <input style={input} placeholder="Category" value={projectForm.category} onChange={e => setProjectForm({ ...projectForm, category: e.target.value })} />
          <input style={input} placeholder="Image URL" value={projectForm.image_url} onChange={e => setProjectForm({ ...projectForm, image_url: e.target.value })} />
          <input style={input} placeholder="Features (comma-separated)" value={projectForm.features} onChange={e => setProjectForm({ ...projectForm, features: e.target.value })} />
          <input style={input} placeholder="Tech (comma-separated)" value={projectForm.tech} onChange={e => setProjectForm({ ...projectForm, tech: e.target.value })} />
          <input style={input} placeholder="GitHub link" value={projectForm.github} onChange={e => setProjectForm({ ...projectForm, github: e.target.value })} />
          <input style={input} placeholder="Live link" value={projectForm.live} onChange={e => setProjectForm({ ...projectForm, live: e.target.value })} />
          <textarea style={textarea} placeholder="Description" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} />
          <button style={btn} onClick={addProject}>Save Project</button>

          <h3>Existing Projects</h3>
          {projects.map(p => (
            <div key={p.id} style={card}>
              <img src={p.image_url} width="100" alt="" />
              <div style={{ flex: 1 }}>
                <strong>{p.title} ({p.category})</strong>
                <p>{p.description}</p>
                <small>Features: {p.features.join(', ')}</small><br/>
                <small>Tech: {p.tech.join(', ')}</small>
                <div>
                  <a href={p.github} target="_blank" rel="noreferrer">GitHub</a> | <a href={p.live} target="_blank" rel="noreferrer">Live</a>
                </div>
              </div>
              <button style={deleteBtn} onClick={() => deleteProject(p.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* Services */}
      {view === 'services' && (
        <div>
          <h2>Add Service</h2>
          <input style={input} placeholder="Name" value={serviceForm.name} onChange={e => setServiceForm({ ...serviceForm, name: e.target.value })} />
          <input style={input} placeholder="Image URL" value={serviceForm.image_url} onChange={e => setServiceForm({ ...serviceForm, image_url: e.target.value })} />
          <textarea style={textarea} placeholder="Description" value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} />
          <input style={input} placeholder="Points (comma-separated)" value={serviceForm.points} onChange={e => setServiceForm({ ...serviceForm, points: e.target.value })} />
          <button style={btn} onClick={addService}>Save Service</button>

          <h3>Existing Services</h3>
          {services.map(s => (
            <div key={s.id} style={card}>
              <img src={s.image_url} width="100" alt="" />
              <div style={{ flex: 1 }}>
                <strong>{s.name}</strong>
                <p>{s.description}</p>
                <ul>{s.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
              <button style={deleteBtn} onClick={() => deleteService(s.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* About Sections */}
      {view === 'about' && (
        <div>
          <h2>Add About Section</h2>
          <input style={input} placeholder="Title" value={aboutForm.title} onChange={e => setAboutForm({ ...aboutForm, title: e.target.value })} />
          <textarea style={{ ...textarea, height: 100 }} placeholder="Content" value={aboutForm.content} onChange={e => setAboutForm({ ...aboutForm, content: e.target.value })} />
          <input style={input} placeholder="Image URL" value={aboutForm.image_url} onChange={e => setAboutForm({ ...aboutForm, image_url: e.target.value })} />
          <label>
            Reverse Layout: <input type="checkbox" checked={aboutForm.is_reverse} onChange={e => setAboutForm({ ...aboutForm, is_reverse: e.target.checked })} />
          </label>
          <input style={input} placeholder="Order Index" type="number" value={aboutForm.order_index} onChange={e => setAboutForm({ ...aboutForm, order_index: e.target.value })} />
          <button style={btn} onClick={addAboutSection}>Add Section</button>

          <h3>Existing About Sections</h3>
          {aboutSections.map(a => (
            <div key={a.id} style={card}>
              <img src={a.image_url} width="100" alt="" />
              <div style={{ flex: 1 }}>
                <strong>{a.title}</strong>
                <p>{a.content}</p>
                <small>Order: {a.order_index} | Reverse: {a.is_reverse ? 'Yes' : 'No'}</small>
              </div>
              <button style={deleteBtn} onClick={() => deleteAboutSection(a.id)}>Delete</button>
            </div>
          ))}
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
  alignItems: 'flex-start'
};
