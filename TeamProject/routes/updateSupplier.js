var express = require("express");
var app = express();
var con = require('../connection.js');
var id ;
app.post('/',function(req,res){
	
	var id = req.body.supplier_id;
	var name = req.body.name;
	var address = req.body.address;
	var city = req.body.city;
	var state = req.body.state;
	var zip = req.body.zip;
	var phone = req.body.phone;
	var email = req.body.email;


	//console.log(role_id);

	var UpdateQuery = "UPDATE supplier set supplier_name = '" + name + "', supplier_address = '" + address + "', supplier_city = '" + city + "', supplier_state = '" + state + "', supplier_zipcode = '" + zip + "', supplier_phone = '" + phone + "' , supplier_email = '"+ email +"' where supplier_id = " + id;
	

	 //var SelectQuery = "SELECT * from user_login where user_id = " + id;
	

	 console.log(UpdateQuery);
	 con.query(UpdateQuery, function(error, rows, fields){
	 	

	if (error) {
			console.log(error);
	}
	else{
		
		//obj = {data: rows};
		//res.render('editTest', obj);
		//res.render('managerMenu', obj);
		if(req.session.roleidCookie == 2)
		{
			res.redirect('managerMenu#!/SupplierDetails');
		}
		else if(req.session.roleidCookie == 1)
		{
			res.redirect('employeeMenu#!/SupplierDetails');
		}
		
	



	}


});

	


 });

module.exports = app;