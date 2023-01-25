const sql = require("./db.js")
const User = function(user){
  this.id = user.id
  this.username = user.username
  this.first_name = user.first_name
  this.last_name = user.last_name
  this.password = user.password
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

User.getAllUsers = (result) => {
  sql.query(`SELECT * FROM Users`, (err, res) => {
    if(err) {
      console.log("error: ", err)
      result(err, null)
    }
    else{
      console.log("found users: ", res)
      result(null, res)
    }
  })
}

module.exports = User