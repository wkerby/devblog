const sequelize = require("../config/connection")

const commentSeeds = require("./commentdata");
const postSeeds = require("./postdata")
const userSeeds = require("./userdata");

const seed = async() => {
    await sequelize.sync({force:true});

    await userSeeds();

    await postSeeds();

    await commentSeeds();

    process.exit(0);
}

seed(); 