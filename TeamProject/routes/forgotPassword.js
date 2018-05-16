
var express = require("express");
var app = express();
var con = require('../connection.js');
var id ;
app.get('/',function(req,res){
	// res.sendFile(path.join(__dirname+'/index.html'));
	 res.render('forgotPassword', {msg : ''});
 });

module.exports = app;