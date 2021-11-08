const TwitterStrategy = require("passport-twitter").Strategy;

module.exports = {
	twitter: [
		new TwitterStrategy(
			{
				consumerKey: process.env.TWITTER_CLIENT_ID,
				consumerSecret: process.env.TWITTER_SECRET_ID,
				callbackURL: "/api/user/callbackTwitter",
			},
			(token, tokenSecret, profile, done) => {
				console.log(profile);
				done(null, profile);
			}
		),
	],
};
