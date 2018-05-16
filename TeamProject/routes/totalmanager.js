var express = require("express");
var app = express();
var con = require('../connection.js');

app.get('/',function(req,res){
	 	 
	 if(req.session.usernameCookie == null && req.session.roleidCookie == null){
		res.redirect('/');
	}
	
	else 
	{
		if(req.session.roleidCookie == 2){
			var sqlquery = "select u.user_id,u.user_username,u.user_fname,u.user_lname,u.user_email,r.role_position from user_login u inner join role r on u.role_id = r.role_id  where u.role_id='2' and u.user_id in(Select i.user_id From user_info i);"
			con.query(sqlquery,function(error,rows,fields){	
				if(error){
					console.log(error);

				}
				else{
					obj = {data: rows};
					res.render('totalmanager',obj);
				}
			});
		}

		else {
			res.redirect('/');
		}
	}
	    console.log("usename cookie :"+req.session.usernameCookie);	
		console.log("role id cookie :"+req.session.roleidCookie);	
	});
module.exports = app;