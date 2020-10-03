const mongoose = require('mongoose')
const {ObjectId} =  mongoose.Schema.Types
var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    postedBy : {
        type : ObjectId,
        ref : "IGUser"
    },
    photo : {
        type : String,
        default: "No Photo"
    },
    created : {
        type : Date,
        default : Date.now()
    },
    likes : [
        {
            type: ObjectId,
            ref: "IGUser"
        }
    ],
    comments : [
        {
            text:{
                type: String
            },
            user:{
                type: ObjectId,
                ref: "IGUser"
            }
        }
    ]
})
const postModel = mongoose.model("IGPosts", postSchema)
module.exports = postModel