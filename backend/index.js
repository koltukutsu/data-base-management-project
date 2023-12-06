//// server
const express = require("express")
const app = express()
const port = 3200
//// pg, database

app.get("/", (req, res) => {
    res.status(200).send("merhaba anne, project backend");
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})