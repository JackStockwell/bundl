const { Forum } = require('../models')

const forumData = [
    {
        "name": "Thecoolkids",
        "description": "Cool kids only, go away"
    },
    {
        "name": "Deepthoughts",
        "description": "Thoughts so deep, you'll need submersible"
    },
]

const seedForums = () => Forum.bulkCreate(forumData)

module.exports = seedForums;
