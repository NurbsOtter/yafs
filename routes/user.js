"use strict";
var express = require('express');

var router = express.Router();
var models = require('../models');

router.get("/test",(req,res)=>{
	res.send("butts");
});

router.put("/",(req,res)=>{	
	models.User.create(req.body).then(()=>{
		res.status(201).json({"code":1,message:"Registered"});
	}).catch(err=>{
		if (err.name === "SequelizeUniqueConstraintError"){			
			var errors = err.errors.map((err)=>{
				return err.message;
			});
			res.status(409).json({"code":-1,message:"Fields must be unique",details:errors});
		}else{
			console.log(err.name);
			res.status(500).json({"code":-2,message:"Server error"});
		}
	})
});
module.exports = router;