const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "social_users", deps: []
 * createTable() => "users", deps: []
 * createTable() => "addresses", deps: [users, social_users]
 * createTable() => "user_details", deps: [social_users, users]
 *
 */

const info = {
	revision: 1,
	name: "createDatabase",
	created: "2021-10-29T14:24:03.895Z",
	comment: "",
};

const migrationCommands = (transaction) => [
	{
		fn: "createTable",
		params: [
			"social_users",
			{
				id: {
					type: Sequelize.STRING,
					field: "social_user_id",
					autoIncrement: false,
					primaryKey: true,
				},
				displayName: {
					type: Sequelize.STRING,
					field: "display_name",
					allowNull: false,
				},
				provider: {
					type: Sequelize.STRING,
					field: "provider",
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
			"users",
			{
				id: {
					type: Sequelize.INTEGER,
					field: "user_id",
					autoIncrement: true,
					primaryKey: true,
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
			},
			{ transaction },
		],
	},
	{
		fn: "createTable",
		params: [
			"addresses",
			{
				id: {
					type: Sequelize.INTEGER,
					field: "address_id",
					autoIncrement: true,
					primaryKey: true,
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
				userId: {
					type: Sequelize.INTEGER,
					field: "user_id",
					onUpdate: "CASCADE",
					onDelete: "SET NULL",
					references: { model: "users", key: "user_id" },
					allowNull: true,
				},
				socialUserId: {
					type: Sequelize.STRING,
					field: "social_user_id",
					onUpdate: "CASCADE",
					onDelete: "SET NULL",
					references: { model: "social_users", key: "social_user_id" },
					allowNull: true,
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
				socialUserId: {
					type: Sequelize.STRING,
					field: "social_user_id",
					onUpdate: "CASCADE",
					onDelete: "SET NULL",
					references: { model: "social_users", key: "social_user_id" },
					allowNull: true,
				},
				userId: {
					type: Sequelize.INTEGER,
					field: "user_id",
					onUpdate: "CASCADE",
					onDelete: "SET NULL",
					references: { model: "users", key: "user_id" },
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
		params: ["social_users", { transaction }],
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
