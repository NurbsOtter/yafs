"use strict";
var express = require('express');
var models = require('../models');

module.exports = function APIAuth(req,res,next) {
	var auth = req.get('Authorization');	
	var req = req; //Hoisting for the func	
	if (auth === null){
		req.authed = false;
		next();
	}else{
		models.User.findOne({
			include:[
				{
					model:models.Session,
					where:{sessionID:auth}
				}
			]
		}).then(res=>{
			if (res === null){
				req.authed = false;
			}else{
				req.authed = true;
				req.User = res;
			}
			next();
		});
	}	
}