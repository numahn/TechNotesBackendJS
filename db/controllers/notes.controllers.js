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
    title: req.body.title,
    content: req.body.content
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
  console.log("testing: ", req.body)
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


exports.deleteNotes = (req, res) => {
  if(!req.body){
    res.status(400).send({
      message: "Content cannot be empty."
    }) 
  }
  Notes.delete(req.body.notesID, (err, result) =>{
    if(err){
      res.status(500).send({
        message: "Error deleting note"
      })
    }
    console.log(result)
    res.send({result, success: true})
  })
}