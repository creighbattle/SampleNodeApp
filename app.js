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



// pool.query("create table testing(id bigserial primary key, name varchar(20)").then(() => {
//     pool.query("insert into testing (name) values ('Creigh')")
// })


app.get('/', async (req, res) => {
    try {
        const val = await pool.query('select * from fun');
        console.log(val.rows[0]);
        res.send("Welcome to the home page baby");
    } catch (error) {
        await pool.query("create table fun(id bigserial primary key, name varchar(20))")
        console.log(error.message)
        res.send("We are not connected");
    }
});

app.get('/add', async (req, res) => {
    try {
        const val = await pool.query("insert into fun (name) values ('creigh')");
        res.send("Added");
    } catch (error) {
        res.send(error.message);
    }
})

app.get('/db', async (req, res) => {
    // const shop = await pool.query(
    //   "select name from testing"
    // );

    // res.send(shop.rows[0])

    // console.log(shop.rows[0]);

    try {
        const val = await pool.query('select * from fun');
        res.send(val.rows);
    } catch (error) {
        res.send(error.message);
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Whats up");
})