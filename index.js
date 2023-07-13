const mongoose = require("mongoose")
const express = require("express");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter")
const app = express();
require("dotenv").config();
app.use(express.json());


app.use("/user",userRouter)
app.use("/post",postRouter)

app.listen(7000,async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log(error)
    }
});


