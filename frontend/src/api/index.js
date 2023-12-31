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

    addUser: async (username, password) => {
        try {
            const response = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
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

    updateOffers: async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/offers/${userId}`, {
                method: 'PUT'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    listAvailableOffers: async (userId = null) => {
        try {
            const endpoint = userId
                ? `${BASE_URL}/offers/${userId}`
                : `${BASE_URL}/offers`;

            const response = await fetch(endpoint);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }
};

export default api;
