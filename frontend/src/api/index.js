const BASE_URL = 'http://localhost:3200';

const api = {
    welcomeMessage: async () => {
        try {
            const response = await fetch(`${BASE_URL}/`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    authenticateUser: async (username, password) => {
        try {
            const response = await fetch(`${BASE_URL}/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            return response;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    getUserInfo: async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}`);
            const data = await response.json();
            console.log("getUserInfo: ", data)
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    addUser: async (username, password) => {
        try {
            const response = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            // const data = await response.json();
            return response;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    getOffersBasedOnOrganization: async (organizationName, season, amountOfPeople) => {
        try {
            const response = await fetch(`${BASE_URL}/offersspecial/${organizationName}/${season}/${amountOfPeople}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    getOrganizations: async (organizationName = null) => {
        try {
            const endpoint = organizationName
                ? `${BASE_URL}/organizations/${organizationName}`
                : `${BASE_URL}/organizations`;
            const response = await fetch(endpoint);
            const data = await response.json();
            console.table(data)
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },
    getCompanies: async () => {
        try {
            const endpoint = `${BASE_URL}/companies`;
            console.log(endpoint)
            const response = await fetch(endpoint);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    getProducts: async (organizationName) => {
        try {
            const endpoint = `${BASE_URL}/products/${organizationName}`;
            console.log(endpoint)
            const response = await fetch(endpoint);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },


    deleteUser: async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    updateOffers: async (userId, offerId) => {
        try {
            const response = await fetch(`${BASE_URL}/offers/${userId}/${offerId}`, {
                method: 'PUT'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    listAvailableOffers: async (organizationName, season, amountOfPeople) => {
        try {
            console.log("listAvailableOffers: ", organizationName, season, amountOfPeople)
            const endpoint = `${BASE_URL}/offers/${organizationName}/${season}/${amountOfPeople}`;
            const response = await fetch(endpoint);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in listing available offers:', error);
        }
    },

    getSeasons: async () => {
        try {
            const endpoint = `${BASE_URL}/seasons`;
            console.log(endpoint)
            const response = await fetch(endpoint);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },
};

export default api;
