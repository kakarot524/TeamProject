
var express = require("express");
var app = express();
var con = require('../connection.js');


app.get('/',function(req,res){
	
	var obj = {};
	
	if(req.session.usernameCookie == null && req.session.roleidCookie == null)
	{
		res.redirect('/');
	}
	
	else 
	{
		if(req.session.roleidCookie == 2)
		{
			 var SelectQuery = "select login.user_id,login.user_username, user_password, user_fname, user_lname, user_email, role_position, user_address, user_city, user_state, user_zip, user_phone, security_question1, security_answer1, security_question2, security_answer2, security_question3, security_answer3, user_created from user_login as login inner join user_info as info on login.user_id = info.user_id inner join role as role on role.role_id = login.role_id where info.user_id = login.user_id";

			 console.log(SelectQuery);
			 con.query(SelectQuery, function(error, rows, fields){
	 	

			if (error) {
			console.log("login username does not exist error", error);
			res.send({
				"code":400,
				"failed":"username error ocurred"
			})
			}
			else
			{
		
				obj = rows;
				
				var roleQuery = "select * from role";
				
				con.query(roleQuery, function(error, rows1, fields){

				 	if(error)
				 	{
				 		console.log(error);
				 	}
				 	else
				 	{
				 		res.render('displayUsers', {data: obj, data1: rows1, msg: '', user:req.session.usernameCookie});
						//res.render('managerMenu', obj);
			
				 		}
				 });
				}


			});
			
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

