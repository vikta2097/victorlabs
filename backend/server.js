import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

// --- DATABASE CONNECTION ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// --- HANDLE CONNECTION ERRORS ---
pool.on('error', (err) => {
  console.error('❌ Unexpected PostgreSQL error:', err.message);
  process.exit(-1);
});

// --- TEST CONNECTION ---
(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL successfully');
    client.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
})();

const app = express();
app.use(cors());
app.use(express.json());

// --- API ROUTES ---

// ✅ Fetch About Info
app.get('/api/about', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM about LIMIT 1');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching about info:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Update About Info
app.put('/api/about', async (req, res) => {
  try {
    const { content } = req.body;
    await pool.query('UPDATE about SET content=$1 WHERE id=1', [content]);
    res.json({ success: true, message: 'About section updated successfully.' });
  } catch (error) {
    console.error('Error updating about info:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Fetch All Projects
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Add New Project
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, image_url, date_added } = req.body;
    const result = await pool.query(
      `INSERT INTO projects (title, description, image_url, date_added)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, description, image_url, date_added || new Date()]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding project:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Update Existing Project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const { title, description, image_url } = req.body;
    const { id } = req.params;
    await pool.query(
      'UPDATE projects SET title=$1, description=$2, image_url=$3 WHERE id=$4',
      [title, description, image_url, id]
    );
    res.json({ success: true, message: 'Project updated successfully.' });
  } catch (error) {
    console.error('Error updating project:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Delete Project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM projects WHERE id=$1', [id]);
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Error deleting project:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Fetch All Services
app.get('/api/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching services:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Add New Service
app.post('/api/services', async (req, res) => {
  try {
    const { name, description, image_url } = req.body;
    const result = await pool.query(
      `INSERT INTO services (name, description, image_url)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, description, image_url]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding service:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Update Existing Service
app.put('/api/services/:id', async (req, res) => {
  try {
    const { name, description, image_url } = req.body;
    const { id } = req.params;
    await pool.query(
      'UPDATE services SET name=$1, description=$2, image_url=$3 WHERE id=$4',
      [name, description, image_url, id]
    );
    res.json({ success: true, message: 'Service updated successfully.' });
  } catch (error) {
    console.error('Error updating service:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Delete Service
app.delete('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM services WHERE id=$1', [id]);
    res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    console.error('Error deleting service:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- ROOT ENDPOINT (for test) ---
app.get('/', (req, res) => {
  res.send('🚀 Portfolio API running successfully!');
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
