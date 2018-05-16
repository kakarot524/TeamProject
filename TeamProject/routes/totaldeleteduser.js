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
			var sqlquery = "select l.user_username, l.user_fname, l.user_lname, l.user_email, r.role_position, l.login_modified from user_login l inner join role r on l.role_id = r.role_id where l.role_id = 4;"
			con.query(sqlquery,function(error,rows,fields){
				if(error){
					console.log(error);

				}
				else{
					obj = {data: rows};
					res.render('totaldeleteduser',obj);
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