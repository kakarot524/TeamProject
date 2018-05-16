
var express = require("express");
var app = express();
var con = require('../connection.js');
var id ;
app.get('/',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	//var id = req.params.id;

	var id = req.query.id;
	console.log("this is from editPendingUser.js");
	console.log(id);
	/*res.render('editTest',{data:id});*/

	 SelectQuery = "SELECT * from user_login where user_id = " + id;

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

		res.render('editPendingUser', {data:rows, user:req.session.usernameCookie});
		//res.render('managerMenu', obj);




	}


});



 });

module.exports = app;