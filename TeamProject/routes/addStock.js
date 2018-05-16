var express = require("express");
var app = express();
var con = require('../connection.js');

var emess = "";

app.get('/',function(req,res){
  
	var emess = "";
	var name = req.query.stock;
	var obj = {};
	var obj1 = {};
	var selectQuery = "select column_name from information_schema.columns where table_name='" + name + "'"
	var supplierQuery = "select supplier_id, supplier_name from supplier";
	
	con.query(selectQuery, (err,rows,fields) => {
		if (err) {
			console.log(err);
		} else {
			
			obj = rows;
			
			con.query(supplierQuery, (err,rows1,fields) => {
				if (err) {
					console.log(err);
				} else {
					obj1 = rows1;
					
						res.render('addStockpage', {obj: obj, obj1: obj1, name: name, emess: emess});
				

					
				}//elseif
			});	//query2
		}//ifelse	
	});	//query1
	 
});//add-get


app.post('/',function(req,res){
  //res.sendFile(path.join(__dirname+`/add.html`));
	 
	 var id = 0;
	 var emess = "";
	 var name = req.body.id;
	 var num = req.body.num;
	 var obj = {};
	var bodystring = "";
	var bodystring2 = "";
	var bodystring3 = "";
	

   	
	for(var i = 2;i < num -2; i++) {
			if(i < num - 3) {
				bodystring2 += "\"" + eval("req.body.field"+i) + "\",";
			} else {
				bodystring2 += "\"" + eval("req.body.field"+i) + "\"";
			}//ifelse
	}//for


	for(var i = 2;i < num -2; i++) {
		if((i == 2) || ((i >= num - 5) && i < num - 3)) {
			bodystring3 += "\"" + eval("req.body.field"+i) + "\",";
		}//if
		if(i == num - 3) {
			bodystring3 += "\"" + eval("req.body.field"+i) + "\"";
		}//if
	}//for

	
	var selectColumn = "select column_name from information_schema.columns where table_name='" + name + "'";
	
	con.query(selectColumn, function(err, rows, fields){
		if(err) {
			console.log("problem 1");
		} else{
			
			obj = rows;
			
				bodystring += "`" + obj[0].column_name + "`, ";
			for(var i = 2;i < obj.length -2; i++) {
				//console.log(obj[i].column_name);
				if(i < obj.length - 3) {
					bodystring += "`" + obj[i].column_name + "`, ";
				} else {
					bodystring += "`" + obj[i].column_name + "`";
				}//ifelse
			}//for
				
		
		/*select product_id*/
		con.query("select product_id from InventoryManagementSystem.product where product_name='" + name + "'", function(err, rows, fields){
			if(err) {
				console.log("problem 2");
			} else{
				id = rows[0].product_id;
				//console.log("success id is: " + id);
		
	
	var queryString = "INSERT INTO InventoryManagementSystem.`" + name +
	"` (" + bodystring + ") VALUES (" + id + "," + bodystring2 + ")";
	
	var reportString = "INSERT INTO InventoryManagementSystem.`reports` " +
	"(product_id,created_table_id,table_name,price,stock_count,supplier_id) VALUES (" + id + ","+ id + "," + bodystring3 + ")";
	
		con.query(queryString, function(err, rows, fields){
			if(err) {
				emess = "Error: Please fill out form properly";
				console.log("Problem 3: " + queryString);
				console.log("Error updating " + name + "table");
				var passpage = "inventoryTables?id=" + name;
				res.redirect(passpage);
			} else {
				
				con.query(reportString, function(err, rows, fields){
					if(err) {
						console.log("Problem 4: " + reportString);
					} else {
				
						console.log("success! added to table: " + name);
						console.log("added to report");
						var passpage = "inventoryTables?id=" + name;
						
						res.redirect(passpage);
				}//elseif
			});//query4
			
			}//elseif
		});//query3 
	
	
	}//elseif
	});//query2
	
	}//elseif
	});//query1

});//ad-post


module.exports = app;