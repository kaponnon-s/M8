/* eslint-disable no-unused-vars */
const user = require("../config/data/user");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("users", user, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("users", null, {});
	},
};
