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
    id: null, title: '', category: '', description: '', image_url: '', features: '', tech: '', github: '', live: ''
  });

  const [serviceForm, setServiceForm] = useState({
    id: null, name: '', description: '', points: '', image_url: ''
  });

  const [aboutForm, setAboutForm] = useState({
    id: null, title: '', content: '', image_url: '', is_reverse: false, order_index: 0
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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
      alert('❌ Failed to fetch about sections: ' + err.message);
    } finally { setLoading(false); }
  };

  // ===== SAVE/ADD FUNCTIONS =====
  const saveProject = async () => {
    if (!projectForm.title || !projectForm.category) { alert('⚠️ Title and Category are required'); return; }
    setLoading(true);
    try {
      const body = {
        ...projectForm,
        features: projectForm.features ? projectForm.features.split(',').map(f => f.trim()).filter(Boolean) : [],
        tech: projectForm.tech ? projectForm.tech.split(',').map(t => t.trim()).filter(Boolean) : [],
        date_added: new Date().toISOString()
      };

      const method = projectForm.id ? 'PUT' : 'POST';
      const url = projectForm.id ? `${API_BASE}/api/projects/${projectForm.id}` : `${API_BASE}/api/projects`;

      const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(body) });
      if (handleAuthError(res.status)) return;
      if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
      const data = await res.json();

      setProjects(prev => {
        if (projectForm.id) return prev.map(p => p.id === data.id ? data : p);
        return [data, ...prev];
      });
      setProjectForm({ id: null, title: '', category: '', description: '', image_url: '', features: '', tech: '', github: '', live: '' });
      alert(`✅ Project ${method === 'POST' ? 'added' : 'updated'} successfully!`);
    } catch (err) { alert('❌ Failed to save project: ' + err.message); }
    finally { setLoading(false); }
  };

  const saveService = async () => {
    if (!serviceForm.name) { alert('⚠️ Service name is required'); return; }
    setLoading(true);
    try {
      const body = { ...serviceForm, points: serviceForm.points ? serviceForm.points.split(',').map(p => p.trim()).filter(Boolean) : [] };
      const method = serviceForm.id ? 'PUT' : 'POST';
      const url = serviceForm.id ? `${API_BASE}/api/services/${serviceForm.id}` : `${API_BASE}/api/services`;

      const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(body) });
      if (handleAuthError(res.status)) return;
      if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
      const data = await res.json();

      setServices(prev => {
        if (serviceForm.id) return prev.map(s => s.id === data.id ? data : s);
        return [data, ...prev];
      });
      setServiceForm({ id: null, name: '', description: '', points: '', image_url: '' });
      alert(`✅ Service ${method === 'POST' ? 'added' : 'updated'} successfully!`);
    } catch (err) { alert('❌ Failed to save service: ' + err.message); }
    finally { setLoading(false); }
  };

  const saveAboutSection = async () => {
    if (!aboutForm.title || !aboutForm.content) { alert('⚠️ Title and Content are required'); return; }
    setLoading(true);
    try {
      const body = { ...aboutForm, order_index: Number(aboutForm.order_index) || 0 };
      const method = aboutForm.id ? 'PUT' : 'POST';
      const url = aboutForm.id ? `${API_BASE}/api/about/${aboutForm.id}` : `${API_BASE}/api/about`;

      const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(body) });
      if (handleAuthError(res.status)) return;
      if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
      const data = await res.json();

      setAboutSections(prev => {
        if (aboutForm.id) return prev.map(a => a.id === data.id ? data : a).sort((a,b) => a.order_index - b.order_index);
        return [...prev, data].sort((a,b) => a.order_index - b.order_index);
      });

      setAboutForm({ id: null, title: '', content: '', image_url: '', is_reverse: false, order_index: 0 });
      alert(`✅ About section ${method === 'POST' ? 'added' : 'updated'} successfully!`);
    } catch (err) { alert('❌ Failed to save about section: ' + err.message); }
    finally { setLoading(false); }
  };

  // ===== DELETE FUNCTIONS =====
  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (handleAuthError(res.status)) return;
      if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) { alert('❌ Failed to delete project: ' + err.message); }
    finally { setLoading(false); }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/services/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (handleAuthError(res.status)) return;
      if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (err) { alert('❌ Failed to delete service: ' + err.message); }
    finally { setLoading(false); }
  };

  const deleteAboutSection = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/about/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (handleAuthError(res.status)) return;
      if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
      setAboutSections(prev => prev.filter(a => a.id !== id));
    } catch (err) { alert('❌ Failed to delete about section: ' + err.message); }
    finally { setLoading(false); }
  };

  // ===== EDIT HANDLERS =====
  const editProject = (p) => setProjectForm({ ...p, features: p.features?.join(', '), tech: p.tech?.join(', ') });
  const editService = (s) => setServiceForm({ ...s, points: s.points?.join(', ') });
  const editAbout = (a) => setAboutForm({ ...a });

  // ===== RENDER =====
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={onLogout} className="admin-logout-btn">Logout</button>
      </div>

      <div className="admin-tabs">
        <button onClick={() => setView('projects')} className={`admin-tab-btn ${view==='projects'?'active':''}`}>Projects ({projects.length})</button>
        <button onClick={() => setView('services')} className={`admin-tab-btn ${view==='services'?'active':''}`}>Services ({services.length})</button>
        <button onClick={() => setView('about')} className={`admin-tab-btn ${view==='about'?'active':''}`}>About ({aboutSections.length})</button>
      </div>

      {loading && <div className="admin-loading"><div className="admin-spinner"></div>Loading...</div>}

      {/* ===== Projects ===== */}
      {view==='projects' &&
        <div className="admin-section">
          <h2>{projectForm.id ? 'Edit Project' : 'Add New Project'}</h2>
          <div className="admin-form">
            <input type="text" placeholder="Project Title *" value={projectForm.title} onChange={e=>setProjectForm({...projectForm,title:e.target.value})}/>
            <input type="text" placeholder="Category *" value={projectForm.category} onChange={e=>setProjectForm({...projectForm,category:e.target.value})}/>
            <input type="text" placeholder="Image URL" value={projectForm.image_url} onChange={e=>setProjectForm({...projectForm,image_url:e.target.value})}/>
            <textarea placeholder="Description" rows={4} value={projectForm.description} onChange={e=>setProjectForm({...projectForm,description:e.target.value})}/>
            <input type="text" placeholder="Features (comma-separated)" value={projectForm.features} onChange={e=>setProjectForm({...projectForm,features:e.target.value})}/>
            <input type="text" placeholder="Technologies (comma-separated)" value={projectForm.tech} onChange={e=>setProjectForm({...projectForm,tech:e.target.value})}/>
            <input type="text" placeholder="GitHub URL" value={projectForm.github} onChange={e=>setProjectForm({...projectForm,github:e.target.value})}/>
            <input type="text" placeholder="Live Demo URL" value={projectForm.live} onChange={e=>setProjectForm({...projectForm,live:e.target.value})}/>

            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={saveProject} disabled={loading}>{projectForm.id?'Update Project':'Add Project'}</button>
              {projectForm.id && <button onClick={()=>setProjectForm({id:null,title:'',category:'',description:'',image_url:'',features:'',tech:'',github:'',live:''})} disabled={loading}>Cancel</button>}
            </div>
          </div>

          <div className="admin-card-grid">
            {projects.map(p=>(
              <div key={p.id} className="admin-card">
                {p.image_url && <img src={p.image_url} alt={p.title} onError={e=>e.target.style.display='none'} />}
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
                <button className="admin-delete-btn" onClick={()=>deleteProject(p.id)}>Delete</button>
                <button style={{margin:'5px'}} onClick={()=>editProject(p)}>Edit</button>
              </div>
            ))}
          </div>
        </div>
      }

      {/* ===== Services ===== */}
      {view==='services' &&
        <div className="admin-section">
          <h2>{serviceForm.id?'Edit Service':'Add New Service'}</h2>
          <div className="admin-form">
            <input type="text" placeholder="Service Name *" value={serviceForm.name} onChange={e=>setServiceForm({...serviceForm,name:e.target.value})}/>
            <textarea placeholder="Description" rows={3} value={serviceForm.description} onChange={e=>setServiceForm({...serviceForm,description:e.target.value})}/>
            <input type="text" placeholder="Points (comma-separated)" value={serviceForm.points} onChange={e=>setServiceForm({...serviceForm,points:e.target.value})}/>
            <input type="text" placeholder="Image URL" value={serviceForm.image_url} onChange={e=>setServiceForm({...serviceForm,image_url:e.target.value})}/>

            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={saveService}>{serviceForm.id?'Update Service':'Add Service'}</button>
              {serviceForm.id && <button onClick={()=>setServiceForm({id:null,name:'',description:'',points:'',image_url:''})}>Cancel</button>}
            </div>
          </div>

          <div className="admin-card-grid">
            {services.map(s=>(
              <div key={s.id} className="admin-card">
                {s.image_url && <img src={s.image_url} alt={s.name} onError={e=>e.target.style.display='none'} />}
                <div className="admin-card-content">
                  <h4 className="admin-card-title">{s.name}</h4>
                  <p className="admin-card-description">{s.description}</p>
                  {s.points?.length>0 && <div className="admin-meta-info"><strong>Points:</strong> {s.points.join(', ')}</div>}
                </div>
                <button className="admin-delete-btn" onClick={()=>deleteService(s.id)}>Delete</button>
                <button style={{margin:'5px'}} onClick={()=>editService(s)}>Edit</button>
              </div>
            ))}
          </div>
        </div>
      }

      {/* ===== About ===== */}
      {view==='about' &&
        <div className="admin-section">
          <h2>{aboutForm.id?'Edit About':'Add About Section'}</h2>
          <div className="admin-form">
            <input type="text" placeholder="Title *" value={aboutForm.title} onChange={e=>setAboutForm({...aboutForm,title:e.target.value})}/>
            <textarea placeholder="Content *" rows={4} value={aboutForm.content} onChange={e=>setAboutForm({...aboutForm,content:e.target.value})}/>
            <input type="text" placeholder="Image URL" value={aboutForm.image_url} onChange={e=>setAboutForm({...aboutForm,image_url:e.target.value})}/>
            <input type="number" placeholder="Order Index" value={aboutForm.order_index} onChange={e=>setAboutForm({...aboutForm,order_index:e.target.value})}/>
            <label>
              <input type="checkbox" checked={aboutForm.is_reverse} onChange={e=>setAboutForm({...aboutForm,is_reverse:e.target.checked})}/>
              Reverse Layout
            </label>

            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={saveAboutSection}>{aboutForm.id?'Update About':'Add About'}</button>
              {aboutForm.id && <button onClick={()=>setAboutForm({id:null,title:'',content:'',image_url:'',is_reverse:false,order_index:0})}>Cancel</button>}
            </div>
          </div>

          <div className="admin-card-grid">
            {aboutSections.map(a=>(
              <div key={a.id} className={`admin-card ${a.is_reverse?'reverse':''}`}>
                {a.image_url && <img src={a.image_url} alt={a.title} onError={e=>e.target.style.display='none'} />}
                <div className="admin-card-content">
                  <h4 className="admin-card-title">{a.title}</h4>
                  <p className="admin-card-description">{a.content}</p>
                  <div className="admin-meta-info">Order: {a.order_index}</div>
                </div>
                <button className="admin-delete-btn" onClick={()=>deleteAboutSection(a.id)}>Delete</button>
                <button style={{margin:'5px'}} onClick={()=>editAbout(a)}>Edit</button>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
}
