const { Pool } = require("pg");

const pool = new Pool({
	user: "tolgaizdas",
	host: "localhost",
	database: "project",
	password: "",
	port: 5432, // default PostgreSQL port
});

async function runQueries() {
	try {
	  const client = await pool.connect();
  
	  try {
		/* create company view and execute its query */
		organizationName = "Mezuniyet";
		const view = `CREATE OR REPLACE VIEW company_view AS
  					  SELECT DISTINCT companies.comp_name, companies.id
  				      FROM companies, organizations, fields
  				      WHERE fields.comp_id = companies.id AND fields.comp_type = organizations.id
  				      AND organizations.org_name = '${organizationName}'
					  ORDER BY companies.id;`;
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
  
  runQueries();
  