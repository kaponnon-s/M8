/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable no-return-await */
const { user, address, userDetail } = require("../models");

module.exports = {
	getUserForLogin: async (username, password) => {
		try {
			if (!password) return { error: "Invalid username or password" };
			const customer = await user.findOne({
				where: { username },
				include: [
					{
						model: userDetail,
						attributes: { exclude: ["createdAt", "updatedAt"] },
					},
				],
				attributes: { exclude: ["createdAt", "updatedAt"] },
			});
			if (customer) return customer.dataValues;
			return { error: "Invalid username or password" };
		} catch (error) {
			return { error };
		}
	},
	getPassword: async (username) => {
		try {
			const customer = await user.findOne({
				where: { username },
				attributes: ["password"],
			});
			if (customer) return customer.dataValues.password;
			return { error: "Invalid username or password" };
		} catch (error) {
			return { error };
		}
	},
	register: async (users, userDetails) => {
		try {
			const newUser = await user.create(users);

			try {
				await newUser.createUserDetail(userDetails);
			} catch (error) {
				await newUser.destroy();
				throw error;
			}

			return await user.findOne({
				where: { id: newUser.dataValues.id },
				include: [
					{
						model: userDetail,
						attributes: { exclude: ["createdAt", "updatedAt"] },
					},
				],
				attributes: { exclude: ["createdAt", "updatedAt"] },
			});
		} catch (error) {
			return { error };
		}
	},
};
