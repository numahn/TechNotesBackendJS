const User = require("../models/users.model.js")
const bCrypt = require("bcrypt")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")

exports.signUp = (req, res) => {
  if(!req.body){
    res.status(400).send({
      message: "Content cannot be empty."
    })
  }
  bCrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      id: uuid.v4(),
      username: req.body.username,
      first_name:  req.body.first_name,
      last_name:  req.body.last_name,
      password: hash
    })
    User.create(user, (err,data) => {
      if(err)
        res.status(500).send({
          message:
            err.message || "Some error occured while creating user."
        })
        res.send({data, success: true})
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
        return res.status(404).send({
          message: `Username does not exist`
        })
      } else {
          return res.status(500).send({
            message: "Error getting username"
        })
      }
    } 
    console.log(req.body.password)
    console.log(user.password)
    bCrypt.compare(
      req.body.password,
      user.password,
      (err, result) =>{
        console.log(result)
        if(err){
          return res.status(500).send({
            message: err.message
        })
        }
        if(result){
          var token = jwt.sign(
            JSON.parse(JSON.stringify(user)),
            "nodeauthsecret",
            {expiresIn: 86400 * 30}
          )
          return res.json({success: true, token: token})
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


exports.listAll = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err){
      return res.status(500).send({
        message: err.message
    })
    }
    res.send({users, success: true})
  })
}