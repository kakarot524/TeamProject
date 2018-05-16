
var express = require("express");
var app = express();
var con = require('../connection.js');
var id ;
app.post('/',function(req,res){
	
	var user_id = req.body.user_id;
	var username = req.body.username;
	var password = req.body.password;
	var fname = req.body.fname;
	var lname = req.body.lname;
	var email = req.body.email;
	var role_id = req.body.role_id;
	var address = req.body.address;
	var city = req.body.city;
	var state = req.body.state;
	var zip = req.body.zip;


	console.log(role_id);

	var UpdateQuery = "UPDATE user_login set user_username = '" + username + "', user_password = '" + password + "', user_fname = '" + fname + "', user_lname = '" + lname + "', user_email = '" + email + "', role_id = '" + role_id + "' where user_id = " + user_id;
	

	 //var SelectQuery = "SELECT * from user_login where user_id = " + id;
	

	 console.log(UpdateQuery);
	 con.query(UpdateQuery, function(error, rows, fields){
	 	

	if (error) {
			console.log("login username does not exist error", error);
			res.send({
				"code":400,
				"failed":"error ocurred"
			})
	}
	else{
		
		//obj = {data: rows};
		//res.render('editTest', obj);
		//res.render('managerMenu', obj);

		res.redirect('managerMenu#!/viewPendingUsers');
		//console.log("success now time for second query");



	}


});

});

module.exports = app;