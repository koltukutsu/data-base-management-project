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
                const sqlQuery = `SELECT * FROM organizations`;
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

async function getOffersBasedOnOrganization(organizationName, season, amoungOfPeople) {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = `select * from offerCount($1, $2, $3)`
            const sqlResult = await client.query(sqlQuery, [organizationName, season, amoungOfPeople]);
            if (sqlResult.rows.length == 0) {
                console.log(`Database | getOffersBasedOnOrganization(): No offer found in name ${organizationName}, ${season}, ${amoungOfPeople}`);
                console.log("No offer found");
                return null;
            }
            else {
                console.log("Database | getOffersBasedOnOrganization(): Offer Found.");
                console.log("\t\t", sqlResult.rows)
                return sqlResult.rows;
            }
        } catch (err) {
            console.error("Error executing query", err);
        }
    } catch (err1) {
        console.error("Error connecting to the database", err1);
    }
}

// 2.3 get products baeed on the organizations

async function getProductsBasedOnOrganization(organizationName) {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = `select * from getProductsInStock($1)`;
            const sqlResult = await client.query(sqlQuery, [organizationName]);
            if (sqlResult.rows.length == 0) {
                console.log(`Database | getProductsBasedOnOrganization(): No product found in name ${organizationName}`);
                console.log("No product found");
                return null;
            }
            else {
                console.log("Database | getProductsBasedOnOrganization(): Product Found.");
                // (productName, amount, stock) turn this string to a related object 
                console.log("\t\t", sqlResult.rows)
                const products = sqlResult.rows[0].getproductsinstock.split(")\",")
                return products.map((product) => {
                    const productInfo = product.split(",")
                    console.log(productInfo)
                    const productObject = {
                        productId: productInfo[0].replace(/[^a-zA-Z0-9\s]/g, ""),
                        productName: productInfo[1].replace(/[^a-zA-Z0-9\s]/g, ""),
                        price: productInfo[2].replace(/[^a-zA-Z0-9\s]/g, ""),
                        stock: productInfo[3].replace(/[^a-zA-Z0-9\s]/g, "")
                    }
                    console.log(productObject)
                    return productObject
                })

            }
        } catch (err) {
            console.error("Error executing query", err);
        }
    } catch (err1) {
        console.error("Error connecting to the database", err1);
    }
}

async function updateUserBalanceForBuyingProduct(userId, productId, newBalance) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Start the transaction

        // Update balance
        const balanceQuery = 'UPDATE balance SET amount = $1 WHERE user_id = $2';
        await client.query(balanceQuery, [newBalance, userId]);

        // Update product stock
        const productQuery = 'UPDATE products SET stock = stock - 1 WHERE id = $1';
        await client.query(productQuery, [productId]);

        await client.query('COMMIT'); // Commit the transaction

        console.log("Database | updateUserBalance(): Transaction committed successfully.");
        return true;
    } catch (err) {
        await client.query('ROLLBACK'); // Roll back the transaction in case of an error
        console.error("Error executing transaction", err);
        return null;
    } finally {
        client.release(); // Release the client back to the pool
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



async function updateOffers(userId, offersId) {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = `UPDATE offers SET accepted = 'TRUE', accepted_by_id = $1 WHERE id = $2`;
            const sqlResult = await client.query(sqlQuery, [userId, offersId]);

            if (sqlResult.rowCount === 0) {
                console.log("No rows were affected by the update");
                return false; // or throw an error if you prefer
            } else {
                console.log("Update offers: Rows affected", sqlResult.rowCount);
                return true; // or any meaningful response
            }

        } catch (err) {
            console.error("Error executing query", err);
            throw err; // or return an error object
        } finally {
            client.release();
        }
    } catch (err1) {
        console.error("Error connecting to the database", err1);
        throw err1; // or return an error object
    }
}


async function listAvailableOffers(organizationName, season, amoungOfPeople) {
    try {
        console.log("Getting data from database");
        const client = await pool.connect();
        try {
            // const sqlQuery = `
            // SELECT DISTINCT *
            // FROM offer_view
            // WHERE org_name = $1
            //     AND time_period = $2
            //     AND max_guest_count >= $3
            // INTERSECT
            // SELECT DISTINCT companies.comp_name,
            //     offers.time_period,
            //     offers.max_guest_count,
            //     offers.price,
            //     org_name
            // FROM companies,
            //     offers,
            //     organizations,
            //     fields
            // WHERE companies.comp_name IN (
            //         SELECT DISTINCT comp_name
            //         FROM fields,
            //             companies,
            //             organizations,
            //             offers
            //         WHERE fields.comp_id = companies.id
            //             AND fields.comp_type = organizations.id
            //             AND offers.comp_id = companies.id
            //             AND organizations.org_name = $1
            //             AND offers.accepted = 'FALSE'
            //         GROUP BY comp_name
            //         HAVING COUNT(offers.comp_id) > 0
            //     )
            //     AND fields.comp_id = companies.id
            //     AND fields.comp_type = organizations.id
            //     AND offers.org_type = organizations.id
            //     AND offers.comp_id = companies.id
            //     AND organizations.org_name = $1;
            // `;
            const sqlQuery = `
            SELECT MIN(offer_view.id) as offerid, comp_name,
            MIN(price) as price
            FROM offer_view
            WHERE org_name = $1
            AND time_period = $2
            AND max_guest_count >= $3
            GROUP BY(comp_name)
            EXCEPT
            SELECT MIN(ow.id), comp_name,
            MIN(ow.price)
            FROM offer_view ow,
            offers
            WHERE offers.accepted = 'TRUE'
            AND offers.id = ow.id
            GROUP BY(comp_name);`
            const sqlResult = await client.query(sqlQuery, [organizationName, season, amoungOfPeople]);

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

async function getSeasons() {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = `SELECT DISTINCT(time_period) AS seasons FROM offers`;
            const sqlResult = await client.query(sqlQuery);
            if (sqlResult.rows.length == 0) {
                console.log(`Database | getSeasons(): No season found`);
                return null;
            }
            else {
                console.log("Database | getSeasons(): Seasons Found");
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
    authenticateUser, getUserInfo, getOrganizations, getCompanies, addUser, updateUserBalanceForBuyingProduct,
    getSeasons, getProductsBasedOnOrganization,
    getOffersBasedOnOrganization, deleteUser, updateOffers, listAvailableOffers
}