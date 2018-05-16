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
			//var supplierOptionsQuery = "select s.supplier_name as supplier, p.product_name as product, r.table_name, r.price, r.stock_count, r.supplier_id, r.created_date from supplier s inner join reports r on s.supplier_id = r.supplier_id inner join product p on p.product_id = r.product_id order by supplier, product;"
			var supplierOptionsQuery = "select s.supplier_name as supplier, p.product_name as product, r.table_name, r.price, r.stock_count, (r.price * r.stock_count) as total_inventory_value, r.created_date from supplier s inner join reports r on s.supplier_id = r.supplier_id inner join product p on p.product_id = r.product_id order by supplier, product;"
			console.log("supplierOptionsQuery from supplierOptions.js "+supplierOptionsQuery);
			
			con.query(supplierOptionsQuery, function(error,rows,fields){
				if(error)
				{
					console.log("error executing supplierOptionsQuery in supplierOptions.js "+error);
				}
				else
				{
					res.render('supplierOptions',{inventoryOptions:rows});
					console.log("supplierOptions.js rows.length : "+rows.length);
					console.log("supplierOptions.js rows : "+rows);

				}
			});
			
			//res.render('totalSupplier');
		}

		else 
		{
			res.redirect('/');
		}
	}
	    console.log("supplierOptions.js usename cookie :"+req.session.usernameCookie);	
		console.log("supplierOptions.js role id cookie :"+req.session.roleidCookie);	
	});
module.exports = app;



