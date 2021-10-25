/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable no-return-await */
const { user } = require("../models");

module.exports = {
	getUser: async (username, password) => {
		const customer = await user.findOne({
			where: { username, password },
		});
		if (customer) return customer.dataValues;
		return { error: "Invalid username or password" };
	},
};
