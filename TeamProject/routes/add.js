/*THIS IS REGGIES CODE*/
module.exports = function(app,con){

app.get('/add',function(req,res){
  //res.sendFile(path.join(__dirname+'/add.html'));
	//con.query(" ", function(err, rows, fields){
	//(err) {
	//	console.log(err);
		
	//}
	//else{
		res.render('add');
		
	//}//else
//});
	 
});//add-get


app.post('/add',function(req,res){
  //res.sendFile(path.join(__dirname+'/add.html'));
	 var id = 1;
	 var queryString = "INSERT INTO `InventoryManagementSystem`.`chair` (`chair_material`, `chair_size`, `chair_color`, `chair_price`, `chair_stock`, `chair_product_id`) VALUES ('" + req.body.chair_material + "','" + req.body.chair_size + "','" + req.body.chair_color + "','" + req.body.chair_price + "','" + id + "','" + 1 + "')";
	 con.query(queryString, function(err, rows, fields){
	if(!err)
	{
		console.log("success");
		res.redirect('MainMenu');
	}
	else{
		
		console.log(err);
	}
});
});//ad-post

};//exports