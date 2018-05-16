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

				var managerID = req.session.User_ID;
				var QueryCheck = "select * from user_login where user_id not in (select user_id from user_info) AND user_id = " + managerID;
				console.log(QueryCheck);
				con.query(QueryCheck, function(error, rows, fields){
					if(error)
					{
						console.log(error);
					}
					else
					{
						if(rows.length == 1)
						{
							console.log("you are a pending user");
							res.redirect('PendingForm');
						}
						else
						{
							console.log("you are a confirmed user");
							res.render('managerMenu', {msg : '', user: req.session.usernameCookie});

						}
					}
				});


				//res.render('managerMenu', {msg : '', user: req.session.usernameCookie});

			//selectAllUsers(con,obj,req,res);



		}
		else
		{
			res.redirect('/');
		}
		
	}
		console.log("usename cookie from managerMenu.js:"+req.session.usernameCookie);	
		console.log("role id cookie from managerMenu.js:"+req.session.roleidCookie);	
 });
module.exports = app;