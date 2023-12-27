//// server
const express = require("express")
const { authenticateUser } = require("./database")
const app = express()
const cors = require("cors"); // Import the cors middleware
const port = 3200
//// pg, database

app.use(cors())

// Set up an authentication endpoint
app.post("/authenticate", express.json(), async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    const user = await authenticateUser(username, password);

    if (user) {
        // Authentication successful
        return res.status(200).json({ success: true, user });
    } else {
        // Authentication failed
        console.log("AUTHENTICATION: user is not found ->", username, password)
        return res.status(401).json(null);
    }
});

app.get("/organizations", async (req, res) => {
    const organizations = await getOrganizations();
    if (organizations) {
        return res.status(200).json({ success: true, organizations });
    } else {
        return res.status(401).json(null);
    }
});

app.get("/company", async (req, res) => {
    const company = await getCompany();
    if (company) {
        return res.status(200).json({ success: true, company });
    } else {
        return res.status(401).json(null);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});