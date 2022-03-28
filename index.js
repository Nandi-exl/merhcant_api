require('dotenv').config()

const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const router = require('./router/router')
const bodParser = require('body-parser')
const databaseManipulation = require('./config/setup')


app.use(bodParser.json())

app.use('/', router)

app.listen(port, () => {
    console.log(`app is running on ${port}`)
    databaseManipulation.connectDatabase()
})