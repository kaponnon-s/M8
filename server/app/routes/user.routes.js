const router = require("express").Router();

const {
	register, login, loginFacebook, callbackFacebook
} = require("../controllers/user.controllers");

router.post("/register", register);
router.post("/login", login);
router.get("/loginFacebook", loginFacebook);
router.get("/callbackFacebook", callbackFacebook);

module.exports = router;
