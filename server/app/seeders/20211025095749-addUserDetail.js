/* eslint-disable no-unused-vars */
const userDetail = require("../config/data/userDetail");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("user_details", userDetail, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("user_details", null, {});
	},
};
