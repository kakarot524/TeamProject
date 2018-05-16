 
var express = require("express");
var app = express();
var con = require('../connection.js');
var obj = {};
 app.post('/',function(req,res){

 userNameCheck(con, req, res);

	// res.sendFile(path.join(__dirname+'/index.html'));
	 //res.send('Usernae: ' + req.body.username);





//con.end();


 });
 app.get('/WelcomeNewUser',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	 res.render('WelcomeNewUser');
 });

function userNameCheck(con, req, res){
	var checkString = "Select * from user_login where user_username =  '"+req.body.username+"';"
	con.query(checkString,function(error, rows, fields){
		if(!error)
		{
				if(rows.length == 1)
						{
							console.log("Username Exists");
							res.render('register', {msg: 'user Exists'});
							
						}
						else
						{
							console.log("Username is available");
							 var Customer_Role = 3; 
							 var queryString = "INSERT INTO `user_login`(`user_username`,`user_password`,`user_fname`,`user_lname`, `user_email` ,`role_id`) VALUES ('" + req.body.username + "','" + req.body.password + "','" + req.body.fname + "','" + req.body.lname + "','" + req.body.email + "','" + Customer_Role + "')";
								
								con.query(queryString, function(error, rows, fields){
								if(!error)
								{
									console.log("success");
									req.session.usernameCookie = req.body.username;
									req.session.roleidCookie = Customer_Role;
								//	res.render('WelcomeNewUser');
								}
								else{
									console.log("error");
									console.log(error);
								}
							});



								//var secondQuery = "SELECT * from user_login WHERE user_username = '" + username + "' ";
								var secondQuery = "select * from user_login where user_username =  '"+req.body.username+"' AND user_password = '"+req.body.password+"';"
								console.log(secondQuery);

								con.query(secondQuery, function(error, rows, fields){
									if(!error)
									{
										console.log("second success");
										obj={data:rows};
										res.render('WelcomeNewUser', obj);
									}
									else
									{
										console.log(error);
									}
								});

														
													}
									}
									else
									{
										console.log(error);
									}

								});
}


 module.exports = app;