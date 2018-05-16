
var express = require("express");
var app = express();
var con = require('../connection.js');
var id ;
app.post('/',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	//var id = req.params.id;
	var username = req.body.username;
	var email = req.body.email;


	console.log("this is from editUser.js");
	console.log(id);

	/*res.render('editTest',{data:id});*/

	 //var SelectQuery = "SELECT * from user_login where user_id = " + id;
	 var getQuery = "select l.user_id, l.user_username, l.user_email, i.security_question1, i.security_answer1, i.security_question2, i.security_answer2, i.security_question3, i.security_answer3 from user_login l inner join user_info i on l.user_id = i.user_id where user_username ='"+username+"' AND user_email='"+email+"';"
	 console.log(getQuery);


	 con.query(getQuery, function(error, rows, fields){
	 	

	if (error) {
			console.log("login username does not exist error", error);
			rconsole.log(error);
	}
	else{
		
		if(rows.length == 0)
		{
			return res.render('forgotPassword', {msg: 'info does not match try again'});
		}
		else{

		res.render('getUserInfo', {data: rows, msg: ' '});
		//res.render('managerMenu', obj);
		}



	}


});



 });

module.exports = app;