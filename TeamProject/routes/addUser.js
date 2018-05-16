 
var express = require("express");
var app = express();
var con = require('../connection.js');

 app.post('/',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	 //res.send('Usernae: ' + req.body.username);
	  
	 userNameCheck(con, req, res);



 });
function userNameCheck(con, req, res){
	var checkString = "Select * from user_login where user_username =  '"+req.body.username+"';"
	con.query(checkString,function(error, rows, fields){
		if(!error)
		{
						if(rows.length == 1)
				        {
							console.log("Username Exists");
							var roleQuery = "select * from role";
								 con.query(roleQuery, function(error, rows, fields){

								 	if(error)
								 	{
								 		console.log(error);
								 	}
								 	else
								 	{
								 		
								 		res.render('newUserForm', {data:rows, msg: 'User Exists', user:req.session.usernameCookie});
								 	}
								 });
											
							
						}
						else
						{
							console.log("Username is available");
								var queryString = "INSERT INTO `user_login`(`user_username`,`user_password`,`user_fname`,`user_lname`, `user_email` ,`role_id`) VALUES ('" + req.body.username + "','" + req.body.password + "','" + req.body.fname + "','" + req.body.lname + "','" + req.body.email + "','" + req.body.role_id + "')";
	
								con.query(queryString, function(error, rows, fields){
									if(!error)
									{
										console.log("success");


										res.redirect('managerMenu#!/displayUsers');
									}
									else{
										console.log("error");
										console.log(error);
									}
								});
								//con.end();


														
						}
		}
		else
		{
		console.log(error);
		}

});
}


 module.exports = app;