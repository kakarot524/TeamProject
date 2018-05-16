var express = require("express");
var app = express();
var con = require('../connection.js');

app.get('/',function(req,res){
	 	 
	var table;
	var product;
	var productArray;
	var emess = "";
	
	var supplierQuery = "select supplier_id, supplier_name from supplier";
	
	
	
	if(req.session.usernameCookie == null && req.session.roleidCookie == null) {
		res.redirect('/');
	} else {
		if(req.session.roleidCookie == 2 || req.session.roleidCookie == 1) {   
			
			var tableData = [];
			var obj = {};
			var obj1= {};
			var id = req.query.id;
						
			var inventoryQuery = "select * from information_schema.columns where table_schema = 'InventoryManagementSystem' and table_name = '"+id+"'";
			
			con.query(inventoryQuery, function(err, rows, fields){
				if(err) {
					console.log("Error with the query to show table columns");
					console.log(err);
				} else {
				
					obj = rows;
					
					for(var i = 0; i < rows.length; i++) {
						tableData[i] = rows[i].COLUMN_NAME;
					}//for

				for(var i=0; i<tableData.length; i++) {

					if(tableData[i] == id+"_product_id") {
						tableData.splice(i,1);
						i--;
						
					}//if
					
					if(tableData[i] == id+"_product_name") {
						tableData.splice(i,1);
						i--;
						
					}//if
					
					if(tableData[i] == id+"_supplier_id") {
						tableData.splice(i,1);
						i--;
						
					}//if
					
					if(tableData[i] == id+"_created") {
						tableData.splice(i,1);
						i--;
					}//if
					
					if(tableData[i] == id+"_modified") {
						tableData.splice(i,1);
						i--;
					}//if

				}//for


				var query = "select ";
				//updating array with column names 
					for(var i = 0; i < tableData.length; i++) {
						
						query += "`" + tableData[i] + "`, ";
					}//for
				
				query += "supplier.supplier_name, product.product_name from `" + id + 
				"` inner join product on `"  + id + "_product_id` = product_id " +
				"inner join supplier on `" + id + "_supplier_id` = supplier_id";
				
				con.query(query ,function(err,rows1,fields){
					if(err) {
							console.log('Error with getting the contents of table');
							console.log(err);
					} else {
						con.query(supplierQuery, (err,rows2,fields) => {
						if (err) {
							console.log(err);
						} else {
							obj1 = rows2;
						if(req.session.roleidCookie == 2)
						{
							res.render('inventoryTables',{data: tableData, data1: rows1, tableName: id, obj: rows,obj1: obj1, user:req.session.usernameCookie});
					
						}
						else if(req.session.roleidCookie == 1)
						{
							res.render('employeeInventoryTables',{data: tableData, data1: rows1, tableName: id, obj: rows,obj1: obj1, user:req.session.usernameCookie});
					
						}
						
					}//elseif
				});//query
					}//elseif
				});//query

			}//elseif
		});//query
			 	
		} else {
			
			res.redirect('/');

		}//elseif
	}
	
});//get-

module.exports = app;