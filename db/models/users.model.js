const sql = require("./db.js")

const User = function(user){
  this.id = user.id
  this.username = user.username
  this.first_name = user.first_name
  this.last_name = user.last_name
  this.dob = user.dob
  this.pwd = user.pwd
}

User.create = (newUser, result) => {
  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err){
      console.log("error: ", err)
      result(err, null)
      return
    }
    console.log("Created user: ", {id: res.insertID, ...newUser})
    result(null, {id: res.insertId, ...newUser})
  })
}

User.getUser = (id, result) => {
  sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
    if(err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    if (res.length){
      console.log("found user: ", res[0])
      result(null, res[0])
      return;
    }
    result({kind: "not_found"}, null)
  })
}