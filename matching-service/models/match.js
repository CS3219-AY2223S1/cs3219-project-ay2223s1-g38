"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Match extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		// eslint-disable-next-line no-unused-vars
		static associate(models) {
			// define association here
		}
	}
	Match.init({
		user: {
			type: DataTypes.NUMBER,
			allowNull: false,
			unique: true,
		},
		difficulty: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		socketId: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	}, {
		sequelize,
		modelName: "Match",
	});
	return Match;
};