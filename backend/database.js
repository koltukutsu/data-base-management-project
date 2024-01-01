const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "project",
    password: "semxhart",
    port: 3000, // default PostgreSQL port
});
//// AUTHENTICATION ////
// 1.1 login
async function authenticateUser(userName, password) {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = `SELECT * FROM users WHERE username = $1 AND pw = $2`;
            const sqlResult = await client.query(sqlQuery, [userName, password]);

            if (sqlResult.rows.length == 0) {
                console.log("Database - authenticateUser(): No user found, return null");
                return null;

            } else {
                console.log("Database: authenticated");
                return sqlResult.rows;
            }
        } catch (err) {
            console.error("Error executing query", err);
        } finally {
            client.release();
        }
    } catch (err1) {
        console.error("Error connecting to the database", err1);
    }

}

async function getUserInfo(userId) {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = `SELECT * FROM getUserInfo($1)`;
            const sqlResult = await client.query(sqlQuery, [userId]);

            if (sqlResult.rows.length == 0) {
                console.log("Database - getUserInfo(): No user found, return null");
                return null;

            } else {
                console.log("Database: getUserInfo");
                console.log(sqlQuery);
                return sqlResult.rows;
            }
        } catch (err) {
            console.error("Error executing query", err);
        } finally {
            client.release();
        }
    } catch (err1) {
        console.error("Error connecting to the database", err1);
    }
}
// 1.1 add user | besides show user an alert that the trigger is run
async function addUser(userName, password) {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = {
                text: 'INSERT INTO users (id, username, pw) VALUES (nextval($1), $2, $3) RETURNING id',
                values: ['users_id_seq', userName, password],
            };

            const sqlResult = await client.query(sqlQuery);

            if (sqlResult.rows.length === 0) {
                return null;
            } else {
                const userId = sqlResult.rows[0].id;
                console.log("Database | addUser(): ", userId)
                return {
                    id: userId,
                };
            }
        } catch (err) {
            console.error("Error executing query", err);
        } finally {
            client.release();
        }
    } catch (err1) {
        console.error("Error connecting to the database", err1);
    }
}

// 1.3 delete user
async function deleteUser(userId) {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = `DELETE FROM users WHERE id = ${userId}`;
            const sqlResult = await client.query(sqlQuery);
            if (sqlResult.rows.length == 0) {
                return null;
            }
            else {
                return true;
            }

        } catch (err) {
            console.error("Error executing query", err);
        } finally {
            client.release();
        }
    } catch (err1) {
        console.error("Error connecting to the database", err1);
    }
}

//// MAIN PAGE ////
async function getOrganizations(organizationName) {
    try {
        const client = await pool.connect();
        try {
            if (organizationName == null) {
                const sqlQuery = `SELECT * FROM organizations   `;
                const sqlResult = await client.query(sqlQuery);
                if (sqlResult.rows.length == 0) {
                    console.log("Database | getOrganizations(): No organization found");
                    console.log("No organization found");
                    return null;
                }
                else {
                    console.log("Database | getOrganizations(): Organization Found");
                    // console.log("Database | getOrganizations(): Organization Found.\nResults: ", sqlResult.rows);

                    return sqlResult.rows;
                }
            }

            const sqlQuery = `SELECT * FROM company_view WHERE org_name =  ${organizationName}`;
            const sqlResult = await client.query(sqlQuery);
            if (sqlResult.rows.length == 0) {
                console.log(`Database | getOrganizations(): No organization found in name ${organizationName}`);
                console.log("No organization found");
                return null;
            }
            else {
                console.log("Database | getOrganizations(): Organization Found.");
                return sqlResult.rows;
            }

        } catch (err) {
            console.error("Error executing query", err);
        } finally {
            client.release();
        }
    } catch (err1) {
        console.error("Error connecting to the database", err1);
    }
}

// 2.2. get offers based on the organization choice

async function getOffersBasedOnOrganization(organizationName) {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = ` * from offerCount($1)`
            const sqlResult = await client.query(sqlQuery, [organizationName]);
            if (sqlResult.rows.length == 0) {
                console.log(`Database | getOffersBasedOnOrganization(): No offer found in name ${organizationName}`);
                console.log("No offer found");
                return null;
            }
            else {
                console.log("Database | getOffersBasedOnOrganization(): Offer Found.");
                return sqlResult.rows;
            }
        } catch (err) {
            console.error("Error executing query", err);
        }
    } catch (err1) {
        console.error("Error connecting to the database", err1);
    }
}

async function getCompanies() {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = `SELECT * FROM companies`;
            const sqlResult = await client.query(sqlQuery);
            if (sqlResult.rows.length == 0) {
                console.log(`Database | getCompanies(): No company found`);
                return null;
            }
            else {
                console.log("Database | getCompanies(): Company Found");
                return sqlResult.rows;
            }

        } catch (err) {
            console.error("Error executing query", err);
        } finally {
            client.release();
        }
    } catch (err1) {
        console.error("Error connecting to the database", err1);
    }
}



async function updateOffers(userId) {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = `UPDATE offers SET accepted = 'TRUE', accepted_by_id = ${userId} WHERE id = ${id}`;
            const sqlResult = await client.query(sqlQuery);
            if (sqlResult.rows.length == 0) {
                return null;
            }
            else {
                return sqlResult;
            }

        } catch (err) {
            console.error("Error executing query", err);
        } finally {
            client.release();
        }
    } catch (err1) {
        console.error("Error connecting to the database", err1);
    }
}

async function listAvailableOffers(userId) {
    try {
        console.log("Getting data from database");
        const client = await pool.connect();
        try {
            console.log("2 Getting data from database");

            if (userId == null) {
                console.log("3 Getting data from database");
                const sqlQuery = `SELECT *
                FROM offers;
                `;

                const sqlResult = await client.query(sqlQuery);
                // console.log(sqlResult);
                if (sqlResult.rows.length === 0) {
                    return null;
                } else {
                    return sqlResult.rows;
                }
            }

            const sqlQuery = `
                SELECT DISTINCT *
                FROM company_view
                WHERE org_name = $1
                INTERSECT
                SELECT companies.comp_name, organizations.org_name
                FROM companies
                         JOIN offers ON companies.id = offers.comp_id
                         JOIN organizations ON offers.org_type = organizations.id
                WHERE organizations.org_name = $1
                  AND offers.accepted = 'FALSE'
                GROUP BY companies.comp_name
                HAVING COUNT(offers.comp_id) > 0
            `;
            const sqlResult = await client.query(sqlQuery, [userId]);

            if (sqlResult.rows.length === 0) {
                return null;
            } else {
                return sqlResult.rows;
            }
        } catch (err) {
            console.error("Error executing query", err);
        } finally {
            client.release();
        }
    } catch (err1) {
        console.error("Error connecting to the database", err1);
    }
}

// // Example usage:
// const userId = 'someUserId';
// const userInput = 'someOrgName';
// const result = await listAvailableOffers(userId, userInput);
// console.log(result);


module.exports = {
    authenticateUser, getUserInfo, getOrganizations, getCompanies, addUser,
    getOffersBasedOnOrganization, deleteUser, updateOffers, listAvailableOffers
}