var express = require("express");
var app = express();
var con = require('../connection.js');
var obj = {};


app.get('/',function(req,res){
	 	 
	 if(req.session.usernameCookie == null && req.session.roleidCookie == null)
	{
		res.redirect('/');
	}
	
	else 
	{
		if(req.session.roleidCookie == 2 || req.session.roleidCookie == 1)
		{
				res.render('inventoryHome');

			//selectAllUsers(con,obj,req,res);


		}
		else
		{
			res.redirect('/');

		}
		
	}
	
		console.log("usename cookie :"+req.session.usernameCookie);	
		console.log("role id cookie :"+req.session.roleidCookie);	
	 
 });
module.exports = app;
