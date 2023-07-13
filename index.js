const express = require("express");
require("./dbConnect/config");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter")
const app = express();
require("dotenv").config();
app.use(express.json());


app.use("/user",userRouter)
app.use("/post",postRouter)

app.listen(7000);


