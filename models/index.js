const User = require('./User.js');
const Post = require('./Post.js');
const Forum = require('./Forum.js')

Forum.hasMany(Post, {
    foreignKey: 'forum_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(Forum, {
    foreignKey: 'forum_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});



module.exports = {
    Forum,
    Post,
    User
};