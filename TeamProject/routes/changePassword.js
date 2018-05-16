

var express = require("express");
var app = express();
var con = require('../connection.js');
var id ;
obj = {};
app.post('/',function(req,res){

	var id = req.body.user_id;
	var question1 = req.body.question1;
	var question2 = req.body.question2;
	var question3 = req.body.question3;

	var answer1 = req.body.answer1;
	var answer2 = req.body.answer2;
	var answer3 = req.body.answer3;

	console.log(+id+" " + question1+" " +answer1+" " +question2+" " +answer2+" " +question3+" " +answer3+ "");

	var verifyQuery = "select l.user_id, l.user_username, l.user_password from user_login l inner join user_info i on l.user_id = i.user_id where l.user_id = '"+id+"' and i.security_question1 = '"+question1+"' And i.security_question2 = '"+question2+"' AND i.security_question3='"+question3+"' And i.security_answer1 = '"+answer1+"' AND i.security_answer2 = '"+answer2+"' AND i.security_answer3 = '"+answer3+"'";


	console.log(verifyQuery);

	con.query(verifyQuery, function(error,rows,fields){

		if(error)
		{
			console.log(error);
		}
		else
		{
			if(rows.length == 0)
			{
				res.render('forgotPassword', {msg:'Invalid answers try again'});
			}
			else
			{
				res.render('changePassword', {data:rows});
			}
		}

	});






 });

module.exports = app;