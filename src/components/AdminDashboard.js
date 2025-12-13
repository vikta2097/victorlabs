import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';
import '../styles/AdminDashboard.css';

export default function AdminDashboard({ token, onLogout }) {
  const [view, setView] = useState('projects');
  const [loading, setLoading] = useState(false);

  // Data states
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [aboutSections, setAboutSections] = useState([]);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '', category: '', description: '', image_url: '', features: '', tech: '', github: '', live: ''
  });

  const [serviceForm, setServiceForm] = useState({
    name: '', description: '', points: '', image_url: ''
  });

  const [aboutForm, setAboutForm] = useState({
    title: '', content: '', image_url: '', is_reverse: false, order_index: 0
  });

  // Fetch all data on mount
  useEffect(() => {
    fetchProjects();
    fetchServices();
    fetchAbout();
  }, []);

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  const handleAuthError = (status) => {
    if (status === 401 || status === 403) {
      alert('❌ Session expired. Please login again.');
      onLogout();
      return true;
    }
    return false;
  };

  // ===== FETCH FUNCTIONS =====
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/projects`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setProjects(data);
      console.log('✅ Projects fetched:', data);
    } catch (err) {
      console.error('❌ Failed to fetch projects:', err);
      alert('❌ Failed to fetch projects: ' + err.message);
    } finally { setLoading(false); }
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/services`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setServices(data);
      console.log('✅ Services fetched:', data);
    } catch (err) {
      console.error('❌ Failed to fetch services:', err);
      alert('❌ Failed to fetch services: ' + err.message);
    } finally { setLoading(false); }
  };

  const fetchAbout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/about`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAboutSections(data);
      console.log('✅ About sections fetched:', data);
    } catch (err) {
      console.error('❌ Failed to fetch about sections:', err);
      alert('❌ Failed to fetch about sections: ' + err.message);
    } finally { setLoading(false); }
  };

  // ===== PROJECT CRUD =====
  const addProject = async () => {
    if (!projectForm.title || !projectForm.category) {
      alert('⚠️ Title and Category are required');
      return;
    }

    setLoading(true);
    try {
      const body = {
        ...projectForm,
        features: projectForm.features ? projectForm.features.split(',').map(f => f.trim()).filter(Boolean) : [],
        tech: projectForm.tech ? projectForm.tech.split(',').map(t => t.trim()).filter(Boolean) : [],
        date_added: new Date().toISOString()
      };

      const res = await fetch(`${API_BASE}/api/projects`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(body)
      });

      if (handleAuthError(res.status)) return;

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setProjects(prev => [data, ...prev]);
      console.log('✅ Project added:', data);

      setProjectForm({ title: '', category: '', description: '', image_url: '', features: '', tech: '', github: '', live: '' });
      alert('✅ Project added successfully!');
    } catch (err) {
      console.error('❌ Failed to add project:', err);
      alert('❌ Failed to add project: ' + err.message);
    } finally { setLoading(false); }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (handleAuthError(res.status)) return;
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }
      setProjects(prev => prev.filter(p => p.id !== id));
      console.log('✅ Project deleted:', id);
      alert('✅ Project deleted successfully!');
    } catch (err) {
      console.error('❌ Failed to delete project:', err);
      alert('❌ Failed to delete project: ' + err.message);
    } finally { setLoading(false); }
  };

  // ===== SERVICE CRUD =====
  const addService = async () => {
    if (!serviceForm.name) { alert('⚠️ Service name is required'); return; }
    setLoading(true);
    try {
      const body = { ...serviceForm, points: serviceForm.points ? serviceForm.points.split(',').map(p => p.trim()).filter(Boolean) : [] };
      const res = await fetch(`${API_BASE}/api/services`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(body) });
      if (handleAuthError(res.status)) return;
      if (!res.ok) { const errorData = await res.json(); throw new Error(errorData.error || `HTTP ${res.status}`); }
      const data = await res.json();
      setServices(prev => [data, ...prev]);
      console.log('✅ Service added:', data);
      setServiceForm({ name: '', description: '', points: '', image_url: '' });
      alert('✅ Service added successfully!');
    } catch (err) { console.error('❌ Failed to add service:', err); alert('❌ Failed to add service: ' + err.message); }
    finally { setLoading(false); }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/services/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (handleAuthError(res.status)) return;
      if (!res.ok) { const errorData = await res.json(); throw new Error(errorData.error || `HTTP ${res.status}`); }
      setServices(prev => prev.filter(s => s.id !== id));
      console.log('✅ Service deleted:', id);
      alert('✅ Service deleted successfully!');
    } catch (err) { console.error('❌ Failed to delete service:', err); alert('❌ Failed to delete service: ' + err.message); }
    finally { setLoading(false); }
  };

  // ===== ABOUT CRUD =====
  const addAboutSection = async () => {
    if (!aboutForm.title || !aboutForm.content) { alert('⚠️ Title and Content are required'); return; }
    setLoading(true);
    try {
      const body = { ...aboutForm, order_index: Number(aboutForm.order_index) || 0 };
      const res = await fetch(`${API_BASE}/api/about`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(body) });
      if (handleAuthError(res.status)) return;
      if (!res.ok) { const errorData = await res.json(); throw new Error(errorData.error || `HTTP ${res.status}`); }
      const data = await res.json();
      setAboutSections(prev => [...prev, data].sort((a,b) => a.order_index - b.order_index));
      console.log('✅ About section added:', data);
      setAboutForm({ title: '', content: '', image_url: '', is_reverse: false, order_index: 0 });
      alert('✅ About section added successfully!');
    } catch (err) { console.error('❌ Failed to add about section:', err); alert('❌ Failed to add about section: ' + err.message); }
    finally { setLoading(false); }
  };

  const deleteAboutSection = async (id) => {
    if (!window.confirm('Are you sure you want to delete this about section?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/about/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (handleAuthError(res.status)) return;
      if (!res.ok) { const errorData = await res.json(); throw new Error(errorData.error || `HTTP ${res.status}`); }
      setAboutSections(prev => prev.filter(a => a.id !== id));
      console.log('✅ About section deleted:', id);
      alert('✅ About section deleted successfully!');
    } catch (err) { console.error('❌ Failed to delete about section:', err); alert('❌ Failed to delete about section: ' + err.message); }
    finally { setLoading(false); }
  };

  // ===== RENDER =====
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={onLogout} className="admin-logout-btn">Logout</button>
      </div>

      <div className="admin-tabs">
        <button onClick={() => setView('projects')} className={`admin-tab-btn ${view === 'projects' ? 'active' : ''}`}>Projects ({projects.length})</button>
        <button onClick={() => setView('services')} className={`admin-tab-btn ${view === 'services' ? 'active' : ''}`}>Services ({services.length})</button>
        <button onClick={() => setView('about')} className={`admin-tab-btn ${view === 'about' ? 'active' : ''}`}>About ({aboutSections.length})</button>
      </div>

      {loading && (
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <span>Loading...</span>
        </div>
      )}

      {/* ===== Projects Section ===== */}
      {view === 'projects' && (
        <div className="admin-section">
          <h2>Add New Project</h2>
          <div className="admin-form">
            <input type="text" placeholder="Project Title *" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title:e.target.value})} />
            <input type="text" placeholder="Category *" value={projectForm.category} onChange={e => setProjectForm({...projectForm, category:e.target.value})} />
            <input type="text" placeholder="Image URL" value={projectForm.image_url} onChange={e => setProjectForm({...projectForm, image_url:e.target.value})} />
            <textarea placeholder="Project Description" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description:e.target.value})} rows={4}></textarea>
            <input type="text" placeholder="Features (comma-separated)" value={projectForm.features} onChange={e => setProjectForm({...projectForm, features:e.target.value})} />
            <input type="text" placeholder="Technologies (comma-separated)" value={projectForm.tech} onChange={e => setProjectForm({...projectForm, tech:e.target.value})} />
            <input type="text" placeholder="GitHub URL" value={projectForm.github} onChange={e => setProjectForm({...projectForm, github:e.target.value})} />
            <input type="text" placeholder="Live Demo URL" value={projectForm.live} onChange={e => setProjectForm({...projectForm, live:e.target.value})} />
            <button onClick={addProject} disabled={loading}>{loading ? 'Adding...' : 'Add Project'}</button>
          </div>

          {projects.length === 0 ? <p className="admin-empty">No projects yet.</p> :
          <div className="admin-card-grid">
            {projects.map(p => (
              <div key={p.id} className="admin-card">
                {p.image_url && <img src={p.image_url} alt={p.title} onError={e => e.target.style.display='none'} />}
                <div className="admin-card-content">
                  <h4 className="admin-card-title">{p.title}</h4>
                  <span className="admin-category-badge">{p.category}</span>
                  <p className="admin-card-description">{p.description}</p>
                  {p.features?.length>0 && <div className="admin-meta-info"><strong>Features:</strong> {p.features.join(', ')}</div>}
                  {p.tech?.length>0 && <div className="admin-meta-info"><strong>Tech:</strong> {p.tech.join(', ')}</div>}
                  <div className="admin-links">
                    {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="admin-link">GitHub</a>}
                    {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="admin-link">Live Demo</a>}
                  </div>
                </div>
                <button className="admin-delete-btn" onClick={() => deleteProject(p.id)} disabled={loading}>Delete</button>
              </div>
            ))}
          </div>}
        </div>
      )}

      {/* ===== Services Section ===== */}
      {view === 'services' && (
        <div className="admin-section">
          <h2>Add New Service</h2>
          <div className="admin-form">
            <input type="text" placeholder="Service Name *" value={serviceForm.name} onChange={e => setServiceForm({...serviceForm, name:e.target.value})} />
            <textarea placeholder="Service Description" value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description:e.target.value})} rows={3}></textarea>
            <input type="text" placeholder="Points (comma-separated)" value={serviceForm.points} onChange={e => setServiceForm({...serviceForm, points:e.target.value})} />
            <input type="text" placeholder="Image URL" value={serviceForm.image_url} onChange={e => setServiceForm({...serviceForm, image_url:e.target.value})} />
            <button onClick={addService} disabled={loading}>{loading ? 'Adding...' : 'Add Service'}</button>
          </div>

          {services.length === 0 ? <p className="admin-empty">No services yet.</p> :
          <div className="admin-card-grid">
            {services.map(s => (
              <div key={s.id} className="admin-card">
                {s.image_url && <img src={s.image_url} alt={s.name} onError={e => e.target.style.display='none'} />}
                <div className="admin-card-content">
                  <h4 className="admin-card-title">{s.name}</h4>
                  <p className="admin-card-description">{s.description}</p>
                  {s.points?.length>0 && <div className="admin-meta-info"><strong>Points:</strong> {s.points.join(', ')}</div>}
                </div>
                <button className="admin-delete-btn" onClick={() => deleteService(s.id)} disabled={loading}>Delete</button>
              </div>
            ))}
          </div>}
        </div>
      )}

      {/* ===== About Section ===== */}
      {view === 'about' && (
        <div className="admin-section">
          <h2>Add About Section</h2>
          <div className="admin-form">
            <input type="text" placeholder="Title *" value={aboutForm.title} onChange={e => setAboutForm({...aboutForm, title:e.target.value})} />
            <textarea placeholder="Content *" value={aboutForm.content} onChange={e => setAboutForm({...aboutForm, content:e.target.value})} rows={4}></textarea>
            <input type="text" placeholder="Image URL" value={aboutForm.image_url} onChange={e => setAboutForm({...aboutForm, image_url:e.target.value})} />
            <input type="number" placeholder="Order Index" value={aboutForm.order_index} onChange={e => setAboutForm({...aboutForm, order_index:e.target.value})} />
            <label>
              <input type="checkbox" checked={aboutForm.is_reverse} onChange={e => setAboutForm({...aboutForm, is_reverse:e.target.checked})} />
              Reverse Layout
            </label>
            <button onClick={addAboutSection} disabled={loading}>{loading ? 'Adding...' : 'Add About'}</button>
          </div>

          {aboutSections.length === 0 ? <p className="admin-empty">No about sections yet.</p> :
          <div className="admin-card-grid">
            {aboutSections.map(a => (
              <div key={a.id} className={`admin-card ${a.is_reverse ? 'reverse' : ''}`}>
                {a.image_url && <img src={a.image_url} alt={a.title} onError={e => e.target.style.display='none'} />}
                <div className="admin-card-content">
                  <h4 className="admin-card-title">{a.title}</h4>
                  <p className="admin-card-description">{a.content}</p>
                  <div className="admin-meta-info"><strong>Order:</strong> {a.order_index}</div>
                </div>
                <button className="admin-delete-btn" onClick={() => deleteAboutSection(a.id)} disabled={loading}>Delete</button>
              </div>
            ))}
          </div>}
        </div>
      )}

    </div>
  );
}
