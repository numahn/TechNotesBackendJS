const User = require("../models/users.model.js")
const bCrypt = require("bcrypt")
const uuid = require("uuid")

exports.signUp = (req, res) => {
  if(!req.body){
    res.status(400).send({
      message: "Content cannot be empty."
    })
  }
  bCrypt.hash(req.body.pwd, 10).then((hash) => {
    const user = new User({
      id: uuid.v4(),
      username: req.body.username,
      first_name:  req.body.first_name,
      last_name:  req.body.last_name,
      dob: req.body.dob,
      pwd: hash
    })
    User.create(user, (err,data) => {
      if(err)
        res.status(500).send({
          message:
            err.message || "Some error occured while creating user."
        })
        else res.send(data)
    })
  })
}

exports.signIn = (req, res) => {
  if(!req.body){
    res.status(400).send({
      message: "Content cannot be empty."
    })
  }
  User.getUser(req.body.username, (err, user) =>{
    if(err){
      if(err.kind === "not_found"){
        res.status(404).send({
          message: `Username does not exist`
        })
      } else {
          res.status(500).send({
            message: "Error getting username"
        })
      }
    } 
    bCrypt.compare(
      req.body.pwd,
      user.pwd,
      (err, result) =>{
        if(result){
          var token = jwt.sign(
            JSON.parse(JSON.stringify(user)),
            "nodeauthsecret",
            {expiresIn: 86400 * 30}
          )
          res.json({success: true, token: "JWT " + token})
        } else{
          return res.status(401).send({
            message: "Authentication failed. Wrong password",
            success: false,
          })
        }
      }
    )
  })
}


