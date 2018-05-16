var express = require("express");
var app = express();
/*
app.get('/',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	 res.render('reportHome');
 });

module.exports = app;
*/
app.get('/',function(req,res){
	 	 
	 if(req.session.usernameCookie == null && req.session.roleidCookie == null)
	{
		res.redirect('/');
	}
	
	else 
	{
		if(req.session.roleidCookie == 2)
		{
				res.render('reportHome');

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
