const userModel = require('../models/userSchema')
const postModel = require('../models/postSchema')
const mongoose = require('mongoose')
const fetchUser = async (req, res)=>{
    try{
        let user = await (await userModel.findOne({_id : req.params.userId}))
        let posts = await postModel.find({postedBy : req.params.userId}).populate("comments.user","_id Name")
        console.log( user.followers.includes( req.user._id))
        // user.isFollowing = user.followers.includes( req.user._id) ? true : false
        console.log(user)
        res.json({
            message : posts,
            user : user,
            isFollowing : user.followers.includes( req.user._id),
            isPending : user.pending.includes(req.user._id)
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            message : "Error Occurred"
        })
    }
}
const accept = (req, res)=>{
    try{
        userModel.findByIdAndUpdate({_id : req.user._id}, {
            $pull : {pending : req.body.requestedBy}
        }, {new : true}).then((result)=>{
            userModel.findByIdAndUpdate({_id : req.user._id}, {
                $push : {followers : req.body.requestedBy}
            }, {new : true}).then((data)=>{
                userModel.findByIdAndUpdate({_id : req.body.requestedBy},{
                    $push : {following : req.user._id}
                }, {
                    new :true
                }).then(result=>{
                    res.json({
                        message : "Accepted",
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
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            message: "Error Occured"
        })
    }
}
const follow = async (req, res)=>{
    try{
        userModel.findByIdAndUpdate({_id : req.body.toFollow}, {
            $push : {pending : req.user._id}
        }, {new : true}).then((data)=>{
            // userModel.findByIdAndUpdate({_id : req.user._id},{
            //     $push : {following : req.body.toFollow}
            // }, {
            //     new :true
            // }).then(result=>{
            //     res.json({
            //         message : "Followed",
            //         user : data
            //     })
            // }).catch(err=>{
            //     console.log(err)
            //     res.status(400).json({
            //         message: "Error Occured"
            //     })
            // })
            res.json({
                message : 'Request Sent'
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
const cancel = async (req, res)=>{
    try{
        userModel.findByIdAndUpdate({_id : req.user._id}, {
            $pull : {pending : req.body.requestedBy}
        }, {new : true}).then((result)=>{
            res.json({
                message : "Rejected"
            })
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            message: "Error Occured"
        })
    }
}
const cancelRequest = async (req, res)=>{
    try{
        console.log(req.body)
        userModel.findByIdAndUpdate({_id : req.body.toFollow}, {
            $pull : {pending : req.user._id}
        }, {new : true}).then((data)=>{
            res.json({
                message : 'Request Cancelled'
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
const pendingRequest = (req, res)=>{
    userModel.findById({_id : req.user._id}).populate('pending', '_id Name url').then((result)=>{
        console.log(result)
        res.json({
            message : result.pending
        })
    }).catch((err)=>{
        res.status(400).json({
            message : 'Error Occured'
        })
    })
}
const search = async(req, res)=>{
    let regex = new RegExp("^"+req.body.search)
    let data = await userModel.find({email :{$regex : regex} })
    res.json({
        message : data
    })
}
module.exports = {fetchUser, unFollow, follow, search, cancelRequest,accept, cancel, pendingRequest}