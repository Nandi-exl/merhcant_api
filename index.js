require('dotenv').config()

const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const userRouter = require('./Api/UserApi/userRouter')
const productRouter = require('./Api/ProductApi/productRouter')
const bodParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// const { verify } = require ('jsonwebtoken')
// const { hash, compare } = require('bcrypt')

const activeDataBaseFunction= require('./config/setup')

//app use cookie-parser to show cookie value
app.use(cookieParser())

//app use body parser to show json data
app.use(bodParser.json())

//using user router
app.use('/', userRouter)

//using product router
app.use('/', productRouter)


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