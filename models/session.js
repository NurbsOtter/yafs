"use strict";

module.exports = function(sequelize,DataTypes){
	var Session = sequelize.define("Session",{
		id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
		sessionID:{defaultValue:DataTypes.UUIDV4,type:DataTypes.UUID},
		csrf:{defaultValue:DataTypes.UUIDV4,type:DataTypes.UUID}
	})
	return Session;
}