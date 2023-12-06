const Pool = require("pg").Pool
const pool = new Pool({
    user: "my_user",
    host: "localhost",
    database: "my_database",
    password: "root",
    port: 5432
})

const getFoo = undefined;

const createFoo = undefined;

const deleteFoo = undefined;

const updateFoo = undefined;

module.exports = {
    getFoo,
    createFoo,
    deleteFoo,
    updateFoo,
}