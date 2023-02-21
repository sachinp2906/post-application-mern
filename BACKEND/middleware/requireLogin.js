const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const verify = (req ,res , next) => {
    const token = req.headers.authorization
    if(!token){
        return res.status(401).send({ status : false , message : "unauthorised user(not logged in)"})
    }
    jwt.verify(token , 'secret-key' , (err , decode)=>{
         if(err) {
            return res.status(401).send({status : false , message : "not verified(not logged in)"})
         }else{
            const {_id} = decode
            userModel.findById(_id)
            .then(userData=>{
                req.user = userData
                next()
            })
         }
    })
}
 


module.exports.verify = verify