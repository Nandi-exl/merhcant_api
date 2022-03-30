const User = require('../model/modelUser')
const {hash, compare} = require('bcrypt')

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
    const password = req.body.password
    const hashedPassword = await hash(password, 10)

    if(!data.password){
        return res.status(400).json({message : "inputs invalid"})
    }

    const existUser = await User.findUserByName(data.name)
    // console.log(existUser);
    if (existUser != "") {
        res.status(400).json({message : `${data.name} is already exixt`})
        return
    }
    
    await User.register(data, hashedPassword)
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
    const password = req.body.password
    const hashedPassword = await hash(password, 10)

    const checkUser = await User.findUserById(id)
    // console.log(checkUser);
    if(checkUser == ""){
        res.status(400).json({message : `user ${id} doesnt exist`})
        return
    }

    await User.updateUserDetail(id, data, hashedPassword)
    res.status(200).json({message : `user ${id} updated`})
}


static async userLogin(req, res){

}

}

module.exports = Controller;