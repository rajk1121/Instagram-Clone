const mongoose = require('mongoose')
const validator = require('validator')
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
 
const userSchema = new mongoose.Schema({
    Name : {
        type: String,
        required : true,

    },
    email : {
        type: String,
        required: true,
        validate : function(val){
            if(!validator.isEmail(val)){
                throw new Error("Invalid Email")
            }
        }
    },
    password : {
        type: String,
        required: true,
        validate : function(val){
            if(!schema.validate(val)){
                throw new Error("Invalid Password")
            }
        }
    }
})
const userModel = mongoose.model("IGUser", userSchema)
module.exports = userModel