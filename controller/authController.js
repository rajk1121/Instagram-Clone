const userModel = require("../models/userSchema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWTKEY} = require('../keys.json')
const login = async(req, res)=>{
    try{
        let body = req.body
        if(!body.email || !body.password){
            res.status(422).json({
                message : "Invalid Body"
            })
        }else{
            let dbObj = await userModel.findOne({email : body.email})
            if(!dbObj){
                res.status(400).json({
                    message: "User Does Not Exist"
                })
            }else{
                let ifMatch = await bcrypt.compare(body.password , dbObj.password)
                if(ifMatch){
                    let token = jwt.sign({id : dbObj._id}, JWTKEY)
                    res.json({
                        message : "Login Successfull",
                        token : token
                    })
                }else{
                    res.status(400).json({
                        message : "Incorrect Password"
                    })
                }
            }
        }
    }catch(err){
        res.status(400).json({
            message : "Error Occured"
        })
    }
    
}
const signUp = async (req, res)=>{
    try{
        let userObj = req.body
        if(!userObj.email || !userObj.Name || !userObj.password){
            res.status(422).json({
                message : "Invalid Body"
            })
        }else{
            let findObj = await userModel.findOne({email : userObj.email})
            // console.log(findObj)
            if(findObj){
                res.status(200).json({
                    message : "User Already Exists"
                })
            }else{
                if(userObj.password != userObj.confirmPassword){
                    res.status(422).json({
                        message : "Password and Confirm Password doesnot math"
                    })
                }else{
                    let hashedPassword = await bcrypt.hash(userObj.password, 8)
                    userObj.password = hashedPassword
                    let dbObj = new userModel(userObj)
                    let result = await dbObj.save()
                    res.json({
                        message : "Successfull"
                    })
                }
                
            }
            
        }
        
    }catch(err){
        // console.log(err)
        res.status(400).json({
            message : err.errors.email ? "Invalid Email" : "Invalid Password"
        })
    }
}

module.exports = {login, signUp}