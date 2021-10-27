const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = {
	google: [
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_SECRET_ID,
				callbackURL: "/api/user/callbackGoogle",
			},
			(token, tokenSecret, profile, done) => {
				done(null, profile);
			}
		),
	],
};
