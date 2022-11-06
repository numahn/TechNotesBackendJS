const mysql = require('mysql2')

let con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password"
})

con.connect(function(err){
  if (err) throw err;
  console.log("connected")
})

