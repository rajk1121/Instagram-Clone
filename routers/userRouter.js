const express = require('express')
const userRouter = express.Router();
const {fetchUser, follow, unFollow, search, cancelRequest, accept, cancel, pendingRequest} = require('../controller/userController')
const requireLogin = require('../middleware/requireLogin')
userRouter.get('/fetchUser/:userId', requireLogin, fetchUser)
userRouter.get('/pendingRequest', requireLogin, pendingRequest)
userRouter.put('/follow', requireLogin, follow)
userRouter.put('/unFollow', requireLogin, unFollow)
userRouter.put('/cancelRequest', requireLogin, cancelRequest)
userRouter.put('/accept', requireLogin, accept)
userRouter.put('/cancel', requireLogin, cancel)
userRouter.post('/search-user', requireLogin, search)
module.exports = userRouter