const {sign} = require('jsonwebtoken')

const createAccessToken = id => {
    return sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    })
}

const createRefreshToken = id => {
    return sign({id}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    })
}


const sendAccessToken = (req, res, accesstoken) => {
    res.send({
        accesstoken,
        name : req.body.name,
    })
}

const sendRefreshToken = (res, refreshtoken) => {
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly : true, //to make sure we can access cookie from our client, can modiufy cookie with js
        path : '/refresh_token', //this is the end point we want to get the new access token
    })
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
}