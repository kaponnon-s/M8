module.exports = {
	development: {
		username: process.env.USER || "node",
		password: process.env.PASSWORD || "password",
		database: process.env.DATABASE || "authentication",
		host: process.env.HOSTDB || "127.0.0.1",
		dialect: "mysql",
	},
	test: {
		username: "root",
		password: null,
		database: "database_test",
		host: "127.0.0.1",
		dialect: "mysql",
	},
	production: {
		username: "root",
		password: null,
		database: "database_production",
		host: "127.0.0.1",
		dialect: "mysql",
	}
};
