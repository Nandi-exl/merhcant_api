const res = require('express/lib/response')
const User = require('../model/modelUser')

class Controller {
static async getAllUsers (req, res){
    const data = await User.getAllUsers()
    res.status(200).json(data)
    console.log("data fected");
    // res.send(req.body)
}

static async getDetailUser(req, res){
    const id = req.params.id
    const data = await User.getDetailUser(id)
    res.status(200).json(data)
}

static async register(req, res){
    const data = req.body

    if(!data.password){
        return res.status(400).json({message : "inputs invalid"})
    }

    await User.register(data)
    res.status(201).json(data)
}


static async deleteUser(req, res){
    let id = req.params.id
    await User.deleteUser(id)
    res.status(200).json({message : `${id} is deleted` })
}

static async updateUserDetail(req, res){
    const id = req.params.id
    const data =req.body
    await User.updateUserDetail(id, data)
    res.status(200).json({message : `user ${id} updated`})
}

}

module.exports = Controller;