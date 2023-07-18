const { UserForum } = require('../models/')

const userFollowData = [
    {
        user_id: 1,
        forum_id: 1,
    },
    {
        user_id: 2,
        forum_id: 1,
    },
    {
        user_id: 2,
        forum_id: 2,
    },
]

const userSeedData = () => UserForum.bulkCreate(userFollowData)

module.exports = userSeedData;