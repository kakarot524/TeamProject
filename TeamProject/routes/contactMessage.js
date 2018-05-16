var express = require("express");
var app = express();
var con = require('../connection.js');
var obj = {};

app.post('/',function(req,res){
	 	 
	 	 var name = req.body.name;
	 	 var email = req.body.email;
	 	 var message = req.body.message;
	 	 var status = "Unread";

	 	 console.log(name);
	 	 console.log(email);
	 	 console.log(message);
	 	 console.log(status);


	 	 var messageQuery = "INSERT INTO `contact`(`contact_name`, `contact_email`,`contact_message`,`contact_status`)values('"+name+"','"+email+"','"+message+"','"+status+"');"

	 	 console.log(messageQuery);

	 	 con.query(messageQuery, function(error,rows,fields){

	 	 	if(error)
	 	 	{
	 	 		console.log(error);
	 	 	}
	 	 	else
	 	 	{
	 	 		res.redirect("/");
	 	 	}
	 	 });


	 	

});

module.exports = app;