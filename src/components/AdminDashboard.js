import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';

export default function AdminDashboard({ token, onLogout }) {
  const [view, setView] = useState('projects');
  const [loading, setLoading] = useState(false);

  // Data states
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [aboutSections, setAboutSections] = useState([]);

  // Form states
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

  // Helper to get auth headers
  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  // Helper for handling auth errors
  const handleAuthError = (status) => {
    if (status === 401 || status === 403) {
      alert('❌ Session expired. Please login again.');
      onLogout();
      return true;
    }
    return false;
  };

  // ========== FETCH FUNCTIONS ==========
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/projects`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('❌ Failed to fetch projects:', err);
      alert('❌ Failed to fetch projects: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/services`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error('❌ Failed to fetch services:', err);
      alert('❌ Failed to fetch services: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAbout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/about`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAboutSections(data);
    } catch (err) {
      console.error('❌ Failed to fetch about sections:', err);
      alert('❌ Failed to fetch about sections: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ========== PROJECT CRUD ==========
  const addProject = async () => {
  if (!projectForm.title || !projectForm.category) {
    alert('⚠️ Title and Category are required');
    return;
  }

  setLoading(true);
  try {
    // Convert features/tech to arrays first
    const body = {
      ...projectForm,
      features: projectForm.features
        ? projectForm.features.split(',').map(f => f.trim()).filter(Boolean)
        : [],
      tech: projectForm.tech
        ? projectForm.tech.split(',').map(t => t.trim()).filter(Boolean)
        : [],
      date_added: new Date().toISOString()
    };

    const res = await fetch(`${API_BASE}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(body)
    });

    if (handleAuthError(res.status)) return;

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `HTTP ${res.status}`);
    }

    const data = await res.json();
    setProjects(prev => [data, ...prev]);

    // Reset form
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

    alert('✅ Project added successfully!');
  } catch (err) {
    console.error('❌ Failed to add project:', err);
    alert('❌ Failed to add project: ' + err.message);
  } finally {
    setLoading(false);
  }
};


  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (handleAuthError(res.status)) return;
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }

      setProjects(prev => prev.filter(p => p.id !== id));
      alert('✅ Project deleted successfully!');
    } catch (err) {
      console.error('❌ Failed to delete project:', err);
      alert('❌ Failed to delete project: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ========== SERVICE CRUD ==========
  const addService = async () => {
    if (!serviceForm.name) {
      alert('⚠️ Service name is required');
      return;
    }

    setLoading(true);
    try {
      const body = {
        ...serviceForm,
        points: serviceForm.points 
          ? serviceForm.points.split(',').map(p => p.trim()).filter(Boolean) 
          : []
      };

      const res = await fetch(`${API_BASE}/api/services`, {
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
      setServices(prev => [data, ...prev]);
      
      // Reset form
      setServiceForm({
        name: '',
        description: '',
        points: '',
        image_url: ''
      });
      
      alert('✅ Service added successfully!');
    } catch (err) {
      console.error('❌ Failed to add service:', err);
      alert('❌ Failed to add service: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (handleAuthError(res.status)) return;
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }

      setServices(prev => prev.filter(s => s.id !== id));
      alert('✅ Service deleted successfully!');
    } catch (err) {
      console.error('❌ Failed to delete service:', err);
      alert('❌ Failed to delete service: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ========== ABOUT CRUD ==========
  const addAboutSection = async () => {
    if (!aboutForm.title || !aboutForm.content) {
      alert('⚠️ Title and Content are required');
      return;
    }

    setLoading(true);
    try {
      const body = {
        ...aboutForm,
        order_index: Number(aboutForm.order_index) || 0
      };

      const res = await fetch(`${API_BASE}/api/about`, {
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
      setAboutSections(prev => [...prev, data].sort((a, b) => a.order_index - b.order_index));
      
      // Reset form
      setAboutForm({
        title: '',
        content: '',
        image_url: '',
        is_reverse: false,
        order_index: 0
      });
      
      alert('✅ About section added successfully!');
    } catch (err) {
      console.error('❌ Failed to add about section:', err);
      alert('❌ Failed to add about section: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAboutSection = async (id) => {
    if (!window.confirm('Are you sure you want to delete this about section?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/about/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (handleAuthError(res.status)) return;
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }

      setAboutSections(prev => prev.filter(a => a.id !== id));
      alert('✅ About section deleted successfully!');
    } catch (err) {
      console.error('❌ Failed to delete about section:', err);
      alert('❌ Failed to delete about section: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ========== RENDER ==========
  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
        <button onClick={onLogout} style={logoutBtn}>
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={tabsContainer}>
        <button 
          onClick={() => setView('projects')} 
          style={view === 'projects' ? activeTabBtn : tabBtn}
        >
          Projects ({projects.length})
        </button>
        <button 
          onClick={() => setView('services')} 
          style={view === 'services' ? activeTabBtn : tabBtn}
        >
          Services ({services.length})
        </button>
        <button 
          onClick={() => setView('about')} 
          style={view === 'about' ? activeTabBtn : tabBtn}
        >
          About ({aboutSections.length})
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div style={loadingStyle}>
          <div style={spinnerStyle}></div>
          <span>Loading...</span>
        </div>
      )}

      {/* ========== PROJECTS VIEW ========== */}
      {view === 'projects' && (
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Add New Project</h2>
          <div style={formStyle}>
            <input
              style={inputStyle}
              type="text"
              placeholder="Project Title *"
              value={projectForm.title}
              onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Category (e.g., Web Development) *"
              value={projectForm.category}
              onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Image URL"
              value={projectForm.image_url}
              onChange={e => setProjectForm({ ...projectForm, image_url: e.target.value })}
            />
            <textarea
              style={textareaStyle}
              placeholder="Project Description"
              value={projectForm.description}
              onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
              rows={4}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Features (comma-separated)"
              value={projectForm.features}
              onChange={e => setProjectForm({ ...projectForm, features: e.target.value })}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Technologies (comma-separated)"
              value={projectForm.tech}
              onChange={e => setProjectForm({ ...projectForm, tech: e.target.value })}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="GitHub URL"
              value={projectForm.github}
              onChange={e => setProjectForm({ ...projectForm, github: e.target.value })}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Live Demo URL"
              value={projectForm.live}
              onChange={e => setProjectForm({ ...projectForm, live: e.target.value })}
            />
            <button 
              style={addBtn} 
              onClick={addProject}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Project'}
            </button>
          </div>

          <h3 style={sectionTitle}>Existing Projects</h3>
          {projects.length === 0 ? (
            <p style={emptyState}>No projects yet. Add your first project above!</p>
          ) : (
            <div style={cardGrid}>
              {projects.map(project => (
                <div key={project.id} style={cardStyle}>
                  {project.image_url && (
                    <img 
                      src={project.image_url} 
                      alt={project.title}
                      style={cardImage}
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <div style={cardContent}>
                    <h4 style={cardTitle}>{project.title}</h4>
                    <span style={categoryBadge}>{project.category}</span>
                    <p style={cardDescription}>{project.description}</p>
                    
                    {project.features && project.features.length > 0 && (
                      <div style={metaInfo}>
                        <strong>Features:</strong> {project.features.join(', ')}
                      </div>
                    )}
                    
                    {project.tech && project.tech.length > 0 && (
                      <div style={metaInfo}>
                        <strong>Tech:</strong> {project.tech.join(', ')}
                      </div>
                    )}
                    
                    <div style={linksContainer}>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                          GitHub
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                  <button 
                    style={deleteBtn} 
                    onClick={() => deleteProject(project.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========== SERVICES VIEW ========== */}
      {view === 'services' && (
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Add New Service</h2>
          <div style={formStyle}>
            <input
              style={inputStyle}
              type="text"
              placeholder="Service Name *"
              value={serviceForm.name}
              onChange={e => setServiceForm({ ...serviceForm, name: e.target.value })}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Image URL"
              value={serviceForm.image_url}
              onChange={e => setServiceForm({ ...serviceForm, image_url: e.target.value })}
            />
            <textarea
              style={textareaStyle}
              placeholder="Service Description"
              value={serviceForm.description}
              onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })}
              rows={4}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Key Points (comma-separated)"
              value={serviceForm.points}
              onChange={e => setServiceForm({ ...serviceForm, points: e.target.value })}
            />
            <button 
              style={addBtn} 
              onClick={addService}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Service'}
            </button>
          </div>

          <h3 style={sectionTitle}>Existing Services</h3>
          {services.length === 0 ? (
            <p style={emptyState}>No services yet. Add your first service above!</p>
          ) : (
            <div style={cardGrid}>
              {services.map(service => (
                <div key={service.id} style={cardStyle}>
                  {service.image_url && (
                    <img 
                      src={service.image_url} 
                      alt={service.name}
                      style={cardImage}
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <div style={cardContent}>
                    <h4 style={cardTitle}>{service.name}</h4>
                    <p style={cardDescription}>{service.description}</p>
                    
                    {service.points && service.points.length > 0 && (
                      <ul style={listStyle}>
                        {service.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button 
                    style={deleteBtn} 
                    onClick={() => deleteService(service.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========== ABOUT VIEW ========== */}
      {view === 'about' && (
        <div style={sectionStyle}>
          <h2 style={sectionTitle}>Add New About Section</h2>
          <div style={formStyle}>
            <input
              style={inputStyle}
              type="text"
              placeholder="Section Title *"
              value={aboutForm.title}
              onChange={e => setAboutForm({ ...aboutForm, title: e.target.value })}
            />
            <textarea
              style={{ ...textareaStyle, minHeight: 120 }}
              placeholder="Section Content *"
              value={aboutForm.content}
              onChange={e => setAboutForm({ ...aboutForm, content: e.target.value })}
              rows={6}
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Image URL"
              value={aboutForm.image_url}
              onChange={e => setAboutForm({ ...aboutForm, image_url: e.target.value })}
            />
            <div style={checkboxContainer}>
              <label style={checkboxLabel}>
                <input
                  type="checkbox"
                  checked={aboutForm.is_reverse}
                  onChange={e => setAboutForm({ ...aboutForm, is_reverse: e.target.checked })}
                  style={{ marginRight: 8 }}
                />
                Reverse Layout (Image on right side)
              </label>
            </div>
            <input
              style={inputStyle}
              type="number"
              placeholder="Display Order (0 = first)"
              value={aboutForm.order_index}
              onChange={e => setAboutForm({ ...aboutForm, order_index: e.target.value })}
            />
            <button 
              style={addBtn} 
              onClick={addAboutSection}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Section'}
            </button>
          </div>

          <h3 style={sectionTitle}>Existing About Sections</h3>
          {aboutSections.length === 0 ? (
            <p style={emptyState}>No about sections yet. Add your first section above!</p>
          ) : (
            <div style={cardGrid}>
              {aboutSections.map(section => (
                <div key={section.id} style={cardStyle}>
                  {section.image_url && (
                    <img 
                      src={section.image_url} 
                      alt={section.title}
                      style={cardImage}
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <div style={cardContent}>
                    <h4 style={cardTitle}>{section.title}</h4>
                    <p style={cardDescription}>{section.content}</p>
                    <div style={metaInfo}>
                      <strong>Order:</strong> {section.order_index} | 
                      <strong> Layout:</strong> {section.is_reverse ? 'Reversed' : 'Normal'}
                    </div>
                  </div>
                  <button 
                    style={deleteBtn} 
                    onClick={() => deleteAboutSection(section.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ========== STYLES ==========
const containerStyle = {
  padding: '30px',
  maxWidth: '1400px',
  margin: '0 auto',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  backgroundColor: '#f5f7fa',
  minHeight: '100vh'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
};

const tabsContainer = {
  display: 'flex',
  gap: '10px',
  marginBottom: '30px'
};

const tabBtn = {
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#fff',
  color: '#666',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: '500',
  transition: 'all 0.2s',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const activeTabBtn = {
  ...tabBtn,
  backgroundColor: '#007BFF',
  color: '#fff',
  boxShadow: '0 4px 12px rgba(0,123,255,0.3)'
};

const logoutBtn = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#6c757d',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s'
};

const sectionStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '30px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
};

const sectionTitle = {
  marginTop: '0',
  marginBottom: '20px',
  color: '#333',
  fontSize: '24px',
  fontWeight: '600'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  marginBottom: '40px',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e9ecef'
};

const inputStyle = {
  padding: '12px 16px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  fontSize: '15px',
  transition: 'border-color 0.2s',
  outline: 'none'
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
  fontFamily: 'inherit',
  minHeight: '80px'
};

const checkboxContainer = {
  padding: '10px 0'
};

const checkboxLabel = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '15px',
  color: '#333',
  cursor: 'pointer'
};

const addBtn = {
  padding: '14px 28px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#28a745',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '600',
  transition: 'all 0.2s',
  alignSelf: 'flex-start'
};

const deleteBtn = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: '#dc3545',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s',
  alignSelf: 'flex-start'
};

const cardGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '20px'
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  border: '1px solid #e9ecef',
  borderRadius: '10px',
  overflow: 'hidden',
  transition: 'transform 0.2s, box-shadow 0.2s',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
};

const cardImage = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  backgroundColor: '#f8f9fa'
};

const cardContent = {
  padding: '20px',
  flex: 1
};

const cardTitle = {
  margin: '0 0 10px 0',
  fontSize: '20px',
  fontWeight: '600',
  color: '#333'
};

const categoryBadge = {
  display: 'inline-block',
  padding: '4px 12px',
  backgroundColor: '#007BFF',
  color: '#fff',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '500',
  marginBottom: '12px'
};

const cardDescription = {
  margin: '12px 0',
  color: '#666',
  fontSize: '14px',
  lineHeight: '1.6'
};

const metaInfo = {
  fontSize: '13px',
  color: '#666',
  marginTop: '10px',
  padding: '8px 0',
  borderTop: '1px solid #e9ecef'
};

const linksContainer = {
  display: 'flex',
  gap: '12px',
  marginTop: '15px'
};

const linkStyle = {
  color: '#007BFF',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500'
};

const listStyle = {
  margin: '10px 0',
  paddingLeft: '20px',
  color: '#666',
  fontSize: '14px',
  lineHeight: '1.8'
};

const emptyState = {
  textAlign: 'center',
  padding: '40px',
  color: '#999',
  fontSize: '16px'
};

const loadingStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  marginBottom: '20px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  color: '#007BFF',
  fontSize: '16px',
  fontWeight: '500'
};

const spinnerStyle = {
  width: '20px',
  height: '20px',
  border: '3px solid #f3f3f3',
  borderTop: '3px solid #007BFF',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
};