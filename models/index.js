const User = require('./User.js');
const Post = require('./Post.js');
const Forum = require('./Forum.js');
const Comment = require('./Comment.js')
const UserForum = require('./UserForum.js');

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

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Forum, {
    through: UserForum,
    foreignKey: 'user_id',
});

Forum.belongsToMany(User, {
    through: UserForum,
    foreignKey: 'forum_id'
});

module.exports = {
    Forum,
    Post,
    User, 
    UserForum,
    Comment
};