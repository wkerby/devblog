const Post = require("../models/Post");
const posts = [
    {
        id:1,
        user_id:1,
        content: "This devblog is really cool!"


    },

    {
        id:2,
        user_id:2,
        content: "I actually hate this devblog."
    },
]

const postSeeds = () => Post.bulkCreate(posts);

module.exports = postSeeds;