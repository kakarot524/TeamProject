var express = require("express");
var app = express();
var con = require('../connection.js');


app.get('/',function(req,res){

	if(req.session.usernameCookie == null && req.session.roleidCookie == null){
				
			res.redirect('/');
	}
	else {
			if(req.session.roleidCookie == 2){

				var inventoryQuery = "select  p.product_name as InventoryCategory, r.table_name as Item from reports r inner join product p on r.product_id = p.product_id order by InventoryCategory, Item";

				con.query(inventoryQuery, function(error,rows,fields){
					if(error)
					{
						console.log(error);
					}
					else
					{

						var supplierQuery = "select supplier_name from supplier";
						con.query(supplierQuery, function(error,rows1,fields){
							if(error)
							{
								console.log(error);
							}
							else
							{
								var userQuery = "select ul.user_username as name,r.role_position as role from user_login ul inner join role r on ul.role_id = r.role_id";
								con.query(userQuery, function(error, rows2,fields){
										if(error)
										{
											console.log(error);
										}
										else
										{
											var Unread = "Unread";
											var contactQuery = "select * from contact where contact_status = '"+Unread+"' order by contact_created DESC;"
											console.log(contactQuery);
											
											con.query(contactQuery, function(error,rows3, fields){
												if(error)
												{
													console.log(error);
												}
												else
												{
													res.render('dashboard',{Inventory:rows, Supplier:rows1, User:rows2, Messages:rows3});
												}
											});


											
										}
								});
								
							}
						});

						
					}
				});


				
			}
			else{

			res.redirect('/');

			}
	}
	console.log("usename cookie :"+req.session.usernameCookie);	
	console.log("role id cookie :"+req.session.roleidCookie);	
	 
 });
module.exports = app;





