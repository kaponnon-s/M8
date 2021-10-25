const fs = require("fs");
const path = require("path");

const privateKey = fs.readFileSync(path.resolve(__dirname, "jwtRS256.key"), "utf8");
const publicKey = fs.readFileSync(path.resolve(__dirname, "jwtRS256.key.pub"), "utf8");

module.exports = {
	privateKey,
	publicKey
};
