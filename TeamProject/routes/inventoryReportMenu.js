var express = require("express");
var app = express();
var con = require('../connection.js');


app.get('/',function(req,res){

		 if(req.session.usernameCookie == null && req.session.roleidCookie == null){
				
			res.redirect('/');
			}
	
		else {
			if(req.session.roleidCookie == 2){

				var value;
				var count;
				var sqlquery = "select p.product_name ,r.table_name ,r.price ,r.stock_count ,r.price * r.stock_count as totalprice,s.supplier_name ,r.created_date   from   product p inner join reports r on p.product_id = r.product_id inner join supplier s on s.supplier_id = r.supplier_id order by p.product_name,s.supplier_name;"
				console.log(sqlquery);
				con.query(sqlquery, function(error,rows,field){
				
					if(error){
					
						console.log(error);
				
					}
					else{

						var countquery="select sum(price * stock_count) as totalvalue,sum(stock_count) as totalcount from reports; "
						con.query(countquery,function(error,rows1,field){
							if(error){
								console.log(error);
							}
							else{

								for(var j=0; j < rows1.length; j++)
								{
									value = rows1[j].totalvalue;
									count = rows1[j].totalcount;
								}
								var lowstock="select p.product_name ,r.table_name ,r.price ,r.stock_count ,r.price * r.stock_count as totalprice,s.supplier_name,r.created_date   from   product p inner join reports r on p.product_id = r.product_id inner join supplier s on s.supplier_id = r.supplier_id where r.stock_count <= '10';"
								con.query(lowstock,function(error,rows2,field){
									if(error){
										console.log(error);
									}
									else {
										res.render('inventoryReportMenu',{inventoryTable:rows, totalcount: count, totalvalue:value,stocklow:rows2,user:req.session.usernameCookie});
									}
								})
						}
					})
				}

			})
			}
			else{

			res.redirect('/');

			}
		}



	console.log("usename cookie :"+req.session.usernameCookie);	
	console.log("role id cookie :"+req.session.roleidCookie);	
	 
 });
module.exports = app;
