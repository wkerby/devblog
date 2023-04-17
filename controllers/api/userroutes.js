const router = require("express").Router();
const { User } = require("../../models"); //here we will need access to the user model in order to verify username and password

///----------attempt to log in a user from the login page and begin session if credentials are verified----------
router.post("/login", async (req, res) => {
    console.log(`${req.method} registered.`)
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
                    req.session.currentUser = findUser.getUserName();
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


router.post("/signup", async (req, res) => {
    console.log(`${req.method} registered.`)
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

module.exports = router;