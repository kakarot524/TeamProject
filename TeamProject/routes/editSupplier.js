var express = require("express");
var app = express();
var con = require('../connection.js');
obj = {};

app.get('/',function(req,res){
	 	 
	 if(req.session.usernameCookie == null && req.session.roleidCookie == null)
	{
		res.redirect('/');
	}
	
	else 
	{
		if(req.session.roleidCookie == 2 || req.session.roleidCookie == 1)
		{
				var id = req.query.id;
				console.log(id);

				var selectQuery = "select * from supplier where supplier_id = " + id;
				console.log(selectQuery);

				con.query(selectQuery, function(error,rows,fields){
					if(error)
					{
						console.log(error);
					}
					else
					{
						obj = {data: rows};
						if(req.session.roleidCookie == 2)
						{
							res.render('editSupplier', {data: rows,user:req.session.usernameCookie});
						}
						else if(req.session.roleidCookie == 1)
						{
							res.render('employeeEditSupplier', {data: rows,user:req.session.usernameCookie});
						}
						

					}
				});
			 	//res.render('editSupplier');


				//res.render('SupplierHome');

			//selectAllUsers(con,obj,req,res);


		}
		else
		{
			res.redirect('/');

		}
		
	}
	
		console.log("usename cookie :"+req.session.usernameCookie);	
		console.log("role id cookie :"+req.session.roleidCookie);	
	 
 });
module.exports = app;