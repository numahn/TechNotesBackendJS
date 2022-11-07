const Notes = require("../models/notes.model.js")
const uuid = require("uuid")

exports.createNote = (req, res) => {
  if(!req.body){
    res.status(400).send({
      message: "Content cannot be empty."
    })
  }
  const notes = new Notes({
    //is this id the same as regular key?
    id: uuid.v4(),
    date_created: req.body.date_created,
    note_title: req.body.note_title,
    note_content: req.body.note_content
  })
}