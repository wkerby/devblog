const router = require("express").Router();
const { User, Post, Comment} = require("../../models"); //here we will need access to the user model in order to verify username and password

//----------attempt to log in a user from the login page and begin session if credentials are verified----------
router.post("/login", async (req, res) => {
    console.log(`Login ${req.method} registered.`)
    try {
        const findUser = await User.findOne({ //search the user table for a username that matches that which was entered by the end-user
            where: {
                username: req.body.username
            }
        })

        if (!findUser) { //if the username entered by the end-user does not exist in the User table, throw an error
            res.status(404).json({message: "Oops! Your credentials are invalid. Please try again. Line 16!"})
            return;
        }

        else {
            const verifyPass = findUser.verifyPassword(req.body.password);
            if (!verifyPass) { //if the password provided by the end-user does not match the password associated with the corresponding username, throw an error
                res.status(404).json({message: "Oops! Your credentials are invalid. Please try again. Line 23!"})
                return;
            }
            else {
                req.session.save(() => {
                    req.session.loggedIn = true;
                    console.log("You are now logged in!")
                    req.session.currentUser = findUser.getUserName();
                    req.session.currentUserId = findUser.getUserId();
                    console.log(req.session.currentUser);
                    res.status(200).json({message: "You are now logged in!"});

                });
                
            }
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});

//----------create a record in user table when user clicks signup button----------
router.post("/signup", async (req, res) => {
    console.log(`Signup ${req.method} registered.`)
    try {
        const createUser = await User.create({ //search the user table for a username that matches that which was entered by the end-user
            ...req.body
        })

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.currentUser = createUser.getUserName();
            req.session.currentUserId = findUser.getUserId();
            res.status(200).json({message: "You are now logged in!"})
        });



    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//----------logout of the application----------
router.delete("/logout", async (req,res) => {
    console.log(req.session.loggedIn);
    if (req.session.loggedIn) {
        req.session.destroy(() => { //end the user session of the user selects the logout a tag
            res.status(204).end(); 
        });
    }

    else {
        res.status(404).end();
    }

    console.log(`Logout ${req.method} registered.`)

});

//----------add a comment to a post----------
router.post("/newcomment", async (req,res) => {

    let currentDate = new Date(); //retrieve a date stamp
    let today = currentDate.toLocaleString(); //convert it into format that is more readable for end-user
    console.log(`New comment ${req.method} registered.`)
    console.log(`Today is ${today}`)
    const currentUserId = req.session.currentUserId; //this will grab the id of the user who is currently logged in

    //add a single record to the comment model
    try {
        const newComment = await Comment.create({
            post_id: req.body.post_id, //we will take this off of the url
            user_id: currentUserId,
            date: today, 
            content: req.body.content,

        });
        res.status(200).json(newComment);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    

});

//----------make a new post from the dashboard view-----------
router.post("/newpost", async (req,res) => {
    let currentDate = new Date(); //retrieve a date stamp
    let today = currentDate.toLocaleString(); //convert it into format that is more readable for end-user

    try {

        const newPost = await Post.create({
            user_id: req.session.currentUserId,
            date: today,
            title: req.body.title,
            content: req.body.content,

        });
        res.status(200).json(newPost); //write the new post record to the post table
    }

    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    
});

router.put("/updatepost", async(req,res) => {

    try {
        const updatePost = await Post.update({
            where: {
                id: req.body.post_id //req.body.post_id will be the req.queryparam
            },
        });
        res.status(200).json(updatePost);


    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }



});

module.exports = router;