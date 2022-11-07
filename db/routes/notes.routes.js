module.exports = (app) => {
  const notes = require("../controllers/notes.controllers.js")
  var router = require("express").Router()

  router.post("/notes", notes.createNote)

  router.get("/list", notes.listNotes)

  router.put("/note", notes.updateNotes)

  app.use("/", router)
}