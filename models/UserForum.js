// Imports
const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connection');

// Class extension
class UserForum extends Model {}

// ProductTag sequlize model.
UserForum.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'user',
        key: 'id'
      }
    },
    forum_id: {
      type: DataTypes.STRING,
      reference: {
        model: 'forum',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_forum',
  }
);

module.exports = UserForum;