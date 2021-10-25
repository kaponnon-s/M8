const FacebookStrategy = require("passport-facebook").Strategy;

module.exports = {
	facebook: [
		new FacebookStrategy(
			{
				clientID: " config.facebookID",
				clientSecret: "config.facebookClientID",
				callbackURL: "http://localhost:3000/auth/facebook/callback",
			},
			(accessToken, refreshToken, profile, done) => {
				console.log(accessToken);
				console.log(refreshToken);
				console.log(profile);
				done(null, "eee");
			}
		),
	],
};
