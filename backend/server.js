import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import authRoutes from './routes/auth.js';
import { verifyToken, verifyAdmin } from './middleware/auth.js';

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

// --- CORS CONFIG ---
app.use(cors({
  origin: ["https://victorlabs.netlify.app", "http://localhost:3000"]
}));

app.use(express.json());

// --- AUTH ROUTES ---
app.use('/api/auth', authRoutes);

// ===== CREATE DEFAULT ADMIN =====
const ensureDefaultAdmin = async () => {
  try {
    const result = await pool.query(
      "SELECT * FROM usercredentials WHERE role = 'admin' LIMIT 1"
    );

    if (result.rows.length === 0) {
      console.log("⚠️ Creating default admin...");
      const hash = await bcrypt.hash("vikta2097", 10);
      await pool.query(
        "INSERT INTO usercredentials (fullname, email, password_hash, role) VALUES ($1, $2, $3, $4)",
        ["vikta mwangi", "thigamwangi2027@gmail.com", hash, "admin"]
      );
      console.log("✅ Default admin created");
    } else {
      console.log("✅ Admin already exists");
    }
  } catch (error) {
    console.error("❌ Error creating default admin:", error);
  }
};

// Call it at startup
ensureDefaultAdmin();

// --- ABOUT SECTIONS (PUBLIC GET, PROTECTED POST/PUT/DELETE) ---
app.get('/api/about', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM about ORDER BY order_index ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching about info:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/about', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, content, image_url, is_reverse, order_index } = req.body;
    const result = await pool.query(
      `INSERT INTO about (title, content, image_url, is_reverse, order_index)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [title, content, image_url, is_reverse ?? false, order_index ?? 0]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding about section:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/about/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, content, image_url, is_reverse, order_index } = req.body;
    const { id } = req.params;
    await pool.query(
      `UPDATE about
       SET title=$1, content=$2, image_url=$3, is_reverse=$4, order_index=$5
       WHERE id=$6`,
      [title, content, image_url, is_reverse ?? false, order_index ?? 0, id]
    );
    res.json({ success: true, message: 'About section updated successfully.' });
  } catch (error) {
    console.error('Error updating about section:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/about/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM about WHERE id=$1', [id]);
    res.json({ success: true, message: 'About section deleted successfully.' });
  } catch (error) {
    console.error('Error deleting about section:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- PROJECTS (PUBLIC GET, PROTECTED POST/PUT/DELETE) ---
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/projects', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const {
      title, category, description, image_url, features, tech, github, live, date_added
    } = req.body;

    const result = await pool.query(
      `INSERT INTO projects 
       (title, category, description, image_url, features, tech, github, live, date_added)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [
        title, category, description, image_url,
        features || [], tech || [], github || null, live || null,
        date_added || new Date()
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding project:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/projects/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, category, description, image_url, features, tech, github, live } = req.body;
    const { id } = req.params;

    await pool.query(
      `UPDATE projects
       SET title=$1, category=$2, description=$3, image_url=$4, features=$5, tech=$6, github=$7, live=$8
       WHERE id=$9`,
      [title, category, description, image_url, features || [], tech || [], github || null, live || null, id]
    );

    res.json({ success: true, message: 'Project updated successfully.' });
  } catch (error) {
    console.error('Error updating project:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/projects/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM projects WHERE id=$1', [id]);
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Error deleting project:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- SERVICES (PUBLIC GET, PROTECTED POST/PUT/DELETE) ---
app.get('/api/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching services:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/services', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description, points, image_url } = req.body;
    const result = await pool.query(
      `INSERT INTO services (name, description, points, image_url)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [name, description, points || [], image_url]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding service:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/services/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description, points, image_url } = req.body;
    const { id } = req.params;
    await pool.query(
      `UPDATE services
       SET name=$1, description=$2, points=$3, image_url=$4
       WHERE id=$5`,
      [name, description, points || [], image_url, id]
    );
    res.json({ success: true, message: 'Service updated successfully.' });
  } catch (error) {
    console.error('Error updating service:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/services/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM services WHERE id=$1', [id]);
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- ROOT & TEST ---
app.get('/', (req, res) => res.send('🚀 Portfolio API running successfully!'));
app.get('/api/test', (req, res) => res.json({ message: 'API route test successful' }));

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));