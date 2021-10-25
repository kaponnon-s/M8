const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "addresses", deps: []
 * createTable() => "user_details", deps: []
 * createTable() => "users", deps: [addresses, user_details]
 *
 */

const info = {
	revision: 1,
	name: "createDatabase",
	created: "2021-10-25T10:13:56.839Z",
	comment: "",
};

const migrationCommands = (transaction) => [
	{
		fn: "createTable",
		params: [
			"addresses",
			{
				id: {
					type: Sequelize.INTEGER,
					field: "id",
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
				},
				homeNo: { type: Sequelize.STRING, field: "home_no", allowNull: false },
				road: { type: Sequelize.STRING, field: "road", allowNull: false },
				subDistrict: {
					type: Sequelize.STRING,
					field: "sub_district",
					allowNull: false,
				},
				district: {
					type: Sequelize.STRING,
					field: "district",
					allowNull: false,
				},
				province: {
					type: Sequelize.STRING,
					field: "province",
					allowNull: false,
				},
				zipCode: {
					type: Sequelize.STRING,
					field: "zip_code",
					allowNull: false,
				},
				createdAt: {
					type: Sequelize.DATE,
					field: "created_at",
					allowNull: false,
				},
				updatedAt: {
					type: Sequelize.DATE,
					field: "updated_at",
					allowNull: false,
				},
			},
			{ transaction },
		],
	},
	{
		fn: "createTable",
		params: [
			"user_details",
			{
				id: {
					type: Sequelize.INTEGER,
					field: "id",
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
				},
				name: { type: Sequelize.STRING, field: "name", allowNull: false },
				gender: { type: Sequelize.STRING, field: "gender", allowNull: false },
				age: { type: Sequelize.STRING, field: "age", allowNull: false },
				height: { type: Sequelize.STRING, field: "height", allowNull: false },
				weight: { type: Sequelize.STRING, field: "weight", allowNull: false },
				congenitalDisease: {
					type: Sequelize.STRING,
					field: "congenital_disease",
					allowNull: true,
				},
				phone: { type: Sequelize.STRING, field: "phone", allowNull: false },
				createdAt: {
					type: Sequelize.DATE,
					field: "created_at",
					allowNull: false,
				},
				updatedAt: {
					type: Sequelize.DATE,
					field: "updated_at",
					allowNull: false,
				},
			},
			{ transaction },
		],
	},
	{
		fn: "createTable",
		params: [
			"users",
			{
				id: {
					type: Sequelize.INTEGER,
					field: "id",
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
				},
				username: {
					type: Sequelize.STRING,
					field: "username",
					unique: true,
					allowNull: false,
				},
				password: {
					type: Sequelize.STRING,
					field: "password",
					allowNull: false,
				},
				email: {
					type: Sequelize.STRING,
					field: "email",
					unique: true,
					allowNull: false,
				},
				createdAt: {
					type: Sequelize.DATE,
					field: "created_at",
					allowNull: false,
				},
				updatedAt: {
					type: Sequelize.DATE,
					field: "updated_at",
					allowNull: false,
				},
				addressId: {
					type: Sequelize.INTEGER,
					field: "address_id",
					onUpdate: "CASCADE",
					onDelete: "SET NULL",
					references: { model: "addresses", key: "id" },
					allowNull: true,
				},
				userDetailId: {
					type: Sequelize.INTEGER,
					field: "user_detail_id",
					onUpdate: "CASCADE",
					onDelete: "SET NULL",
					references: { model: "user_details", key: "id" },
					allowNull: true,
				},
			},
			{ transaction },
		],
	},
];

const rollbackCommands = (transaction) => [
	{
		fn: "dropTable",
		params: ["addresses", { transaction }],
	},
	{
		fn: "dropTable",
		params: ["users", { transaction }],
	},
	{
		fn: "dropTable",
		params: ["user_details", { transaction }],
	},
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
	let index = pos;
	const run = (transaction) => {
		const commands = _commands(transaction);
		return new Promise((resolve, reject) => {
			const next = () => {
				if (index < commands.length) {
					const command = commands[index];
					console.log(`[#${index}] execute: ${command.fn}`);
					index++;
					queryInterface[command.fn](...command.params).then(next, reject);
				} else resolve();
			};
			next();
		});
	};
	if (useTransaction) return queryInterface.sequelize.transaction(run);
	return run(null);
};

module.exports = {
	pos,
	useTransaction,
	up: (queryInterface, sequelize) => execute(queryInterface, sequelize, migrationCommands),
	down: (queryInterface, sequelize) => execute(queryInterface, sequelize, rollbackCommands),
	info,
};
