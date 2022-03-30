require('dotenv').config()

const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const router = require('./router/router')
const bodParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { verify } = require ('jsonwebtoken')
const { hash, compare } = require('bcrypt')

const activeDataBaseFunction= require('./config/setup')


app.use(bodParser.json())

//using all router
app.use('/', router)

//front-end port so front and back can communicate
app.use(
    cors({
        //because using react app so the port is 3000
        origin : `http://localhost:3000`,
        credentials : true,
    })
)

//need to be able to read body data
app.use(express.json()) // to support json encoded bodies
app.use(express.urlencoded({ extended : true })) // support url-encoded

//back-end port
app.listen(port, () => {
    console.log(`app is running on ${port}`)
})