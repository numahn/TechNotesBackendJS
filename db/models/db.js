const mysql = require("mysql2")

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "password",
  db: "db"
}

var connection = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.db
})

module.exports = connection;