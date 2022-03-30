const express = require('express')
const { route } = require('express/lib/router')
const router = express.Router()
const Controller = require('../controller/controller')

// User end Points
router.get('/users', Controller.getAllUsers)
router.get('/users/user-detail/:id', Controller.getDetailUser)

//register user
router.post('/register', Controller.register)
//login user
router.post('/login')

router.delete('/delete-user/:id', Controller.deleteUser)

router.patch('/users/user-detail/:id', Controller.updateUserDetail)


//Product end Point

module.exports= router;