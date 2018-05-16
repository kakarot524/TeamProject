var express = require("express");
var app = express();
var con = require('../connection.js');

app.get('/',function(req,res){
	var emess = "";
	res.render('createInventory',{emess: emess,user:req.session.usernameCookie});
});

 
app.post('/',function(req,res){
	
	/*variables*/
	var emess = "";
	var pid = "";
	var num = req.body.field;
	var bodystring = "";
	var name =  req.body.stock.toString();
	var stock_name_unique = req.body.stock + "_name_UNIQUE";
	var stock_product_idx = req.body.stock + "_product_idx";
	var stock_product_id = req.body.stock + "_product_id";
	var stock_id = req.body.stock + "_id";
	var stock_name = req.body.stock + "_name"
	
	/*for loop for creating a dynamic sql string depending on the number
	of field labels the stock table to be inserted will have */
	for(var i = 1;i <= num; i++) {
		
			bodystring += "`" + eval("req.body.field"+i) + "` varchar(45) NOT NULL,";
		
	}//for
	
	 var queryString_stock = "CREATE TABLE `" + name + "` (`" + stock_product_id + "` int(11) NOT NULL," +
		"`" + stock_id + "` int(11) NOT NULL AUTO_INCREMENT," +
		"`" + stock_name + "` varchar(45) NOT NULL," +
		bodystring +
		"`price` double NOT NULL," +
		"`stock_count` double NOT NULL," +
		"`" + req.body.stock + "_supplier_id` int(11) NOT NULL," +
		"`" + req.body.stock + "_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
		"`" + req.body.stock + "_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, " +
		"PRIMARY KEY (`" + stock_id + "`)," +
		"UNIQUE KEY `" + stock_name_unique + "` (`" + stock_name + "`)," +
		"KEY `" + req.body.stock + "_supplier_id_idx` (`" + req.body.stock + "_supplier_id`)," +
		"KEY `" + stock_product_idx + "` (`" + stock_product_id + "`)," +
		"CONSTRAINT `" + stock_product_id + "` FOREIGN KEY (`" + stock_product_id + "`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE" +
		") ENGINE=InnoDB DEFAULT CHARSET=latin1"; 
		console.log(queryString_stock);
	
	/*if statement to make sure conditions are met*/
	if ((name.indexOf('\'') > -1) || (name.indexOf('"') > -1) || (name.indexOf(';') > -1) || (name.indexOf('`') > -1)) {
		 
		emess = "Error: Name can not have ' or \" or ; characters";
		res.render('createInventory',{emess: emess,user:req.session.usernameCookie});
		
	} else {
		var product_name = "select product_id from product where product_name ='" + name + "'";
		
		con.query(product_name, function(err, rows, fields){
			if(rows.length > 0) {
				emess = "Error: " + name + " already exist";
				console.log("name exist");
				res.render('createInventory',{emess: emess,user:req.session.usernameCookie});
			} else{
				
		/*create product_id*/
		con.query("insert into InventoryManagementSystem.product (product_name) values ('" + name + "')", function(err, rows, fields){
			if(err) {
				emess = "Error";
				console.log("Problem 3");
				res.render('createInventory',{emess: emess,user:req.session.usernameCookie});
			} else{
				
				console.log("success! Product table updated");
			
				/*select product_id*/
				con.query("select product_id from InventoryManagementSystem.product where product_name='" + name + "'", function(err, rows, fields){
					if(err) {
						console.log("Problem 2");
					} else{
						
						pid = rows[0].product_id;
						console.log("pid is: " + pid);
					
						/*create table for new stock item*/
						con.query(queryString_stock, function(err, rows, fields){
							if(err) {
								emess = "Error: " + name + " already exist";
								console.log("Problem 1: " + queryString_stock);
								res.render('createInventory',{emess: emess,user:req.session.usernameCookie});
							} else{
							
								console.log("success! Table added");
								res.redirect('managerMenu#!/dashboard');
							
							}//elseif
						});//query3
				
				}//elseif
				});//query2
		
		}//elseif
		});//query1
		
		}//elseif
		});//query1
		
	}//elseif
	
});//add-post

module.exports = app;