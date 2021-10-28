/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable no-return-await */
const bcrypt = require("bcrypt");

const { user, userDetail } = require("../models");

module.exports = {
	getUserForLogin: async (username, password) => {
		try {
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
			if (await bcrypt.compare(password, customer.dataValues.password)) { return customer.dataValues; }
			return { error: "Invalid username or password" };
		} catch (error) {
			return { error: "Invalid username or password" };
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
	regisTest: async (users) => {
		try {
			return await user.create(users);
		} catch (error) {
			return { error };
		}
	},
	checkEmail: async (email) => {
		try {
			const newUser = await user.findOne({ where: { email } });
			if (newUser) return newUser.dataValues;
			// eslint-disable-next-line no-throw-literal
			throw "Not found your email";
		} catch (error) {
			return { error: true, message: error };
		}
	},

	setPassword: async (id, password) => {
		try {
			const users = await user.update(
				{ password: await bcrypt.hash(password, 10) },
				{ where: { id } }
			);
			if (users) return;
			// eslint-disable-next-line no-throw-literal
			throw "Sever has problem.";
		} catch (error) {
			return { error: true, message: error };
		}
	},
};
