const User = require('./modelUser')
const {hash, compareSync} = require('bcrypt')
const { createAccessToken, 
        createRefreshToken,
        sendAccessToken,
        sendRefreshToken
      } = require('../../token/token')
const {isAuth} = require('../../auth/isAuth.js')
const {verify} = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

class Controller {
static async getAllUsers (req, res){
   try {
    const UserId = isAuth(req)  
    if(UserId !== null){
        const data = await User.getAllUsers()
        res.status(200).json(data)
        // res.send(req.body)
    } 
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
    try {
        const UserId = isAuth(req)
        if(UserId !== null){
            let id = req.params.id
            await User.deleteUser(id)
            res.status(200).json({message : `${id} is deleted` })
        }
    } catch (error) {
    res.status(400).json(`${error.message}`)
    }
  
}

static async updateUserDetail(req, res){
    try {
        const id = req.params.id
        const data =req.body
        const password = req.body.password
        const hashedPassword = await hash(password, 10)

        const checkUser = await User.findUserById(id)
        if(!checkUser[0]){
            res.status(404).json({message : `user ${id} doesnt exist`})
            return
        }

        await User.updateUserDetail(id, data, hashedPassword)
        res.status(200).json({message : `user ${id} updated`})
    } catch (error) {
        res.status(400).json(`${error.message}`)
    }


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

static async refreshToken(req, res){
    console.log(req.cookies);
    const token = req.cookies.refreshtoken;
    //if we dont have token in out request
    if(!token){
      return res.status(404).json({accesssToken : ""})
    }

    //we have a token, and not we verify it
    let payload = null
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        return res.status(404).json({ accesssToken : ''})
    }

    //then if token is valid let check if the user is exist
    const existUser = await User.getAllUsers()
    const checkUser = existUser.find(user => user.id === payload.id)    
    if(!checkUser){
        res.status(404).json({accesssToken : ''})
    }

    //user exist, check if refresh token exist in user
    if(checkUser.refreshToken !== token){
        res.status(404).json({accesssToken : ''})
    }

    //token exist, create new refresh and access token
    const accessToken = createAccessToken(existUser[0].id)
    const refreshToken = createRefreshToken(existUser[0].id)

    //update refresh token on user in db
    //can add different version of refresh token too
    existUser[0].refreshToken = refreshToken

    //send new refreshtoken and accesstoken
    sendRefreshToken(res, refreshToken);
    return res.send({accessToken})
    
}

}

module.exports = Controller;