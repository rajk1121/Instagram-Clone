const mongoose = require('mongoose')
const validator = require('validator')

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
    },
    url : {
        type: String,
        required: true
    }
})
const userModel = mongoose.model("IGUser", userSchema)
module.exports = userModel