const { User } = require('../models')

const userData = [
    {
        username: "FooUser",
        email: "foo@email.com",
        password: "encryptedPassword420"
    },
    {
        username: "dooUser",
        email: "doo@email.com",
        password: "thisismypassword"
    },
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers;