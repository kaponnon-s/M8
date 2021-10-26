const fs = require("fs");
const path = require("path");

module.exports = {
	combined: [
		("combined",
		{
			skip: (req, res) => res.statusCode < 400,
			stream: fs.createWriteStream(
				path.join(global.basename, "./logs", "./error.log"),
				{ flags: "a" }
			),
		}),
	],

	common: [
		("common",
		{
			stream: fs.createWriteStream(
				path.join(global.basename, "./logs", "access.log"),
				{ flags: "a" }
			),
		}),
	],
};
