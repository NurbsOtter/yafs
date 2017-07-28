"use strict";
var express = require('express');
var routes = express.Router();
var user = require('./user.js');
routes.use("/user",user);
module.exports = routes;
