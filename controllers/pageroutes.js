const router = require("express").Router();
const {Post, User, Comment} = require("../models");
const path = require("path");

///----------render all posts on the home page----------

router.get("/", async (req, res) => {
    console.log(`Registering ${req.method} route`);
    try {
        const allPosts = await Post.findAll({include:[{model:User}]});//query back all posts that have been created
        const posts = allPosts.map((post) => post.get({plain:true})); //serialize the post data
        res.status(200).render("allposts", {
            loggedIn: req.session.loggedIn,
            posts: posts
        });
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
        const date = specPost.dataValues.date;
        const title = specPost.dataValues.title;
        const content = specPost.dataValues.content;
        const loggedIn = req.session.loggedIn;
        const currentUser = req.session.currentUser;
        const specPostUser = await Post.findByPk(specPostId, {include:[{model:User}]});
        const user = specPostUser.user.dataValues.username; //save the user who made the post into a variable and display in the handlebars view
        res.status(200).render("singlepost", {
            loggedIn,
            title,
            content,
            date,
            comment,
            user,
            currentUser,
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

///----------render the login page----------
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


///----------render the signup page----------
router.get("/signup", async (req, res) => {
    console.log(`${req.method} method registered.`)
    try {
        res.status(200).render("signup")
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
})

///----------render the user dashboard page----------
router.get("/dashboard", async (req, res) => {
    if (req.session.loggedIn) { //verify that the user has logged in or is signed up
        try {
            const userPosts = await Post.findAll({
                where : {
                    user_id : req.session.currentUserId
                },

                order: [['date', 'DESC']], //display the most current posts first
                
                include:[{model:User}],
            });

            const serializedUserPosts = userPosts.map((post) => post.get({ plain: true}));
            const currentUser = req.session.currentUser; //save the current user into a variable so that it can be displayed on the dashboard
            res.status(200).render("dashboard", {
                serializedUserPosts,
                currentUser,
                loggedIn: req.session.loggedIn,
            });

        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }

        }
    
    else {

        res.redirect("/login"); //redirect the user to the login page if he/she attempts to click on the dashboard when not logged in
    }
    }


)



module.exports = router;