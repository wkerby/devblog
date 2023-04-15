const User = require("../models/User");

const users = [
    {
        id:1,
        username:"Yantheman96",
        password: "Ilovebakedbeans"


    },

    {
        id:2,
        username:"TheincredibleJuan",
        password: "Battenkill2"
    },
]

const userSeeds = () => User.bulkCreate(users);

module.exports = userSeeds;