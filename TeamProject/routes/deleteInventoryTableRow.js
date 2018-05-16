
var express = require("express");
var app = express();
var con = require('../connection.js');

var id ;
var tableName;
var columnName;
var reportsId;
var finalGoldenEgg;

app.get('/',function(req,res){

	id = req.query.id;
	tableName = req.query.table.name;
	columnName = req.query.column.name;
	finalGoldenEgg = req.query.variable.name;

	//reportsId =  need this value-----------------------------------------------------------
console.log("finalGoldenEgg "+finalGoldenEgg);
	 console.log("sup start of page tableName  '"+tableName+"'");
	console.log("this is from deleteInventoryTableRow.js");
	console.log("var (tableName_id aka PK) id value: "+id);
	console.log("var columnName value: "+columnName);

//update the query
	var DeleteQuery = "DELETE from `" +tableName+ "` where `" +columnName+ "` = " + id;
	 console.log("FINAL QUERY "+DeleteQuery);
	 console.log("sup after query  '"+tableName+"'"); 
	 	 
	con.query(DeleteQuery, function(error, rows, fields)
	{
		 	
		if (error) {
				console.log(DeleteQuery);
				res.send({
					"code":400,
					"failed":"couldn't delete row in inventoryTable"
				})
		}
		else
		{	
			var reggiesBSQuery = "select product_id from InventoryManagementSystem.product where product_name = '"+tableName+"' ";
			console.log("reggiesBSQuery "+reggiesBSQuery);

	 
			con.query(reggiesBSQuery, function(error,rows,fields)
			{
	 			if(error)
	 			{
	 				console.log("error with reggiesBSQuery "+error);
	 				res.send({
						"code":400,
						"failed":"couldn't pull product_id from product table in deleteInventoryTableRow.js"
					})
	 			}
	 			else
	 			{
	 				//aka created_table_id
	 				var finalProductId = rows[0].product_id;
	 				console.log("printing finalProductId form deleteInventoryTableRow.js "+finalProductId);
	 				//-----------------------------------need to update-------------------------------------------
	 				var reportsDataQuery = "select reports_id from InventoryManagementSystem.reports where created_table_id =  '"+finalProductId+"'  and table_name = '"+finalGoldenEgg+"' ";
	 				console.log("reportsDataQuery to pul the reports_id value: "+reportsDataQuery);
	 				con.query(reportsDataQuery, function(error,rows1,fields)
	 				{
	 					if(error)
	 					{
	 						console.log("error executing the reportsDataQuery "+error);
	 						res.send({
							"code":400,
							"failed":"reportsDataQuery execution failed in deleteInventoryTableRow.js"
							})
			 			}
	 					else
	 					{
	 						//this query returns the reportsId value for the inventory item selected on deleteInventoryRow
	 						console.log("reportsDataQuery : "+reportsDataQuery);
	 						//this val is wrong it's the chair_name not table_name---------------------------
	 						var finalReportsId = rows1[0].reports_id;

			 				console.log("finalReportId value "+finalReportsId);
	 						var deleteReportsQuery = "DELETE from InventoryManagementSystem.reports where reports_id = '"+finalReportsId+"' ";
	 						console.log("deleteReportsQuery: "+deleteReportsQuery);



	 						con.query(deleteReportsQuery, function(error,rows3,fields)
	 						{
				 				if(error)
								{
									console.log("Error executing deleteReportsQuery in deleteInventoryTableRow.js" +error);
								}
								else
								{
				 					res.redirect('inventoryTables?id=' +tableName);
									console.log("successfully deleted row from "+tableName);
									console.log("successfully deleted row from reports table");
				 				}
				 			});//end deleteReportsQuery	


	 					}
	 				}); //end reportsDataQuery

	 			} //end else
	 		}); //end reggiesBSQuery
			
		}//end outer else

	});//end deleteQuery

});
module.exports = app;