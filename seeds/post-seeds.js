const { Post } = require('../models')

const postData = [
    {
        "title": "My cool title",
        "content": "My super cool new thread!",
        "points": 50,
        "forum_id": [1],
        "user_id": [1]
    },
    {
        "title": "Can you tell me the meaning of..",
        "content": "Haven't got a scooby doo?",
        "points": 10000,
        "forum_id": [2],
        "user_id": [2]
    },
]

const seedPosts = () => Post.bulkCreate(postData)

module.exports = seedPosts;