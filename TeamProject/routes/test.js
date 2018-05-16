var express = require("express");
var app = express();
var con = require('../connection.js');

app.get('/',function(req,res){
	var emess = "";
	var name = "computer";
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
					res.render('test', {obj: obj, obj1: obj1, name: name, emess: emess});
				}//elseif
			});	//query2
		}//ifelse	
	});	//query1
 });//get-

module.exports = app;

//select * from chair;

//select chair_id, chair_name, chair_brand, product_id from chair inner join product where product.product_id = chair.product.id;