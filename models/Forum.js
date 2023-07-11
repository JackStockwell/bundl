const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Forum extends Model {};

Forum.init(
	{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
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