
var express = require("express");
var app = express();
var con = require('../connection.js');
var obj = {};
app.get('/',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	
	 //var SelectQuery = "SELECT * from user_login ";
	 var SelectQuery = "select user_id, user_username, user_password, user_fname, user_lname, user_email, role_position from user_login inner join role on role.role_id = user_login.role_id where user_id not in (select user_id from user_info)";
	 console.log(SelectQuery);
	 con.query(SelectQuery, function(error, rows, fields){
	 	

	if (error) {
			console.log("login username does not exist error", error);
			res.send({
				"code":400,
				"failed":"username error ocurred"
			})
	}
	else{
		
		obj = {data: rows};
		res.render('viewPendingUsers', obj);
		//res.render('managerMenu', obj);




	}


});
 });

module.exports = app;