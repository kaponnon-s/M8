const router = require("express").Router();

const { login } = require("../controllers/user.controllers");

router.post("/login", login);

module.exports = router;
