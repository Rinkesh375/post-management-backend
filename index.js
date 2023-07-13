const mongoose = require("mongoose")
const express = require("express");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter")
require("dotenv").config();
const app = express();
app.use(express.json());
/*Hello */ 

const connection=async ()=>{ 
    try{
        await mongoose.connect(`mongodb+srv://rinkeshujjwal16:rinkesh@clustor0.arwclpw.mongodb.net/todo?retryWrites=true&w=majority`)
        console.log("connected")
    }
    catch(err){
        console.log(err)
    }
}


app.use("/user",userRouter)
app.use("/post",postRouter)




app.listen(7000,()=>{
    connection()
 
})

