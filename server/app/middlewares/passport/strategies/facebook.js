const FacebookStrategy = require("passport-facebook").Strategy;

module.exports = {
	facebook: [
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_CLIENT_ID,
				clientSecret: process.env.FACEBOOK_SECRET_ID,
				callbackURL: "/api/user/callbackFacebook",
			},
			(accessToken, refreshToken, profile, done) => {
				console.log(profile);
				done(null, profile);
			}
		),
	],
};
