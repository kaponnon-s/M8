const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const router = require("../routes");
const { combined, common } = require("./morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(morgan(...common));
app.use(morgan(...combined));

app.use("/api", router);

module.exports = app;
