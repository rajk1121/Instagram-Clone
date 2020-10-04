const postModel = require('../models/postSchema');
const userModel = require('../models/userSchema');
const createPost = async (req, res)=>{
    try{    
        let body = req.body;
        // console.log(req.user, body.photo!=undefined, !body.title, req.user, !body.body)
        if(!body.title || !body.body || !req.user || !body.photo){
            res.status(422).json({
                message : "Invalid Body"
            })
        }else{
            let newObj = {
                title : body.title,
                body : body.body,
                postedBy : req.user,
                photo : body.photo
            }
            let dbObj = new postModel(newObj)
            dbObj = await dbObj.save()
            // console.log(dbObj.created.toLocaleString('en-US', { timeZone: 'India' }))
            res.json({
                message : "Successfull"
            })
        }
    }catch(err){
        console.log(err)
        res.status(400).json({
            message : "Error Occurred"
        })
    }
}
const allPost = async(req, res)=>{
    let data = await postModel.find({postedBy : {$in : req.user.following}}).populate('postedBy', '_id Name url').populate('comments.user', '_id Name').sort("-created")
    res.json({
        message : data
    })
}
const myPost = async (req, res)=>{
    try{
        let posts = await postModel.find({postedBy : req.user}).populate('comments.user', '_id Name').sort("-created")
        let user = await userModel.findOne({_id : req.user._id})
        res.json({
            message : posts,
            user : user
        })
    }catch(err){
        res.status(400).json({
            message : "Error Occurred"
        })
    }
}
const like = async (req, res)=>{
    try{
        console.log(req.body)
        let newObj = await postModel.findByIdAndUpdate({_id : req.body.postId}, {
            $push : {likes : req.user.id}
        }, {new : true})
        newObj = newObj.populate("postedBy", "_id Name url")
        console.log(newObj)
        res.json({
            message: "Liked",
            obj : newObj
        })

    }catch(err){
        console.log(err)
        res.status(422).json({
            message: "Error Occurred"
        })
    }
}
const comment = async (req, res)=>{
    try{
        console.log(req.body)
        if(!req.body.comment){
            res.status(422).json({
                message: "Empty Comment Cannot be posted"
            })
        }
        else{
            console.log(req.body)
            let newObj = await postModel.findByIdAndUpdate({_id : req.body.postId}, {
                $push : {comments : {user : req.user.id, text: req.body.comment}}
            }, {new : true}).populate('comments.user', '_id Name')
            res.json({
                message: "Commented",
                obj : newObj
            })
        }

    }catch(err){
        console.log(err)
        res.status(422).json({
            message: "Error Occurred"
        })
    }
}
const unLike = async (req, res)=>{
    try{
        let newObj = await postModel.findByIdAndUpdate({_id : req.body.postId}, {
            $pull : {likes : req.user.id}
        }, {new : true})
        res.json({
            message: "Liked",
            obj : newObj
        })

    }catch(err){
        res.status(422).json({
            message: "Error Occurred"
        })
    }
}
module.exports = {createPost, allPost, myPost, like, unLike,comment}