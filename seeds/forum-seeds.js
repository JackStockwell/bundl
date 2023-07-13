const { Forum } = require('../models')

const forumData = [
    {
        "name": "thecoolkids",
        "description": "Cool kids only, go away"
    },
    {
        "name": "deepthoughts",
        "description": "Thoughts so deep, you'll need submersible"
    },
]

const seedForums = () => Forum.bulkCreate(forumData)

module.exports = seedForums;
