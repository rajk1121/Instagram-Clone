const keys = require('./config/key')
const express = require('express')
const app = express();
const expressLogging = require('express-logging'),
      logger = require('logops');
const mongoose = require('mongoose');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/userRouter')
const postRouter = require('./routers/postRouter')
const PORT = process.env.PORT || 3500
mongoose.connect(keys.MONGODBURI, {
    useNewUrlParser : true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', ()=>{
    console.log("Connected to Databse")
})
mongoose.connection.on('error', (err)=>{
    console.log(err)
})
app.use(expressLogging(logger));
app.use(express.json())
app.use('/user/', userRouter)
app.use("/auth/", authRouter)
app.use('/post/', postRouter)
if(process.env.NODE_ENV=="production"){
    const path = require('path')
    app.use(express.static('client/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'))
    })
}
app.listen(PORT, ()=>{
    console.log("Server running at port ", PORT)
})
