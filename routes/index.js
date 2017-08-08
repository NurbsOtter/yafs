"use strict";
var express = require('express');
var routes = express.Router();
var user = require('./user.js');
var character = require('./character.js');
routes.use("/user",user);
routes.use("/character",character);
module.exports = routes;
