const TwitterStrategy = require("passport-twitter").Strategy;

module.exports = {
	twitter: [
		new TwitterStrategy(
			{
				consumerKey: "config.facebookID",
				consumerSecret: "config.facebookClientID",
				callbackURL: "http://localhost:3000/auth/facebook/callback",
			},
			(token, tokenSecret, profile, done) => {
				console.log(token);
				console.log(tokenSecret);
				console.log(profile);
				done(null, "eee");
			}
		),
	],
};
