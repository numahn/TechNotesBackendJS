const sql = require("./db.js")
const User = function(user){
  this.id = user.id
  this.username = user.username
  this.first_name = user.first_name
  this.last_name = user.last_name
  this.pwd = user.pwd
}

User.create = (newUser, result) => {
  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err){
      console.log("error: ", err)
      result(err, null)
    }
    console.log("Created user: ", {...newUser})
    result(null, {...newUser})
  })
}

User.getUser = (username, result) => {
  sql.query(`SELECT * FROM Users WHERE username = '${username}'`, (err, res) => {
    if(err) {
      console.log("error: ", err)
      result(err, null)
    }
    else if (res.length){
      console.log("found user: ", res[0])
      result(null, res[0])
    }
    else result({kind: "not_found"}, null)
  })
}

module.exports = User