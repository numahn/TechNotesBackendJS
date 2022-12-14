module.exports = (app) => {
  const notes = require("../controllers/notes.controllers.js")
  var router = require("express").Router()

  router.post("/notes", notes.createNote)

  router.post("/list", notes.listNotes)

  router.put("/note", notes.updateNotes)

  router.delete("/delete-note", notes.deleteNotes)

  app.use("/", router)
}