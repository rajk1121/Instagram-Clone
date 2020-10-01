const postModel = require('../models/postSchema')
const createPost = async (req, res)=>{
    try{    
        let body = req.body;
        console.log(req.user)
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
                message : dbObj
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
    let data = await postModel.find().populate('postedBy', '_id Name')
    res.json({
        message : data
    })
}
const myPost = async (req, res)=>{
    try{
        let posts = await postModel.find({postedBy : req.user})
        res.json({
            message : posts
        })
    }catch(err){
        res.status(400).json({
            message : "Error Occurred"
        })
    }
}
module.exports = {createPost, allPost, myPost}