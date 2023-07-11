const { Post } = require('../models')

const postData = [
    {
        title_text: "My cool title",
        content: "My super cool new thread!",
        points: 50,
        forum_id: [0],
        user_id: [0]
    },
    {
        title_text: "Can you tell me the meaning of..",
        content: "Haven't got a scooby doo?",
        points: 10000,
        forum_id: [1],
        user_id: [1]
    },
]

const seedPosts = () => Post.bulkCreate(postData)

module.exports = seedPosts;

