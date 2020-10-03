const express = require('express')
const userRouter = express.Router();
const {fetchUser, follow, unFollow, search} = require('../controller/userController')
const requireLogin = require('../middleware/requireLogin')
userRouter.get('/fetchUser/:userId', requireLogin, fetchUser)
userRouter.put('/follow', requireLogin, follow)
userRouter.put('/unFollow', requireLogin, unFollow)
userRouter.post('/search-user', requireLogin, search)
module.exports = userRouter