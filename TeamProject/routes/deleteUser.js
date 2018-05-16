
var express = require("express");
var app = express();
var con = require('../connection.js');
var id ;
app.get('/',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	//var id = req.params.id;

	var id = req.query.id;


	/* test*/
	var userInfoQuery = "update user_login set role_id = 4 where user_id =" + id;
	console.log(userInfoQuery);

	con.query(userInfoQuery, function(error,rows,fields){
		if(error)
		{
			console.log(error);
		}
		else
		{
			res.redirect('managerMenu#!/displayUsers');



		}
	});
	/*test*/










 });

module.exports = app;