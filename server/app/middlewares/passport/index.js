/* eslint-disable object-curly-newline */
const passport = require("passport");
const {
	login,
	forget,
	jwt,
	facebook,
	google,
	twitter,
} = require("./strategies");

passport.use(passport.initialize());

passport.use(...login);
passport.use(...forget);
passport.use(...jwt);
passport.use(...facebook);
passport.use(...google);
passport.use(...twitter);

module.exports = passport;
