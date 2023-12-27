const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "project",
    password: "semxhart",
    port: 5432, // default PostgreSQL port
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

async function getOrganizations() {

}

// authenticateUser("user1", "pw1");

module.exports = { authenticateUser };