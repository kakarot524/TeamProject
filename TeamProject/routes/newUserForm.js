
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
		if(req.session.roleidCookie == 2)
		{
			

				var roleQuery = "select * from role";
				
				con.query(roleQuery, function(error, rows, fields){

				 	if(error)
				 	{
				 		console.log(error);
				 	}
				 	else
				 	{
				 		
				 		res.render('newUserForm', {data:rows, msg: '', user:req.session.usernameCookie});
				 	}
				 });

				//res.render('newUserForm',{msg: ' '});

			


		}
		else
		{
			res.redirect('/');

		}
		
	}
	
		console.log("usename cookie :"+req.session.usernameCookie);	
		console.log("role id cookie :"+req.session.roleidCookie);	
	 
 });//get-
 
module.exports = app;
