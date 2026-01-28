require('dotenv').config(); // Load .env variables
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Middleware
const allowedOrigins = [
    'https://therock.halosos.com',
    process.env.FRONTEND_URL // production domain
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Parse JSON bodies
app.use(express.json());



// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false } // required for Azure Flexible Server
});

// Health check (Azure uses this)
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.put('/api/category/:id/accept', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      `UPDATE category
       SET notification_status = 'success'
       WHERE id = $1`
      , [id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


// Get latest click
app.post('/api/category', async (req, res) => {
  const { category_name } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO category (category_name, notification_status)
       VALUES ($1, 'pending')
       RETURNING *`,
      [category_name]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


// Get latest entry
app.get('/api/category/latest', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM category
       WHERE notification_status = 'pending'
       ORDER BY created_at DESC
       LIMIT 1`
    );

    res.json(result.rows[0] ?? null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});


