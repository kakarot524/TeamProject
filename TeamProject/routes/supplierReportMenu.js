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
			var allSupplierQuery = "select * from supplier;"
			console.log("allSupplierQuery: "+ allSupplierQuery);
			con.query(allSupplierQuery, function(error,rows,field){
				if(error)
				{
					console.log("error executing allSupplierQuery in supplierReportMenu.js");
				}
				else
				{
					var totalsupplier ="select s.supplier_name,SUM(r.price * r.stock_count) as total_inventory_value from  reports r inner join supplier s on s.supplier_id = r.supplier_id group by s.supplier_name;"
					console.log("totalsupplier query "+ totalsupplier);
					con.query(totalsupplier, function(error,rows2,field){
						if(error)
						{
							console.log("error executing in total sup");
						}
						else
						{
							res.render('supplierReportMenu', {numberOfSuppliers :rows, total:rows2, user:req.session.usernameCookie});
						}
					});
					
					
				}

			});//end allSupplierQuery
				//res.render('supplierReportMenu');
		}
		else
		{
			res.redirect('/');
		}	
	}
		console.log("supplierReportMenu.js usename cookie :"+req.session.usernameCookie);	
		console.log("supplierReportMenu.js role id cookie :"+req.session.roleidCookie);		 
 });
module.exports = app;