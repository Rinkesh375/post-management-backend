const mongoose = require("mongoose")
const express = require("express");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter")
require("dotenv").config();
const app = express();
app.use(express.json());




app.use("/user",userRouter)
app.use("/post",postRouter)

const connection=async ()=>{ 
    
        try {
            await mongoose.connect(process.env.MONGO_URI)
        } catch (error) {
             console.log(error)   
        }
 
}






app.listen(7000,()=>{
    connection()
 
})

