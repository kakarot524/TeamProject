var express = require("express");
var app = express();
var con = require('../connection.js');
var obj = {};

app.get('/',function(req,res){
	 	 
	 if(req.session.usernameCookie == null && req.session.roleidCookie == null) {
		res.redirect('/');
	} else {
		
		if(req.session.roleidCookie == 1) {
			
			var tableQuery = "select table_name, engine FROM information_schema.tables " +
			"WHERE table_type = 'BASE TABLE' AND table_schema='InventoryManagementSystem' " + 
			"AND TABLE_NAME NOT LIKE 'user%'  AND TABLE_NAME NOT LIKE 'product' " + 
			"AND TABLE_NAME NOT LIKE 'supplier' AND TABLE_NAME NOT LIKE 'invoice' " +
			"AND TABLE_NAME NOT LIKE 'role' AND TABLE_NAME NOT LIKE 'deleted_user' " +
			"AND TABLE_NAME NOT LIKE 'reports' ORDER BY table_name ASC ";


			
			con.query(tableQuery, function(err, rows, fields){
				if(err) {
					console.log(err);
				} else {
					obj = rows;
					res.render('employeeViewInventoryTables',{data: obj, user: req.session.usernameCookie});
			
				}//elseie
			});//query
		} else {
			res.redirect('/');

		}//elseif
	}//elseif
	
});//get-

module.exports = app;