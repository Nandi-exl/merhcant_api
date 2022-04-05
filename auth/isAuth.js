const { verify } = require('jsonwebtoken');

//this way you can do the authorization in controller
const isAuth = req => {
  const authorization = req.headers['authorization'];
  if(!authorization) throw new Error("you need to login");
  //refrece from Bearer jasdjoqiwee 
  const token = authorization.split(' ')[1];
  const { id } = verify(token, process.env.ACCESS_TOKEN_SECRET);
  return id;
}

module.exports = {
  isAuth
}





// this way we need to import the auth to router as a middle ware before excuting data api
// class Check_token {
//   static authorize(req, res, next){
//       let token = req.get("authorization");
//       if(token){
//         token = token.split(' ')[1];
//         verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//           if(err){
//             res.status(404).json({
//               message : "invalid token"
//             })
//           }else {
//             next()
//           }
//         })

//       }else{
//         res.json({message : "access denied"})
//       }
//   }
// }

// module.exports = Check_token;

