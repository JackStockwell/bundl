const seedUsers = require('./user-seeds');
const seedForums = require('./forum-seeds');
const seedPosts = require('./post-seeds');
const seedUserForum = require('./user-forum-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
  
    await seedForums();
    console.log('\n----- FORUMS SEEDED -----\n');
  
    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');

    await seedUserForum();
    console.log('\n----- USER FORUM FOLLOW SEEDED -----\n');
    
    process.exit(0);
};

seedAll();