"use strict";

var express = require('express');
var router = express.Router();
var models = require('../models');
//Create a character.
router.put("/",(req,res)=>{
	if (!req.authed){
		res.status(401).json({"code":-1,"message":"Not authorized"});
		return
	}
	var newChar = {
		"name":req.body.name,
		"creatorID":req.User.id
	};
	models.Character.create(newChar).then(char=>{
		req.User.addCharacters(char).then(()=>{
			res.status(201).json({"code":1,"message":"Character created.","CharID":char.id});
		}).catch(err=>{
			console.log(err);					
		});
	}).catch(err=>{
		if (err.name == "SequelizeUniqueConstraintError"){
			res.status(500).json({"code":-3,"message":"Character exists"});
		}else{
			console.log(err);
			res.status(500).json({"code":-2,"message":"Database error"});	
		}
	});
});
//Gets a character by their ID TODO:"Private characters"
router.get("/:id",(req,res)=>{
	models.Character.findById(req.params.id).then(char=>{
		if (char !== null){
			res.json(char);
		}else{
			res.status(404).json({"code":-1,"message":"Character not found"})
		}		
	}).catch(err=>{
		console.log(err);
		res.status(500).json({"code":-2,"message":"Database error"})
	});
});

module.exports = router;