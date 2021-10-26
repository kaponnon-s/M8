require("dotenv").config();
require("./app/middlewares/passport");

global.basename = __dirname;

const app = require("./app/config/express");

const listener = app.listen(process.env.PORT || 5000, (err) => {
	if (err) {
		console.log(err);
	}
	// eslint-disable-next-line no-undef
	console.log(`Server is running on port ${listener.address().port}`);
});
