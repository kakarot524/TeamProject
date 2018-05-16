var express = require("express");
var app = express();
var con = require('../connection.js');

app.get('/',function(req,res){

	var username = req.session.usernameCookie;
	var accountQuery = "select l.user_id, l.user_username, l.user_password, l.user_fname, l.user_lname, l.user_email, i.user_address, i.user_city, i.user_state, i.user_zip, i.user_phone, i.security_question1, i.security_answer1,i.security_question2,i.security_answer2,i.security_question3,i.security_answer3 from user_login l inner join user_info i on l.user_id = i.user_id where l.user_username = '"+username+"'";
	console.log(accountQuery);

   con.query(accountQuery, function(error, rows, fields){

	 	if(error)
	 	{
	 		console.log(error);
	 	}
	 	else
	 	{
	 		
	 		res.render('manageAccount', {data: rows});
	 	}
	 });



 });

module.exports = app;

