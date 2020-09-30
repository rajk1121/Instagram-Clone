const express = require('express');
const{login, signUp} = require('../controller/authController')
const authRouter = express.Router()
authRouter.get("/login",login )
authRouter.post("/signup", signUp)

module.exports = authRouter;