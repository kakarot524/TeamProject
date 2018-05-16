var express = require("express");
var app = express();
var con = require('../connection.js');
var id ;
app.get('/',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	//var id = req.params.id;

	var id = req.query.id;
	console.log("this is from deleteUser.js");
	console.log(id);
	/*res.render('editTest',{data:id});*/

	var DeleteQuery = "DELETE from supplier where supplier_id = " + id;
	 console.log(DeleteQuery);
	 con.query(DeleteQuery, function(error, rows, fields){
	 	

	if (error) {
			console.log("login username does not exist error", error);
			res.send({
				"code":400,
				"failed":"username error ocurred"
			})
	}
	else{
		
		res.redirect('managerMenu#!/SupplierDetails');




	}


});



 });

module.exports = app;