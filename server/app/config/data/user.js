const bcrypt = require("bcrypt");

module.exports = [
	{
		username: "kaponnon",
		password: bcrypt.hashSync("22525440", 10),
		email: "kaponnon@gmail.com",
		created_at: new Date(),
		updated_at: new Date()
	},
];
