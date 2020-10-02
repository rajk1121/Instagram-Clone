const jwt = require('jsonwebtoken')
const userModel = require('../models/userSchema')
const {JWTKEY} = require('../keys.json')
const middleware = async (req, res, next)=>{
    try{
        console.log(req.headers)
        let {authorization} = req.headers
        if(!authorization){
            res.status(401).json({
                message : "Login Required"
            })
        }else{
            let token = authorization.replace("Bearer ", "")
            try{
                let payload = await jwt.verify(token,JWTKEY)
                console.log(payload)
                const {id} = payload
                let dbObj = await userModel.findById(id)
                req.user = dbObj
                // console.log(dbObj)
                next()
            }catch(err){
                res.status(401).json({
                    message : "Login Required"
                })
            }

        }
    }catch(err){
        res.json(400).json({
            message : "Error Occurred"
        })
    }
}
module.exports = middleware