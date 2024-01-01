const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
    authenticateUser,
    getUserInfo,
    getOrganizations,
    addUser,
    deleteUser,
    getCompanies,
    updateOffers,
    getOffersBasedOnOrganization,
    listAvailableOffers
} = require('./database.js');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Use JSON parser for handling JSON requests
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the backend of our project, kudos you all!!!" });
});

// Route for authenticating a user
app.post('/authenticate', async (req, res) => {
    const { username, password } = req.body;
    const result = await authenticateUser(username, password);

    if (result) {
        res.json(result);
    } else {
        res.status(401).json({ message: 'Authentication failed' });
    }
});

// get user info
app.get('/users/:userId', async (req, res) => {
    console.log("GET /users/:userId - User Info")
    const userId = req.params.userId;
    const result = await getUserInfo(userId);

    if (result) {
        console.log(result)
        res.json(result);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// get offers based on organization name
app.get('/offersspecial/:organizationName', async (req, res) => {
    const organizationName = req.params.organizationName;
    const result = await getOffersBasedOnOrganization(organizationName);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'No offers found' });
    }
});

// route for getting all of organizations
app.get('/organizations', async (req, res) => {
    const result = await getOrganizations(null);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'No organizations found' });
    }
});

app.get('/companies', async (req, res) => {
    const result = await getCompanies();

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'No companies found' });
    }
});

// Route for getting specific organizations
app.get('/organizations/:organizationName', async (req, res) => {
    const organizationName = req.params.organizationName;
    const result = await getOrganizations(organizationName);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Organization not found' });
    }
});

// Route for adding a user
app.post('/users', async (req, res) => {
    console.log("POST /users")
    const { username, password } = req.body;
    const result = await addUser(username, password);

    if (result) {
        res.json(result);
    } else {
        res.status(500).json({ message: 'Failed to add user' });
    }
});

// Route for deleting a user
app.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const result = await deleteUser(userId);

    if (result) {
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

// Route for updating offers
app.put('/offers/:userId', async (req, res) => {
    const userId = req.params.userId;
    const result = await updateOffers(userId);

    if (result) {
        res.json({ message: 'Offer updated successfully' });
    } else {
        res.status(500).json({ message: 'Failed to update offer' });
    }
});

app.get("/offers", async (req, res) => {
    const result = await listAvailableOffers(null);
    console.log("\tOnly offers")
    // console.log(result);
    if (result) {
        return res.json(result);
    } else {
        res.status(404).json({ message: 'No available offers found' });
    }
});

// Route for listing available offers
app.get('/offers/:userId', async (req, res) => {
    const userId = req.params.userId;
    const result = await listAvailableOffers(userId);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'No available offers found' });
    }
});

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
