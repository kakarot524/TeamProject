var express = require("express");
var app = express();
var con = require('../connection.js');


app.get('/',function(req,res){
	 	 
	 if(req.session.usernameCookie == null && req.session.roleidCookie == null)
	{
		res.redirect('/');
	}
	
	else 
	{
		if(req.session.roleidCookie == 2)
		{
			var sqlquery ="select * from user_login;"

			console.log(sqlquery);
			con.query(sqlquery, function(error,rows,field){
				if(error){
					console.log(error);
				}
				else{

					
					var managerquery = "select * from user_login u inner join user_info i on u.user_id = i.user_id where u.role_id='2';"
					con.query(managerquery,function(error,rows1,field){
						if(error){
							console.log(error);
						}
						else{
							
							var employeequery = "select * from user_login u inner join user_info i on u.user_id = i.user_id where u.role_id='1';"
							con.query(employeequery,function(error,rows2,field){
								if(error){
									console.log(error);
								}
								else{
									
									var newusers = "select * from user_login where role_id ='3';"

									con.query(newusers,function(error,rows3,field){
										if(error){
											console.log(error);
										}
										else{
											
											var pendingusers="select * From user_login where  user_id not in (select user_id from user_info);"
											con.query(pendingusers,function(error,rows4,field){
												if(error){
													console.log(error);
												}
												else{
												
													var deletedusers="select * from user_login where role_id='4';"

													con.query(deletedusers,function(error,rows5,field){
														if(error){
															console.log(error);
														}
														else
														{
															res.render('userReportMenu',{numOfUsers:rows, numOfManagers:rows1,numOfEmployees:rows2,numOfNewUsers:rows3,numOfPendingUsers:rows4,numOfDeletedUsers:rows5,user:req.session.usernameCookie});
														}
													})
												}
											})
								

										}
									})
								}
							})
							
							}

						})
				}

			});
				
			


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
