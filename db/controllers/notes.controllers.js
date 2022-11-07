const Notes = require("../models/notes.model.js")
const uuid = require("uuid")

exports.createNote = (req, res) => {
  if(!req.body){
    res.status(400).send({
      message: "Content cannot be empty."
    })
  }
  const notes = new Notes({
    userID: req.body.userID,
    notesID: uuid.v4(),
    date_created: req.body.date_created,
    note_title: req.body.note_title,
    note_content: req.body.note_content
  })
  Notes.create(notes, (err,data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while creating notes."
      })
    res.send({data, success: true})
  })
}

exports.listNotes = (req, res) => {
  if(!req.body){
    res.status(400).send({
      message: "Content cannot be empty."
    }) 
  }
  Notes.getAllNotesFromUser(req.body.userID, (err, notes) => {
    if(err){
      if(err.kind === "not_found"){
        res.status(404).send({
          message: `UserID does not exist`
        })
      } else {
          res.status(500).send({
            message: "Error getting username"
        })
      }
    } 
    console.log(notes)
    res.send({notes, success: true})
  })
}

exports.updateNotes = (req, res) =>{
  if(!req.body){
    res.status(400).send({
      message: "Content cannot be empty."
    }) 
  }
  Notes.updateNote(req.body, (err, note) => {
    if(err){
      res.status(500).send({
        message: "Error getting username"
      })
    }
    console.log(note)
    res.send({note, success: true})
  })
}