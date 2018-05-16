 
var express = require("express");
var app = express();
var con = require('../connection.js');
var obj = {};
 app.get('/',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	 //res.send('Usernae: ' + req.body.username);


//sup
	
	var selectQuery = "select user_id, user_username, user_password, user_fname, user_lname, user_email, role_position from user_login inner join role on role.role_id = user_login.role_id where user_id = " + req.session.User_ID; 
	console.log(selectQuery);

	con.query(selectQuery, function(error, rows, fields){
		if(!error)
		{
			console.log("second success");
			obj={data:rows};
			res.render('PendingForm', obj);
		}
		else
		{
			console.log(error);
		}
	});


//con.end();


 });


 module.exports = app;