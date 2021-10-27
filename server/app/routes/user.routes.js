const router = require("express").Router();

const {
	register,
	showUser,
	login,
	loginFacebook,
	callbackFacebook,
	loginGoogle,
	callbackGoogle,
	loginTwitter,
	callbackTwitter,
} = require("../controllers/user.controllers");

router.post("/register", register);
router.get("/showUser", showUser);
router.post("/login", login);
router.get("/loginFacebook", loginFacebook);
router.get("/callbackFacebook", callbackFacebook);
router.get("/loginGoogle", loginGoogle);
router.get("/callbackGoogle", callbackGoogle);
router.get("/loginTwitter", loginTwitter);
router.get("/callbackTwitter", callbackTwitter);

module.exports = router;
