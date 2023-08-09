const mysql = require("mysql2")
require("dotenv").config()

const dbConfig = process.env

var connection = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.db
})

module.exports = connection;