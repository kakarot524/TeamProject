var express = require("express");
var app = express();
var con = require('../connection.js');

app.post('/',function(req,res){
	console.log("in next page");

	var id = req.body.user_id;
	var password = req.body.password;
	var fname = req.body.fname;
	var lname = req.body.lname;
	var email = req.body.email;
	var address = req.body.address;
	var city = req.body.city;
	var state = req.body.state;
	var zip = req.body.zip;
	var phone = req.body.phone;
	var securityQuestion1 = req.body.SecurityQuestion1;
	var securityQuestion2 = req.body.SecurityQuestion2;
	var securityQuestion3 = req.body.SecurityQuestion3;
	var securityAnswer1 = req.body.SecurityAnswer1;
	var securityAnswer2 = req.body.SecurityAnswer2;
	var securityAnswer3 = req.body.SecurityAnswer3;
	console.log(id + password + fname + lname + email + address + city + state + zip + phone + securityQuestion1 + securityQuestion2 + securityQuestion3 + securityAnswer1 + securityAnswer2 + securityAnswer3);
	
	var updateAccountLogin = "UPDATE user_login set user_password = '" + password + "', user_fname = '" + fname + "', user_lname = '" + lname + "', user_email = '" + email + "'  where user_id = " + id;
 	var updateAccountInfo = "UPDATE user_info set user_address = '" + address + "', user_city = '" + city + "' , user_state = '"+state+"', user_zip = '"+zip+"', user_phone='"+phone+"', security_question1 = '"+securityQuestion1+"', security_question2 = '"+securityQuestion2+"', security_question3 = '"+securityQuestion3+"', security_answer1 = '"+securityAnswer1+"', security_answer2 = '"+securityAnswer2+"', security_answer3='"+securityAnswer3+"'  where user_id = " + id;
	
	con.query(updateAccountLogin, function(error,rows,fields){

		if(error)
		{
			console.log(error);
		}
		else{
			console.log("success");
		}

	});
	con.query(updateAccountInfo, function(error,rows,fields){
		if(error)
		{
			console.log(error);
		}
		console.log("success2");

		if(req.session.roleidCookie == 2)
		{
			res.redirect('managerMenu#!/Users');
		}
		else if (req.session.roleidCookie == 1)
		{
			res.redirect('employeeMenu#!/dashboard');
		}
		
	});
	
 });

module.exports = app;

