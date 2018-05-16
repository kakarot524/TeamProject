var express = require("express");
var app = express();
var con = require('../connection.js');

app.get('/',function(req,res){
	 	 
	if(req.session.usernameCookie == null && req.session.roleidCookie == null) {
		//res.redirect('/');
	} else {
		
		if(req.session.roleidCookie == 2) {
			
			var id = req.query.id;
	
			var deleteQuery = "Drop table InventoryManagementSystem.`" + id + "`";
			var deleteQuery2 = "delete from InventoryManagementSystem.product where product_name = '"+ id +"'";
			con.query(deleteQuery, function(err, rows, fields){
				
				if(err) {
					console.log(deleteQuery);
				} else {
					
					var productQuery = "select product_id from product where product_name = '"+id+"' ";
					con.query(productQuery, function(error,rows1,fields){

						if(error)
						{
							console.log(error);
						}
						else
						{

						var productID = rows1[0].product_id;
						console.log(productID);

						con.query(deleteQuery2, function(err, rows, fields){
				
						if(err) {
							console.log("Problem 2: " + deleteQuery2);
						} else {
						
							var checkQuery = "select * from reports where product_id = "+productID+"";
							con.query(checkQuery, function(error,rows4,fields){

									if(error)
									{
										console.log(error);
									}
									else
									{
										if(rows4.length == 0)
										{
											console.log("this item has no reports");
												res.redirect('inventoryToDelete');
							                    console.log("success table deleted!\ndeleted form product table!");
										}
										else
										{
												var removeFromReportsQuery = "delete from reports where product_id = "+productID+" ";
												con.query(removeFromReportsQuery, function(error,rows,fields){

													if(error)
													{
														console.log(error);
													}
													else
													{
														console.log("success removed from reports");
												        res.redirect('inventoryToDelete');
													    console.log("success table deleted!\ndeleted form product table!");
													}
												});

										}

									}
							});



						

						
					
						}//elsis
					}); //query
						}
					});
					
				}//elseif
				
			});//query end
		} else {
			//res.redirect('/');
		}//elseif
	}//elseif
			
 });//get-
 
module.exports = app;