const express = require('express')
const userRouter = express.Router();
const {fetchUser} = require('../controller/userController')
const requireLogin = require('../middleware/requireLogin')
userRouter.get('/user', requireLogin, fetchUser)

module.exports = userRouter