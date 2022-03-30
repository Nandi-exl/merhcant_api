const express = require('express')
const { route } = require('express/lib/router')
const router = express.Router()
const Controller = require('../controller/controller')

// User end Point
router.get('/users', Controller.getAllUsers)
router.get('/users/user-detail/:id', Controller.getDetailUser)

router.post('/register', Controller.register)

router.delete('/delete-user/:id', Controller.deleteUser)

router.patch('/users/user-detail/:id', Controller.updateUserDetail)


//Product end Point

module.exports= router;