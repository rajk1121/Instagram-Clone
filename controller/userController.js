const userModel = require('../models/userSchema')
const postModel = require('../models/postSchema')
const mongoose = require('mongoose')
const fetchUser = async (req, res)=>{
    try{
        let user = await (await userModel.findOne({_id : req.params.userId}))
        let posts = await postModel.find({postedBy : req.params.userId})
        console.log( user.followers.includes( req.user._id))
        // user.isFollowing = user.followers.includes( req.user._id) ? true : false
        console.log(user)
        res.json({
            message : posts,
            user : user,
            isFollowing : user.followers.includes( req.user._id)
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            message : "Error Occurred"
        })
    }
}
const follow = async (req, res)=>{
    try{
        userModel.findByIdAndUpdate({_id : req.body.toFollow}, {
            $push : {followers : req.user._id}
        }, {new : true}).then((data)=>{
            userModel.findByIdAndUpdate({_id : req.user._id},{
                $push : {following : req.body.toFollow}
            }, {
                new :true
            }).then(result=>{
                res.json({
                    message : "Followed",
                    user : data
                })
            }).catch(err=>{
                console.log(err)
                res.status(400).json({
                    message: "Error Occured"
                })
            })
        }).catch(err=>{
            console.log(err)
            res.status(400).json({
                message: "Error Occured"
            })
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            message: "Error Occured"
        })
    }
}
const unFollow = async (req, res)=>{
    try{
        userModel.findByIdAndUpdate({_id : req.body.toUnFollow}, {
            $pull : {followers : req.user._id}
        }, {new : true}).then((data)=>{
            userModel.findByIdAndUpdate({_id : req.user._id},{
                $pull : {following : req.body.toUnFollow}
            }, {
                new :true
            }).then(result=>{
                res.json({
                    message : "Un Followed",
                    user : data
                })
            }).catch(err=>{
                console.log(err)
                res.status(400).json({
                    message: "Error Occured"
                })
            })
        }).catch(err=>{
            console.log(err)
            res.status(400).json({
                message: "Error Occured"
            })
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            message: "Error Occured"
        })
    }
}
const search = async(req, res)=>{
    let regex = new RegExp("^"+req.body.search)
    let data = await userModel.find({email :{$regex : regex} })
    res.json({
        message : data
    })
}
module.exports = {fetchUser, unFollow, follow, search}