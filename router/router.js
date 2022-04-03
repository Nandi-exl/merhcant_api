const express = require('express')
const { route } = require('express/lib/router')
const router = express.Router()
const Controller = require('../controller/controller')
// const Check_token = require('../auth/isAuth')

/*
the authorization is done in controller so in router only
imported the controlller setup
*/


// User endPoints
router.get('/users', Controller.getAllUsers) // protected
router.get('/users/user-detail/:id', Controller.getDetailUser) // the data is protected

//register user
router.post('/register', Controller.register) // not protected cause all people can login
//login user
router.post('/login', Controller.userLogin) // not protected
//logOut user
router.post('/logout', Controller.userLogOut) // not protected
//deleteuser
router.delete('/delete-user/:id', Controller.deleteUser) // Protected
//updatespecific user data
router.patch('/users/user-detail/:id', Controller.updateUserDetail) // protected


//Product end Point

module.exports= router;