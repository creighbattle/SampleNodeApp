const express = require('express');
const {Pool} = require('pg');
const app = express();
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: process.env.RDS_HOSTNAME || "localhost",
    database: "postgres",
    port: 5432
})

pool.connect().then(() => console.log('connected')).catch((e) => console.log(e));


pool.query("create table testing(id bigserial primary key, name varchar(20)").then(() => {
    pool.query("insert into testing (name) values ('Creigh')")
})


app.get('/', (req, res) => {
    res.send("Welcome to the home page baby");
});

app.get('/db', async (req, res) => {
    const shop = await pool.query(
      "select name from testing"
    );

    res.send(shop.rows[0])

    console.log(shop.rows[0]);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Whats up");
})