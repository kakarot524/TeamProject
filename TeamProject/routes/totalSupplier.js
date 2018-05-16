var express = require("express");
var app = express();
var con = require('../connection.js');

app.get('/',function(req,res){
	 	 
	 if(req.session.usernameCookie == null && req.session.roleidCookie == null)
	 {
		res.redirect('/');
	 }
	
	else 
	{
		if(req.session.roleidCookie == 2)
		{
			var supplierInfoQuery = "select supplier_name, supplier_phone, supplier_email from supplier;"
			console.log("supplierInfoQuery from totalSupplier.js "+supplierInfoQuery);
			con.query(supplierInfoQuery, function(error,rows,fields){
				if(error)
				{
					console.log("error executing supplierInfoQuery in totalSupplier.js "+error);
				}
				else
				{
					res.render('totalSupplier',{data:rows});
				}
			});
			
			//res.render('totalSupplier');
		}

		else 
		{
			res.redirect('/');
		}
	}
	    console.log("totalSupplier.js usename cookie :"+req.session.usernameCookie);	
		console.log("totalSupplier.js role id cookie :"+req.session.roleidCookie);	
	});
module.exports = app;