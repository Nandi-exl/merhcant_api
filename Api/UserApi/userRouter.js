const express = require('express')
const userRouter = express.Router()
const Controller = require('./userController')
// const Check_token = require('../auth/isAuth')

/*
the authorization is done in controller so in router only
imported the controlller setup
*/


// User endPoints
userRouter.get('/users', Controller.getAllUsers) // protected
userRouter.get('/users/user-detail/:id', Controller.getDetailUser) // protected

//register user
userRouter.post('/register', Controller.register) // not protected cause all people can login
//login user
userRouter.post('/login', Controller.userLogin) // not protected
//logOut user
userRouter.post('/logout', Controller.userLogOut) // not protected
//deleteuser
userRouter.delete('/delete-user/:id', Controller.deleteUser) // Protected
//updatespecific user data
userRouter.patch('/users/user-detail/:id', Controller.updateUserDetail) // protected


//get new access token with new refresh token
userRouter.post('/refresh_token', Controller.refreshToken)

module.exports= userRouter;