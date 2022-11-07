module.exports = (app) => {
  const users = require("../controllers/users.controllers.js")
  var router = require("express").Router()

  router.post("/signup", users.signUp)

  router.post("/login", users.signIn)

  app.use("/", router)
}