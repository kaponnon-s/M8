const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const router = require("../routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(cors());

app.use("/api", router);

module.exports = app;
