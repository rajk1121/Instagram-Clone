const userModel = require("../models/userSchema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWTKEY} = require('../config/key')
const passwordValidator = require("password-validator")
var schema = new passwordValidator();
 
// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.has().symbols()
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
 
const login = async(req, res)=>{
    try{
        let body = req.query
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
                if(body.source=="google"){
                    
                    const {id, Name, email, url} = dbObj
                    let token = jwt.sign({id : dbObj._id}, JWTKEY)
                    res.json({
                        message : "Login Successfull",
                        token : token,
                        user : {id, Name, email, url}
                    })
                    return
                }
                let ifMatch = await bcrypt.compare(body.password , dbObj.password)
                if(ifMatch){
                    let token = jwt.sign({id : dbObj._id}, JWTKEY)
                    const {id, Name, email, url} = dbObj
                    res.json({
                        message : "Login Successfull",
                        token : token,
                        user : {id, Name, email, url}
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
        if(!userObj.email || !userObj.Name || !userObj.password || !userObj.url){
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
                        message : "Password and Confirm Password does not match"
                    })
                }else{
                    
                    if(!schema.validate(userObj.password)){
                        throw new Error("Invalid Password")
                    }
        
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
        err = (String)(err)
        console.log(err)
        res.status(400).json({
            message : err.includes("Invalid Email") ? "Invalid Email" : "Invalid Password"
        })
    }
}

module.exports = {login, signUp}