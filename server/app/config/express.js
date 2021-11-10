const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
// const router = require("../routes");
const { combined, common } = require("./morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "twitter" }));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(morgan(...common));
app.use(morgan(...combined));

// app.use("/api", router);

app.use("/", (req, res) => {
	console.log("Hello World");
});

// app.use(express.static(path.join(global.basename, "../client/build")));

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(global.basename, "../client/build/index.html"));
// });

module.exports = app;
