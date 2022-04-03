const User = require('../model/modelUser')
const {hash, compareSync} = require('bcrypt')
const { createAccessToken, 
        createRefreshToken,
        sendAccessToken,
        sendRefreshToken
      } = require('./token')

const {isAuth} = require('../auth/isAuth.js')
class Controller {
static async getAllUsers (req, res){
   try {
    const data = await User.getAllUsers()
    res.status(200).json(data)
    // res.send(req.body)
   } catch (error) {
     res.status(400).json(`${error.message}`)  
   }
}

static async getDetailUser(req, res){
  try {
    const UserId = isAuth(req)
    if(UserId !== null){
    const id = req.params.id
    const data = await User.getDetailUser(id)
    res.status(200).json(data)
    }    
  } catch (error) {
    res.status(400).json(`${error.message}`)  
  }
}

static async register(req, res){
    //real
    const data = req.body
    const password = req.body.password
    const confPasword = req.body.confPasword //bertanya
    const hashedPassword = await hash(password, 10)

    if(password !== confPasword){
        return res.status(400).json({message : "wrong password invalid"})
    }

    const existUser = await User.findUserByName(data.name)
    // console.log(existUser[0].name);
    if (existUser[0]) {
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
    if(!checkUser[0]){
        res.status(404).json({message : `user ${id} doesnt exist`})
        return
    }

    await User.updateUserDetail(id, data, hashedPassword)
    res.status(200).json({message : `user ${id} updated`})
}


static async userLogin(req, res){
   try {
    const body = req.body
    const existUser = await User.userLogin(body.name)
    console.log(existUser[0]);
    const valid = compareSync(body.password, existUser[0].password);
    if(!valid){
        return res.status(404).json({message : `wrong password`})
    }
    //if login successfull - create refresh and access token
    const accesssToken = createAccessToken(existUser[0].id)
    const refreshToken = createRefreshToken(existUser[0].id)

    // //add refresh token coloumn in database when the user acces the token
    existUser[0].refresh_token = refreshToken
    console.log(existUser);

    // //send token, refresh token as cookie and accesstoken as regular response to client
    sendRefreshToken(res, refreshToken)
    sendAccessToken(req, res, accesssToken)
    } catch (error) {
        res.send({
            error : `${error.message}`
        })
    }
}

static userLogOut(req, res){
    res.clearCookie('refreshtoken', { path : '/refresh_token'}); // clear refresh token from the cookie
    return res.json({
        message : "user log out"
    })
}


}

module.exports = Controller;