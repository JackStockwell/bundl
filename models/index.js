const User = require('./User.js');
const Post = require('./Post.js');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = {
    User,
    Post
};