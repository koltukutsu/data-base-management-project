const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "project",
    password: "semxhart",
    port: 3000, // default PostgreSQL port
});

async function runQueries() {
    try {
        const client = await pool.connect();
        const organizationName = "Mezuniyet";
        const viewName = "company_view";

        try {
            /* create company view and execute its query */

            const checkViewQuery = `SELECT EXISTS (
                SELECT 1
                FROM information_schema.views
                WHERE table_schema = 'public'
                  AND table_name = '${viewName}'
            );`;

            const viewExistsResult = await client.query(checkViewQuery);
            const viewExists = viewExistsResult.rows[0].exists;

            if (viewExists) {
                // View exists, so drop it before creating or replacing
                const dropViewQuery = `DROP VIEW ${viewName};`;
                await client.query(dropViewQuery);
                console.log("View dropped successfully.");
            }

            const view = `CREATE OR REPLACE VIEW company_view AS
              SELECT DISTINCT companies.comp_name AS comp_name, companies.id AS comp_id
              FROM companies, organizations, fields
              WHERE fields.comp_id = companies.id AND fields.comp_type = organizations.id
              AND organizations.org_name = '${organizationName}'
              ORDER BY comp_id;`;
            await client.query(view);
            console.log("View added successfully.");

            const viewQuery = "select * from company_view";
            const viewResult = await client.query(viewQuery);
            console.log("Results:", viewResult.rows);
        } catch (err) {
            console.error("Error executing view-related queries", err);
        } finally {
            client.release();
        }

        try {
            const sqlQuery = "SELECT org_name FROM organizations";
            const sqlResult = await client.query(sqlQuery);
            console.log("Results: ", sqlResult.rows);
        } catch (err) {
            console.error("Error executing additional query", err);
        } finally {
            pool.end();
        }
    } catch (err) {
        console.error("Error connecting to the database", err);
        process.exit(1);
    }
}

async function authenticateUser(userName, password) {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = `SELECT * FROM users WHERE username = '${userName}' AND pw = '${password}'`;
            const sqlResult = await client.query(sqlQuery);

            if (sqlResult.rows.length == 0) {
                console.log("No user found");
                return null;

            } else {
                console.log("Results: ", sqlResult.rows);
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

async function getOrganizations(organizationName) {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = `SELECT * FROM company_view WHERE org_name =  ${organizationName}`;
            const sqlResult = await client.query(sqlQuery);
            if (sqlResult.rows.length == 0) {
                console.log("Database | getOrganizations(): No organization found");
                console.log("No organization found");
                return null;
            }
            else {
                console.log("Database | getOrganizations(): Organization Found.\nResults: ", sqlResult.rows);
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

async function addUser(userName, password) {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = `INSERT INTO users (id, username, pw)
            VALUES (nextval('users_id_seq'), ${userName}, ${password})`;
            const sqlResult = await client.query(sqlQuery);

            // TODO what does that query return?
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

async function udpateOffers(userId, id) {
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

async function listAvailableOffers(userId, userInput) {
    try {
        const client = await pool.connect();
        try {
            const sqlQuery = `
                SELECT DISTINCT *
                FROM company_view
                WHERE org_name = $1
                INTERSECT
                SELECT companies.comp_name, organizations.org_name
                FROM companies
                         JOIN offers ON companies.id = offers.comp_id
                         JOIN organizations ON offers.org_type = organizations.id
                WHERE organizations.org_name = $2
                  AND offers.accepted = 'FALSE'
                GROUP BY companies.comp_name
                HAVING COUNT(offers.comp_id) > 0
            `;
            const sqlResult = await client.query(sqlQuery, [userInput, userInput]);

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


module.exports = { authenticateUser, getOrganizations, addUser, deleteUser, udpateOffers, listAvailableOffers }