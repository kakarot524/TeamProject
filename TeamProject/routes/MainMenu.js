 
var express = require("express");
var app = express();
var con = require('../connection.js');


app.post('/',function(req,res){
	var username = req.body.username;
	var password = req.body.password;

	
    var SelectQuery = "SELECT * from user_login WHERE user_username = '" + username + "' ";

    
	console.log(username);

	con.query(SelectQuery, function (error, rows, fields) {
		
		if (error) {
			console.log("login username does not exist error", error);
			res.send({
				"code":400,
				"failed":"username error ocurred"
			})
		} //end if
		else
		{
			console.log('The username is: ', rows);
            
			if(rows.length >0){
				if(rows[0].user_password == password){
					
					var role_id = rows[0].role_id;
					console.log("(Right before the session variable)the roleid is: "+role_id);

					//sets a cookie with the user's info
					req.session.usernameCookie = username;
					console.log("the session value is: "+req.session.usernameCookie);
					
					//added logic for role id
					if(role_id == 1)
					{
						req.session.roleidCookie = role_id;
						console.log("roleid cookie value is :"+req.session.roleidCookie);

						console.log("role id is :"+role_id);	
						console.log("Employee");
						console.log("testing the userCookie for employeeMenu");



					if (req.session && req.session.usernameCookie) 
					{ // Check if session exists
						console.log("value of req.session :"+req.session);
						console.log("value of req.usernameCookie :"+req.session.usernameCookie);
						req.session.User_ID = rows[0].user_id;
    					res.redirect('/employeeMenu');
  					}



						
	
					}
					else if(role_id == 2)
					{
						req.session.roleidCookie = role_id;
						console.log("role id is :"+ role_id);
						console.log("Manager");
						//res.render('managerMenu'); //----------------------------------need to create

						if (req.session && req.session.usernameCookie) 
					{ // Check if session exists
						console.log("value of req.session :"+req.session);
						console.log("value of req.usernameCookie :"+req.session.usernameCookie);
						req.session.User_ID = rows[0].user_id;
    					res.redirect('/managerMenu');
  					}
					
					}
					else if(role_id == 3)
					{
						req.session.roleidCookie = role_id;
						console.log("role id is :"+ role_id);
						console.log("NewUser");
						//res.render('customerMenu'); //---------------------------------need to create

						if (req.session && req.session.usernameCookie) 
						{ // Check if session exists
							console.log("value of req.session :"+req.session);
							console.log("value of req.usernameCookie :"+req.session.usernameCookie);
							req.session.User_ID = rows[0].user_id;
    						res.redirect('/NewUserMenu');
  						}

					}
					else if(role_id == 4)
					{
						res.render('login',{msg:'You are Inactive user.'
							+' please contact Manager or Admin to reinstate you'});
					}
					else
					{
						console.log("invalid role id...contact admin");
					}

					 //res.render('loginSuccess');
				} //end inner password if
				else{
			res.render('login',{msg:'username does not exist'});
				} //end of inner password else

			} //end outer results if	

			else{
				res.render('login',{msg:'username does not exist'});
			}
		} //end else
		
	});//end conn
});

module.exports = app;