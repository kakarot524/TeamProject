var express = require("express");
var app = express();
var con = require('../connection.js');


app.post('/',function(req,res){
	 	 
	 if(req.session.usernameCookie == null && req.session.roleidCookie == null)
	{
		res.redirect('/');
	}
	
	else 
	{
		if(req.session.roleidCookie == 2 || req.session.roleidCookie == 1)
		{
				
		var addQuery = "INSERT INTO `supplier`(`supplier_name`,`supplier_address`,`supplier_city`,`supplier_state`, `supplier_zipcode` ,`supplier_phone`,`supplier_email`) VALUES ('" + req.body.name + "','" + req.body.address + "','" + req.body.city + "','" + req.body.state + "','" + req.body.zip + "','" + req.body.phone + "','" + req.body.email + "')";

			console.log(addQuery);
			con.query(addQuery, function(error, rows, fields){
				if(error)
				{
					console.log(error);
				}
				else
				{
					console.log("success");
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

				//res.render('newSupplierForm');


				//res.render('SupplierHome');

			//selectAllUsers(con,obj,req,res);


		}
		else
		{
			res.redirect('/');

		}
		
	}
	
		console.log("usename cookie :"+req.session.usernameCookie);	
		console.log("role id cookie :"+req.session.roleidCookie);	
	 
 });
module.exports = app;
