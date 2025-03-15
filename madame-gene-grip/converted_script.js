const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./wfwassucqvr"); // Assuming you have a database connection setup
const { getAuthJwt } = require("./auth"); // Assuming you have this function defined

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/api/login", (req, res) => {
    let { username, password, action } = req.body;

    // Use parameterized query to prevent SQL Injection
    let user = db.prepare("SELECT username, password FROM users WHERE username = ?").get(username);

    if (!user) {
        res.cookie("error", "Invalid username or password");
        res.redirect("/login.html");
        return;
    }

    if (action === "recover") {
        res.cookie("recover_username", user.username);
        res.redirect("/recover.html");
        return;
    }

    let token = getAuthJwt(user.username);
    res.cookie("auth", token);
    res.redirect("/dashboard.html");
});

app.post("/api/recover", (req, res) => {
    let { recovery_token } = req.body;

    if (!recovery_token) {
        res.cookie("error", "Recovery token is required");
        res.redirect(req.get("Referrer") || "/");
        return;
    }

    // Secure parameterized query
    let user = db.prepare("SELECT * FROM users WHERE recovery_token = ?").get(recovery_token);

    if (!user) {
        res.cookie("error", "Invalid recovery token");
        res.redirect(req.get("Referrer") || "/");
        return;
    }

    let token = getAuthJwt(user.username);
    res.cookie("auth", token);
    res.redirect("/dashboard.html");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
