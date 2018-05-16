var express = require("express");
var app = express();
var con = require('../connection.js');


app.get('/',function(req,res){
	 	 
	 if(req.session.usernameCookie == null && req.session.roleidCookie == null)
	{
		res.redirect('/');
	}
	
	else 
	{
		if(req.session.roleidCookie == 2 || req.session.roleidCookie == 1 )
		{
				
			 	res.render('newSupplierForm', {roleId : req.session.roleidCookie});


				//res.render('SupplierHome');

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
