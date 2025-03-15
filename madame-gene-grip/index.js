const express = require('express');
const cookieParser = require('cookie-parser');
const Database = require('better-sqlite3');
const db = new Database('users.db');
const { getAuthJwt } = require('./auth'); // Assuming you have a function to generate JWTs

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/api/login', (req, res) => {
    let { username, password, action } = req.body;

    if (!username || !password) {
        res.cookie('error', 'Missing credentials');
        res.redirect(req.get("Referrer") || "/");
        return;
    }

    let user = db.prepare(`SELECT username, password FROM users WHERE username = ?`).get(username);

    if (!user || user.password !== password) {
        res.cookie('error', 'Invalid credentials');
        res.redirect(req.get("Referrer") || "/");
        return;
    }

    if (action == 'recover') {
        res.cookie('recover_username', user.username);
        res.redirect("/recover.html");
        return;
    }

    let token = getAuthJwt(user.username);
    res.cookie('auth', token);
    res.redirect('/dashboard.html');
});

app.post('/api/recover', (req, res) => {
    let { recovery_token } = req.body;

    let user = db.prepare(`SELECT * FROM users WHERE recovery_token = ?`).get(recovery_token);

    if (!user) {
        res.cookie('error', 'Invalid recovery token');
        res.redirect(req.get("Referrer") || "/");
        return;
    }

    let token = getAuthJwt(user.username);
    res.cookie('auth', token);
    res.redirect('/dashboard.html');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
