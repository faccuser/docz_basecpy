const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'database.sqlite');

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));

// Database Initialization
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.serialize(() => {
        // Tutors Table
        db.run(`CREATE TABLE IF NOT EXISTS tutors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cpf TEXT UNIQUE NOT NULL,
            name TEXT
        )`);

        // Pets Table
        db.run(`CREATE TABLE IF NOT EXISTS pets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tutor_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            species TEXT,
            breed TEXT,
            FOREIGN KEY (tutor_id) REFERENCES tutors (id)
        )`);

        // Applications Table
        db.run(`CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pet_id INTEGER NOT NULL,
            type TEXT NOT NULL, -- vacina, verme, pulga
            description TEXT NOT NULL,
            date TEXT NOT NULL,
            next_due_date TEXT NOT NULL,
            FOREIGN KEY (pet_id) REFERENCES pets (id)
        )`);
    });
}

// --- API Routes ---

// 1. Auth/Login: Get or create tutor by CPF
app.post('/api/login', (req, res) => {
    const { cpf } = req.body;
    if (!cpf) return res.status(400).json({ error: 'CPF é obrigatório' });

    db.get('SELECT * FROM tutors WHERE cpf = ?', [cpf], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) {
            res.json(row);
        } else {
            // New user, create
            db.run('INSERT INTO tutors (cpf, name) VALUES (?, ?)', [cpf, `Tutor ${cpf}`], function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ id: this.lastID, cpf, name: `Tutor ${cpf}` });
            });
        }
    });
});

// 2. Pets: List by Tutor
app.get('/api/pets', (req, res) => {
    const tutor_id = req.query.tutor_id;
    if (!tutor_id) return res.status(400).json({ error: 'tutor_id é obrigatório' });

    db.all('SELECT * FROM pets WHERE tutor_id = ?', [tutor_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 3. Pets: Create
app.post('/api/pets', (req, res) => {
    const { tutor_id, name, species, breed } = req.body;
    if (!tutor_id || !name) return res.status(400).json({ error: 'Dados incompletos' });

    db.run('INSERT INTO pets (tutor_id, name, species, breed) VALUES (?, ?, ?, ?)', 
        [tutor_id, name, species, breed], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, tutor_id, name, species, breed });
    });
});

// 4. Applications: List by Pet
app.get('/api/pets/:id/applications', (req, res) => {
    const pet_id = req.params.id;
    db.all('SELECT * FROM applications WHERE pet_id = ? ORDER BY date DESC', [pet_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 5. Applications: Add
app.post('/api/pets/:id/applications', (req, res) => {
    const pet_id = req.params.id;
    const { type, description, date, cycle_days = 365 } = req.body;
    
    if (!type || !description || !date) return res.status(400).json({ error: 'Dados incompletos' });

    const next_due_date = new Date(new Date(date).getTime() + (cycle_days * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    db.run('INSERT INTO applications (pet_id, type, description, date, next_due_date) VALUES (?, ?, ?, ?, ?)',
        [pet_id, type, description, date, next_due_date], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, pet_id, type, description, date, next_due_date });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});