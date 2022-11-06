const mysql = require("mysql2")

const dbConfig = {
  host: "localhost",
  user: "user",
  password: "password",
  db: "db"
}

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
})

module.exports = connection;