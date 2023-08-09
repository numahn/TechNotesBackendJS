const mysql = require("mysql2")
require("dotenv").config()

const dbConfig = {
  host: `${process.env.HOST}`,
  user: `${process.env.USER}`,
  password: `${process.env.PASSWORD}`,
  db: `${process.env.DB}`
}

var connection = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.db
})

module.exports = connection;