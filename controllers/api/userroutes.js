const router = require("express").Router();
const { User } = require("../../models"); //here we will need access to the user model in order to verify username and password

///----------attempt to log in a user from the login page and begin session if credentials are verified----------
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
            res.status(200).json({message: "You are now logged in!"})
        });



    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post("/addcomment", async (req,res) => {

    let currentDate = new Date(); //retrieve a date stamp
    let today = currentDate.toLocaleString(); //convert it into format that is more readable for end-user
    console.log(`Add comment ${req.method} registered.`)
    console.log(`Today is ${today}`) 

    if (req.session.loggedIn) { //why won't this work?
        console.log(`The user is logged in`);
    }

    else {
        console.log("Not logged in.")
    }
    
    

    // try {
    //     const newComment = await Comment.create({
    //         ...req.body
    //     })
    // }
})

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

})

module.exports = router;