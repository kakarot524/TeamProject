'use strict';
const http = require('http');
var mysql = require('mysql');
var fs = require('fs');
var express = require("express");
var app     = express();
var path    = require("path");
var session = require('client-sessions');


//need to secure

var displayUsers = require('./routes/displayUsers');
var addUser = require('./routes/addUser');
var newUserForm = require('./routes/newUserForm');
var editUser = require('./routes/editUser');
var deleteUser = require('./routes/deleteUser');
var updateUser = require('./routes/updateUser');
//var user = require('./routes/user');
var WelcomeNewUser = require('./routes/WelcomeNewUser');
var MainMenu = require('./routes/MainMenu');
var NewUserMenu = require('./routes/NewUserMenu');
var employeeMenu = require('./routes/employeeMenu');
var managerMenu = require('./routes/managerMenu');
var viewPendingUsers = require('./routes/viewPendingUsers');
var editPendingUser = require('./routes/editPendingUser');
var updatePendingUser = require('./routes/updatePendingUser');
var PendingForm = require('./routes/PendingForm');
var addPendingUserInfo = require('./routes/addPendingUserInfo');
var createInventory    = require('./routes/createInventory');
var addStock = require('./routes/addStock');
var addStockPage = require('./routes/addStockPage');
var addStockPage2 = require('./routes/addStockPage2');


//userreportmaterialjs
var totalUsers         = require('./routes/totalusers');
var totalManager	   = require('./routes/totalmanager');
var totalEmployee	   = require('./routes/totalemployee');
var totalNewUsers      = require('./routes/totalnewuser');
var totalPendingUsers  = require('./routes/totalpendinguser');
var totalDeletedUsers  = require('./routes/totaldeleteduser');


//test pgs
var test = require('./routes/test');

var SupplierDetails = require('./routes/SupplierDetails');
var userReportMenu = require('./routes/userReportMenu');
var inventoryReportMenu = require('./routes/inventoryReportMenu');
var supplierReportMenu = require('./routes/supplierReportMenu');
var inventoryHome = require('./routes/inventoryHome');
var reportHome = require('./routes/reportHome');

var addUserInfo = require('./routes/addUserInfo');

//not secured yet 10-4-17
var viewInventoryTables = require('./routes/viewInventoryTables');
var inventoryTables = require('./routes/inventoryTables');
var editInventory = require('./routes/editInventory');

var deleteInventoryTableRow = require('./routes/deleteInventoryTableRow');


var inventoryToDelete = require('./routes/inventoryToDelete');
var deleteTable = require('./routes/deleteTable');
var supplierCost = require('./routes/supplierCost');



var forgotPassword = require('./routes/forgotPassword');
var changePassword = require('./routes/changePassword');
var resetPassword = require('./routes/resetPassword');
var newSupplierForm = require('./routes/newSupplierForm');
var addSupplier = require('./routes/addSupplier');
var deleteSupplier = require('./routes/deleteSupplier');
var editSupplier = require('./routes/editSupplier');
var updateSupplier = require('./routes/updateSupplier');
var getUserInfo = require('./routes/getUserInfo');

var manageAccount = require('./routes/manageAccount');
var updateAccountInfo = require('./routes/updateAccountInfo');


//dashboard
var dashBoard     = require('./routes/dashboard');


//supplier reports
var totalSupplier = require('./routes/totalSupplier');
var supplierOptions = require('./routes/supplierOptions');


var employeeDashboard = require('./routes/employeeDashboard');
var employeeCreateInventory = require('./routes/employeeCreateInventory');
var employeeViewInventoryTables = require('./routes/employeeViewInventoryTables');
var employeeAddStock = require('./routes/employeeAddStock');
var employeeAddStockPage = require('./routes/employeeAddStockPage');


var contactMessage = require('./routes/contactMessage');
var messageRead = require('./routes/messageRead');

//init the session
//secret is a random string created to encrypt the cookie
//duration sets how long the session wil live in miliseconds
//activeDuration will extend the session's life for however long yo udefine
	//prevents the app from logging a user out while they're still using the site
app.use(session({
	cookieName: 'session',
	secret: 'random-string',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));



app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){
 // res.sendFile(path.join(__dirname+'/index.html'));
req.session.destroy();
  res.render('index',{msg:''});
});

app.get('/login',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	 res.render('login', {msg: ''});
 });
 app.get('/register',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	 res.render('register',{msg: ' '});
 });

/*These are test pages*/

 app.use('/SupplierDetails', SupplierDetails);
 app.use('/userReportMenu', userReportMenu);
 app.use('/inventoryHome', inventoryHome);
 app.use('/editUser', editUser);
 app.use('/createInventory',createInventory);

/*These are test pages*/
 
 app.use('/newUserForm', newUserForm);
 app.use('/addUser', addUser);
 
 app.use('/updateUser', updateUser);
 app.use('/deleteUser', deleteUser);
 app.use('/displayUsers', displayUsers);
 app.use('/WelcomeNewUser', WelcomeNewUser);
 app.use('/MainMenu', MainMenu);
 app.use('/NewUserMenu', NewUserMenu);
 app.use('/employeeMenu', employeeMenu);
 app.use('/managerMenu', managerMenu);
 app.use('/inventoryReportMenu', inventoryReportMenu);
 app.use('/supplierReportMenu', supplierReportMenu);
 app.use('/reportHome', reportHome);

 app.use('/addUserInfo', addUserInfo);
 app.use('/viewPendingUsers', viewPendingUsers);
 app.use('/editPendingUser', editPendingUser);
 app.use('/updatePendingUser',updatePendingUser);
 app.use('/PendingForm',PendingForm);
 app.use('/addPendingUserInfo', addPendingUserInfo);


 //added JL 10-4-17
 app.use('/viewInventoryTables', viewInventoryTables);
 app.use('/inventoryTables', inventoryTables);
 app.use('/editInventory', editInventory);
 app.use('/inventoryToDelete', inventoryToDelete);
  app.use('/deleteTable', deleteTable);

 app.use('/addStock', addStock);
app.use('/addStockPage', addStockPage);
app.use('/addStockPage2', addStockPage2);

 app.use('/forgotPassword', forgotPassword);
 app.use('/changePassword', changePassword);
 app.use('/resetPassword',resetPassword);

 app.use('/newSupplierForm', newSupplierForm);
 app.use('/addSupplier', addSupplier);
 app.use('/deleteSupplier', deleteSupplier);
 app.use('/editSupplier', editSupplier);
 app.use('/updateSupplier', updateSupplier);
 app.use('/deleteInventoryTableRow', deleteInventoryTableRow);

//user report materials
app.use('/totalusers',totalUsers);
app.use('/totalmanager',totalManager);
app.use('/totalemployee',totalEmployee);
app.use('/totalnewuser',totalNewUsers);
app.use('/totalpendinguser',totalPendingUsers);
app.use('/totaldeleteduser',totalDeletedUsers);
app.use('/getUserInfo',getUserInfo);
app.use('/manageAccount', manageAccount);
app.use('/updateAccountInfo', updateAccountInfo);

//supplier report materials
app.use('/totalSupplier', totalSupplier);
app.use('/supplierOptions', supplierOptions);


//dashboard
app.use('/dashboard', dashBoard);
app.use('/employeeDashboard', employeeDashboard);
app.use('/employeeCreateInventory',employeeCreateInventory);
app.use('/employeeViewInventoryTables',employeeViewInventoryTables);
app.use('/employeeAddStock',employeeAddStock);
app.use('/employeeAddStockPage',employeeAddStockPage);
app.use('/contactMessage', contactMessage);

app.use('/supplierCost',supplierCost);
app.use('/messageRead', messageRead);


 app.use('/test', test);

app.listen(3000);

console.log("Running at Port 3000...");



function webserver(req, res) {
	// if the route requested is '/', then load 'index.html' or else
	// load the requested file(s)

	let baseURI = url.parse(req.url);
	let filepath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);

	// Check if the requested file is accessible or not
	fs.access(filepath, fs.F_OK, error => {
		if(!error) {
			// Read and Serve the file over response
			fs.readFile(filepath, (error, content) => {
				if(!error) {
					console.log('Serving: ', filepath);
					// Resolve the content type
					let contentType = mimes[path.extname(filepath)]; // mimes['.css'] === 'text/css'
					// Serve the file from the buffer
					res.writeHead(200, {'Content-type': contentType});
					res.end(content, 'utf-8');
				} else {
					// Serve a 500
					res.writeHead(500);
					res.end('The server could not read the file requested.');
				}
			});
		} else {
			// Serve a 404
			res.writeHead(404);
			res.end('Content not found!');
		}
	});
	
}

