
var express = require("express");
var app = express();
var con = require('../connection.js');
var id ;
app.post('/',function(req,res){
	
	var user_id = req.body.user_id;
	var role_id = req.body.role_id;


	console.log(role_id);

	var UpdateQuery = "UPDATE user_login set role_id = '" + role_id + "' where user_id = " + user_id;
	

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

		//res.redirect('managerMenu#!/displayUsers');
		console.log("success");
		res.redirect('managerMenu#!/displayUsers');



	}


});

	 /*var SecondQuery = "UPDATE user_info set user_address = '" + address + "', user_city = '" + city + "', user_state = '" + state + "', user_zip = '" + zip + "', security_answer1 = '" + answer1 + "', security_answer2 = '" + answer2 + "', security_answer3 = '" + answer3 + "' where user_id = " + user_id;
	console.log(SecondQuery);

	con.query(SecondQuery, function(error, rows,fields){
		if(error){
			console.log(error);
		}
		else{
			console.log("success");

			
		}
	})*/


 });

module.exports = app;