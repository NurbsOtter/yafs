"use strict";
//Represents a character. Users have these. Like profiles! Can have a bunch, so people don't make 50 accounts for their 50 OCs. Also maybe will let people transfer them, adoptables and stuff? That'd be cool.
module.exports = function(sequelize,DataTypes){
	var character = sequelize.define("character",{
		id:{
			type:DataTypes.INTEGER,
			autoIncrement:true,
			primaryKey:true
		},
		name:{
			type:DataTypes.STRING(128), //I can only imagine someone will want to name themselves. "Baron Von ShadowWolfFox The Third (Babyfur)" And that's only 43 chars, so 128 should be more than enough.
			allowNull:false, //Ya need a name.
			len:[0,128],
			unique:true
		},
		creatorID:{ //We store this special, as it's immutable.
			type:DataTypes.INTEGER,			
		}//TODO: Tags, images etc.
	});
	return character;
}