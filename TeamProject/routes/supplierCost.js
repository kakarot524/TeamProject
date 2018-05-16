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
			var totalSupplier ="select s.supplier_name,SUM(r.price * r.stock_count) as total_inventory_value from  reports r inner join supplier s on s.supplier_id = r.supplier_id group by s.supplier_name;"
			console.log("totalSupplier from supplierCost.js "+totalSupplier);
			
			con.query(totalSupplier, function(error,rows,fields){
				if(error)
				{
					console.log("error executing totalSupplierQuery in supplierCost.js "+error);
				}
				else
				{
					res.render('supplierCost',{inventoryCost:rows});
					console.log("supplierCost.js rows.length : "+rows.length);
					console.log("supplierCost.js rows : "+rows);

				}
			});
			
			//res.render('totalSupplier');
		}

		else 
		{
			res.redirect('/');
		}
	}
	    console.log("supplierCost.js usename cookie :"+req.session.usernameCookie);	
		console.log("supplierCost.js role id cookie :"+req.session.roleidCookie);	
	});
module.exports = app;