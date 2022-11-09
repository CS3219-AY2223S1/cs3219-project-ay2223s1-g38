"use strict";
const { Difficulty } = require("../constants/types");

module.exports = {
	async up (queryInterface, Sequelize) {
		/**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
		await queryInterface.bulkInsert("Matches", [
			{
				user1: 1,
				difficulty: Difficulty.EASY,
				createdAt: new Date().toDateString(),
				updatedAt: new Date().toDateString()
			},
			{
				user1: 3,
				difficulty: Difficulty.HARD,
				createdAt: new Date().toDateString(),
				updatedAt: new Date().toDateString()
			},
		]);
	},

	async down (queryInterface, Sequelize) {
		/**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
		await queryInterface.bulkDelete("Matches", null, {});
	}
};
