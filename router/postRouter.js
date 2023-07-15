const Post = require("../models/postModel")
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require('dotenv').config()

/* Hello */

const authMiddleWare = (req, resp, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (token) {
            const details = jwt.verify(token, "Rinkesh");
            if (details) {
                req._id = details._id;
                next()
            }
            else resp.status(400).send({ error: "Given token is incorrect" })
        }
        else resp.status(400).send({ error: "token not provided please provide the token" })
    } catch (error) {
        resp.status(500).send({ error })
    }
}
router.get("/", async (req, resp) => {
    try {
        const post = await Post.find();
        resp.status(200).send(post)
    } catch (error) {
        resp.status(500).send({ error })
    }

})

router.post("/", authMiddleWare, async (req, resp) => {
    try {
        const post = await Post.create({ ...req.body, creator: req._id });
        await post.populate("creator");
        resp.status(201).send(post)
    } catch (error) {
        resp.status(500).send({ error })
    }
})


router.patch("/:id", authMiddleWare, async (req, resp) => {
    try {
        const { id } = req.params;
        const userDetails = await Post.findById(id);

        if (userDetails) {
            if (userDetails.creator.toString() == req._id) {


                const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
                resp.status(200).send(post)
            }
            else resp.status(400).send({ error: "A guy who has created the post only that same person can update or delete the post" })
        }
        else resp.status(400).send({ error: "Given Id does not exist" })
    } catch (error) {
        resp.status(500).send({ error })
    }
})


router.patch("/like/:id", authMiddleWare, async (req, resp) => {
    try {
        const { id } = req.params;
       
        let post = await Post.findById(id);
        const index = post.likes.findIndex(ele => ele === String(req._id))
        if (index === -1) post.likes.push(req._id)
        else {
            post = post.likes.splice(index, 1)
        }
        const updatePost = await Post.findByIdAndUpdate(id, post, { new: true });
        resp.status(400).send(updatePost);
    } catch (error) {
        resp.status(500).send({ error })
    }
})

module.exports = router