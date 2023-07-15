const Post = require("../models/userModels");
const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()


const hashPass = async(req,resp,next)=>{
    try {
        const {email,password} = req.body;
     
        const emailpresent = await Post.findOne({email});
            if(emailpresent){
              
                resp.status(400).send({error:"This email already exists"});
            }
            else {
                
                const hassPassword = await bcrypt.hash(password,10);
                req.body.password = hassPassword;
                next();
            }
    } catch (error) {
            resp.status(500).send({error})
        }
}

const verifyMiddleWare = async(req,resp,next)=>{
    try {
        const {email,password} = req.body;
        const userRegistered = await Post.findOne({email});
        if(userRegistered){
            const verify = await bcrypt.compare(password,userRegistered.password);
            if(verify){
                 const token = jwt.sign({_id:userRegistered._id},"Rinkesh",{expiresIn:"1d"})
                 resp.status(201).send({msg:"user login successfully",token})
            }
            else next()
        }
        else resp.status(400).send({error:"This email is not registed"})
        
    } catch (error) {
        resp.status(500).send({error}); 
    }    


}


router.get("/",(req,resp)=>{

    resp.status(400).send("User Router")
})

router.post("/register",hashPass,async(req,resp)=>{
        try {
         
            const post = await Post.create(req.body);
            resp.status(201).send(post)
        } catch (error) {
            resp.status(500).send({error});
        }
})


router.post("/login",verifyMiddleWare,async(req,resp)=>{
   try {
       resp.status(400).send({error:"Given password is incorrect"})
   } catch (error) {
       resp.status(500).send({error})
   }
})




module.exports = router;
