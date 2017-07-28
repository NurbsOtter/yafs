"use strict";
var Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://yafs:FAdeXi7uqATA@127.0.0.1/yafs"); //TODO: Config object!
let db ={};

sequelize.authenticate()
	.then(()=>{
		console.log("Db connected!")
	}).catch(err=>{
		console.log(err);
	});
db.User = sequelize.import('./user.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;