const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
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
    },
    following : [{
        type : ObjectId,
        ref : "IGUser"
    }],

    followers : [
        {
            type : ObjectId,
            ref : "IGUser"
        }
    ],

    pending : [
        {
            type : ObjectId,
            ref : "IGUser"
        }
    ]
})
const userModel = mongoose.model("IGUser", userSchema)
module.exports = userModel