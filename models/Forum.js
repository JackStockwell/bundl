const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Forum extends Model {};

Forum.init(
	{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
			primaryKey: true,
        },
		name: {
			type: DataTypes.STRING(32),
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	},
	{
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'forum',
    }
)

module.exports = Forum;