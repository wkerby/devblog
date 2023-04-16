const Post = require("../models/Post");
const posts = [
    {
        id:1,
        user_id:1,
        title: "Wazzup",
        content: "This devblog is really cool!"


    },

    {
        id:2,
        user_id:2,
        title: "Random title",
        content: "I actually hate this devblog."
    },
]

const postSeeds = () => Post.bulkCreate(posts);

module.exports = postSeeds;