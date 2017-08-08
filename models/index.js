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
db.Session = sequelize.import('./session.js');
db.Character = sequelize.import('./character.js');
console.log(db.Session);
db.User.hasMany(db.Session);
db.User.hasMany(db.Character);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
sequelize.sync();
module.exports = db;