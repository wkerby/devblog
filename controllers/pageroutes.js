const router = require("express").Router();
const {Post, User, Comment} = require("../models");
const path = require("path");

///----------render all posts on the home page----------

router.get("/", async (req, res) => {
    console.log(`Registering ${req.method} route`);
    try {
        const allPosts = await Post.findAll({include:[{model:User}]});//query back all posts that have been created
        const posts = allPosts.map((post) => post.get({plain:true})); //serialize the post data
        console.log(posts);
        res.status(200).render("allposts", {posts});
    }

    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

///----------render a single post and any comments associated with post----------
router.get("/post/:id", async (req, res) => {
    console.log(`${req.method} request logged.`)
    specPostId = req.params.id;
    try {
        // const specPost = await Post.findByPk(specPostId, {include: [{model:Comment}]});
        const specPost = await Post.findByPk(specPostId, {include: [{model: Comment, include: [{model: User}]}]
        });
        const comment = specPost.comments.map((com) => com.get({plain:true})); //what is specPost.comments? Does JavaScript know what this is? Guessing that it is any comments associated with this specific post?
        console.log(comment);
        const date = specPost.dataValues.date;
        const title = specPost.dataValues.title;
        const content = specPost.dataValues.content;
        res.status(200).render("singlepost", {
            title,
            content,
            date,
            comment,

        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/login", async (req, res) => {
    console.log(`${req.method} method registered.`)
    try {
        res.status(200).render("login")
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
})

module.exports = router;