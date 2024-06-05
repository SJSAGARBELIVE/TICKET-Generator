const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE tickets (name TEXT, email TEXT, destination TEXT, date TEXT)");

    const stmt = db.prepare("INSERT INTO tickets VALUES (?, ?, ?, ?)");
    stmt.run("John Doe", "john@example.com", "New York", "2023-12-25");
    stmt.finalize();
});

app.use(express.static(path.join(__dirname)));

app.get('/api/tickets', (req, res) => {
    db.all("SELECT * FROM tickets", [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
