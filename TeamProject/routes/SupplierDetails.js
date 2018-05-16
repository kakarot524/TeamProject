var express = require("express");
var app = express();
var con = require('../connection.js');
var obj = {};
/*
app.get('/',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	 res.render('SupplierHome');
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
		if(req.session.roleidCookie == 2 || req.session.roleidCookie == 1)
		{
				
			 	var selectQuery = "Select * from supplier";
			 	console.log(selectQuery);
			 	con.query(selectQuery, function(error,rows,fields){
			 		if(error)
			 		{
			 			console.log(error)
			 		}
			 		else
			 		{	
			 			console.log("success!");
			 			obj = {data: rows};
			 			res.render('SupplierDetails', {data: rows, roleId: req.session.roleidCookie});
			 		}
			 	});


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
