const userModel = require("../models/userSchema")
const login = (req, res)=>{
    res.json({
        "message":"Hello from login"
    })
}
const signUp = async (req, res)=>{
    try{
        let userObj = req.body
        let dbObj = new userModel(userObj)
        let result = await dbObj.save()
        res.json(result)
    }catch(err){
        console.log(err)
        res.status(400).json({
            message : err.errors.email ? "Invalid Email" : "Invalid Password"
        })
    }
}

module.exports = {login, signUp}