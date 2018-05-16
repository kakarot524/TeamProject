var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SaltGuy", // password is SaltGuy
  database: "InventoryManagementSystem"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL Database..");
});
module.exports = con;
