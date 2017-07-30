"use strict";
var express = require('express');

var router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt');

router.get("/test",(req,res)=>{
	res.send("butts");
});

//Does the registration.
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
//Does da login
router.post("/",(req,res)=>{
	req.body.username = req.body.username.trim().replace(' ','').toLowerCase();	
	models.User.findOne({where:{
		username:req.body.username
	}}).then(foundUser=>{
		if (foundUser === null){
			res.status(401).json({"code":-3,"message":"User not found"});
		}else{
			bcrypt.compare(req.body.password,foundUser.password).then(result=>{				
				if (!result){
					res.status(401).json({"code":-4,"message":"Unauthorized"});					
				}else{
					var newModel = models.Session.create().then(newModel=>{
						foundUser.addSessions(newModel).then(newSession=>{
							newSession.getSessions().then(sess=>{
								var latestSess = sess.pop();
								res.json({"code":1,"sessionID":latestSess.sessionID,"csrf":latestSess.csrf});
							})
						});
					});
					
				}
			}).catch(err=>{
				console.log(err);
				res.status(500).json({"code":-2,"message":"Server Error"});
			})
		}
	})
});
//Gets the current user associated with your session.
router.get("/",(req,res)=>{
	if (req.authed){
		console.log(req.User.Sessions);
		res.json({"code":1,user:{
			"id":req.User.id,
			"username":req.User.username,
			"email":req.User.email,
			"csrf":req.User.Sessions[0].csrf			
		}
		});
	}else{
		res.status(401).json({"code":-4,"message":"Unauthorized"});
	}
})
module.exports = router;