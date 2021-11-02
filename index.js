/* eslint-disable object-curly-newline */
const { login, forget } = require("./basic");
const { jwt } = require("./jwt");
const { facebook } = require("./facebook");
const { google } = require("./google");
const { twitter } = require("./twitter");

module.exports = { login, forget, jwt, facebook, google, twitter };
