const express = require('express')
const postRouter = express.Router()
const {createPost, allPost, myPost, like, unLike} = require('../controller/postController')
const middleware = require('../middleware/requireLogin')
postRouter.post('/createPost', middleware, createPost )
postRouter.get('/allPost', middleware , allPost)
postRouter.get('/myPosts', middleware, myPost)
postRouter.put('/like', middleware, like)
postRouter.put('/unLike', middleware, unLike)

module.exports = postRouter