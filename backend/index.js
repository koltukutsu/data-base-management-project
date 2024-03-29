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
    getSeasons,
    updateOffers,
    updateUserBalanceForBuyingProduct,
    getOffersBasedOnOrganization,
    getProductsBasedOnOrganization,
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
app.get('/offersspecial/:organizationName/:season/:amountOfPeople', async (req, res) => {
    const organizationName = req.params.organizationName;
    const season = req.params.season;
    const amountOfPeople = req.params.amountOfPeople;
    const result = await getOffersBasedOnOrganization(organizationName, season, amountOfPeople);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'No offers found' });
    }
});

// // route for getting all of organizations
// app.get('/specialorganizations/:organizationName', async (req, res) => {
//     const organizationName = req.params.organizationName;
//     const result = await getProductsBasedOnOrganization(organizationName);

//     if (result) {
//         res.json(result);
//     } else {
//         res.status(404).json({ message: 'No organizations found' });
//     }
// });

app.get('/companies', async (req, res) => {
    const result = await getCompanies();

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'No companies found' });
    }
});

// get products based on the organization name
app.get('/products/:organizationName', async (req, res) => {
    const organizationName = req.params.organizationName;
    const result = await getProductsBasedOnOrganization(organizationName);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Products are not found' });
    }
});


// Route for getting specific organizations
app.get('/organizations', async (req, res) => {
    const result = await getOrganizations();

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
app.put('/offers/:userId/:offerId', async (req, res) => {
    const userId = req.params.userId;
    const offerId = req.params.offerId;
    const result = await updateOffers(userId, offerId);

    if (result) {
        res.json({ message: 'Offer updated successfully' });
    } else {
        res.status(500).json({ message: 'Failed to update offer' });
    }
});

app.put('/users/:userId/:productId/:moneyAmount', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const moneyAmount = req.params.moneyAmount;
    const result = await updateUserBalanceForBuyingProduct(userId, productId, moneyAmount);

    if (result) {
        res.json({ message: 'User and product updated successfully' });
    } else {
        res.status(500).json({ message: 'Failed to update and product user' });
    }
});

app.get("/seasons", async (req, res) => {
    const result = await getSeasons();
    // console.log(result);
    if (result) {
        return res.json(result);
    } else {
        res.status(404).json({ message: 'No available offers found' });
    }
});

// Route for listing available offers
app.get('/offers/:organizationName/:season/:amountOfPeople', async (req, res) => {
    const organizationName = req.params.organizationName;
    const season = req.params.season;
    const amountOfPeople = req.params.amountOfPeople;
    const result = await listAvailableOffers(organizationName, season, amountOfPeople);

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
