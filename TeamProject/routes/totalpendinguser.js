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
			var sqlquery = "select * From user_login l inner join role r on l.role_id = r.role_id where  user_id not in (select user_id from user_info);"
			con.query(sqlquery,function(error,rows,fields){
				if(error){
					console.log(error);

				}
				else{
					obj = {data: rows};
					res.render('totalpendinguser',obj);
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