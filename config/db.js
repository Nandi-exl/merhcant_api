require('dotenv').config()
const mysql = require('mysql')

const host = process.env.host
const user = process.env.user
const password = process.env.password
const database = process.env.database

const db = mysql.createConnection({
    host : host,
    user : user,
    password : password,
    database : database
})

module.exports = db;

