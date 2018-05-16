var express = require("express");
var app = express();
var con = require('../connection.js');
var id ;
obj = {};
app.post('/',function(req,res){



	// res.sendFile(path.join(__dirname+'/index.html'));

	 //res.render('changePassword');
	 var updatePassword = "UPDATE user_login set user_password =  '"+req.body.password+"' WHERE user_id = '"+req.body.user_id+"';" 

	 //var checkQuery = "select login.user_id, user_username, user_password, user_fname, user_lname, user_securityAnswer1, user_securityAnswer2, user_securityAnswer3 from user_login as login inner join user_info as info on login.user_id = info.user_id where login.user_username = '"+req.body.username+"';"
	
 	console.log(updatePassword);
	 con.query(updatePassword, function(error, rows, fields){
	 	if(error)
	 	{
	 		console.log(error);
	 	}
	 	else
	 	{
	 		//obj = {data: rows}
	 		res.render('login',{msg: 'success!'});
	 		
	 	}
	 });
 

 });

module.exports = app;