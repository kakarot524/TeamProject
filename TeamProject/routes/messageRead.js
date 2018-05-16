var express = require("express");
var app = express();
var con = require('../connection.js');
var obj = {};

app.get('/',function(req,res){
	 	 
var messageId = req.query.message;


	 	console.log(messageId);
	 	var status = "Read";
	 	var readQuery = "update contact set contact_status = '"+status+"' where contact_id = '"+messageId+"' ";
	 	console.log(readQuery);
	 	con.query(readQuery, function(error, rows, fields){

	 		if(error)
	 		{
	 			console.log(error);
	 		}
	 		else
	 		{
	 			res.redirect("managerMenu#!/dashboard");
	 		}
	 	});

});

module.exports = app;