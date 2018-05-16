
var express = require("express");
var app = express();
var con = require('../connection.js');

app.get('/',function(req,res){
	
	var id = req.query.id;
	console.log("this is the new: " + id);
	var name = req.query.table.name;
	var emess = "";
	var obj = {};
	var obj1 = {};
	var obj2 = {};
	var supplierQuery = "select supplier_id, supplier_name from supplier";
	var SelectQuery = "SELECT * from InventoryManagementSystem.`"+ name +"` where `" + name + "_id` = " + id;
	var selectQuery2 = "select column_name from information_schema.columns where table_name='" + name + "'";
	
	con.query(SelectQuery, function(err, rows, fields){
		if(err) {
			console.log(err);
		} else {
		
			obj = rows;
			
			con.query(selectQuery2, (err,rows,fields) => {
				if (err) {
					console.log(err);
				} else {
					obj1 = rows
					
			
					con.query(supplierQuery, (err,rows1,fields) => {
						if (err) {
							console.log(err);
						} else {
							obj2 = rows1
							
							if(req.session.roleidCookie == 2)
							{
								res.render('editInventory',{obj: obj, obj1: obj1, obj2: obj2, name: name, id: id,emess: emess,user:req.session.usernameCookie});
					
							}
							else if(req.session.roleidCookie == 1)
							{
							res.render('employeeEditInventory',{obj: obj, obj1: obj1, obj2: obj2, name: name, id: id,emess: emess,user:req.session.usernameCookie});
					
							}
							
						}//ifelse	
					});	//query3
			
				}//elseif
			});//query2
					
		}//elseif
	});//query1

});//edit-get


app.post('/',function(req,res){
	
	var id = req.body.id;
	var name = req.body.name;
	var emess = "";
	var num = 0;
	var bodystring = "";
	var column = [];
	var field = [];
		
	var selectQuery = "select column_name from information_schema.columns where table_name='" + name + "'";
		
		con.query(selectQuery, function(err, rows, fields){
			if(err) {
				console.log("Problem 3: " + selectQuery);
			} else{
				num = rows.length;
				for(var i = 2;i < num -2; i++) {
						field[i] = eval("req.body.field"+i);
						column[i] = rows[i].column_name;
				}//for
				
				for(var i = 2;i < num -2; i++) {
					if(i != num-3) {
						bodystring += "`" + column[i] + "` =" + con.escape(field[i]) + ", ";
					} else {
						bodystring += "`" + column[i] + "` =" + con.escape(field[i]);
					}//else if
				}//for
		
		
			var UpdateQuery = "UPDATE InventoryManagementSystem.`" + name + 
				"` set " + bodystring + " where `"+ name +"_id` =" + id;
				
			var UpdateReport = "UPDATE InventoryManagementSystem.`reports` " + 
				"set `table_name` =" + con.escape(field[2]) + ", `price`=" + con.escape(field[num-5]) + 
				", `stock_count`=" + con.escape(field[num -4]) + ", `supplier_id`=" + con.escape(field[num -3]) + " where `reports_id`=" + id;
		
		
			con.query(UpdateQuery, function(err, rows, fields){
				if(err) {
					emess = "Error: Please fill out form properly";
					var passpage = "editInventory?id=" + id + "&table[name]=" + name;
					res.redirect(passpage);
					console.log("Problem 2: " + UpdateQuery);
					console.log("Error updating table");
				} else{
					
					con.query(UpdateReport, function(err, rows, fields){
						if(err) {
							console.log("Problem 1: " + UpdateReport);
						} else{
							
							if(req.session.roleidCookie == 2)
							{
							var passpage = "inventoryTables?id=" + name;
							
							res.redirect(passpage);
							console.log("success row updated");
							console.log("reportes table updated");
							}
							else if(req.session.roleidCookie == 1)
							{
							var passpage = "InventoryTables?id=" + name;
							
							res.redirect(passpage);
							console.log("success row updated");
							console.log("reportes table updated");
							}
							

							}//elseif
					});//query1
		
				}//elseif
			});//query2
		
			}//elseif
		});//query3
	
});//ediit-post


module.exports = app;