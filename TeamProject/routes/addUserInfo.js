
var express = require("express");
var app = express();
var con = require('../connection.js');
app.post('/',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
		 var queryString = "INSERT INTO `user_info`(`user_id`,`user_address`,`user_city`, `user_state` ,`user_zip`,`user_phone`,`security_question1`, `security_answer1`,`security_question2`,`security_answer2`,`security_question3`, `security_answer3`) VALUES ('" + req.body.user_id + "','" + req.body.address + "','" + req.body.city + "','" + req.body.state + "','" + req.body.zip + "','"+req.body.phone+"','"+req.body.SecurityQuestion1+ "','" + req.body.SecurityAnswer1 + "','" + req.body.SecurityQuestion2 + "','"+ req.body.SecurityAnswer2 + "','" + req.body.SecurityQuestion3+"','" +req.body.SecurityAnswer3 + "')";
	
	 console.log(queryString);
	 con.query(queryString, function(error, rows, fields){
	 	

	if (error) {
			console.log("login username does not exist error", error);
			res.send({
				"code":400,
				"failed":"username error ocurred"
			})
	}
	else{
		req.session.User_ID = req.body.user_id;
		//obj = {data: rows};
		//res.render('displayUsers', obj);
		res.redirect('/');




	}


});
 });

module.exports = app;