const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'emhareHotmail',
    password: 'admin',
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// GET endpoint to fetch suggestions
app.get('/api/suggestions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM suggestions'); // Adjust table name as needed
        res.json(result.rows); // Send the rows as response
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST endpoint to add a new suggestion
app.post('/api/suggestions', async (req, res) => {
    const { title, message, category } = req.body; // Destructure the request body

    try {
        const result = await pool.query(
            'INSERT INTO suggestions (title, message, category) VALUES ($1, $2, $3) RETURNING *',
            [title, message, category] // Use parameterized query to prevent SQL injection
        );
        
        res.status(201).json(result.rows[0]); // Send the newly created suggestion back
    } catch (error) {
        console.error('Error adding suggestion:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST endpoint for user signup
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Store the user in the database
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );

        res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Error during signup:', error);
        if (error.code === '23505') { // Unique violation error code
            res.status(400).json({ message: 'Username already exists. Please choose another.' });
        } else {
            res.status(500).json({ message: 'Signup failed. Please try again.' });
        }
    }
});

// POST endpoint for user login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed. Please try again.' });
    }
});

// Starting the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});