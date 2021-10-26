/* eslint-disable no-unused-vars */
const address = require("../config/data/address");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("addresses", address, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("addresses", null, {});
	},
};
