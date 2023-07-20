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
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				is: /^[a-z]+$/i,
				len: [2, 32],
				isNull: {
					msg: "Cannot be empty!"
				},
			}
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