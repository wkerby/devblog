const Comment = require("../models/Comment");
const comments = [
    {
        id:1,
        post_id:1,
        user_id:2,
        content: "What is your favorite type of canned beans?"


    },

    {
        id:2,
        post_id:1,
        user_id:1,
        content: "I really like Bush's baked beans!"
    },
]

const commentSeeds = () => Comment.bulkCreate(comments);

module.exports = commentSeeds;