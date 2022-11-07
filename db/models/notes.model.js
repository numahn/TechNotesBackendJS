const sql = require("./db.js")

const Notes = function(notes){
  this.notesID = notes.notesID
  this.date_created = notes.date_created
  this.note_title = notes.note_title
  this.note_content = notes.note_content
}

Notes.create = (newNotes, result) => {
  sql.query("INSERT INTO Notes SET ?", newNotes, (err,res) => {
    if (err){
      console.log("error: ", err)
      result(err, null)
    }
    console.log("Created notes: ", {...newNotes})
    result(null, {...newNotes})
  })
}

Notes.getNote = (id, result) => {
  sql.query(`SELECT * FROM Notes WHERE notesID = ${id}`, (err, res) => {
    if(err) {
      console.log("error: ", err)
      result(err, null)
    }
    if (res.length){
      console.log("found note_data: ", res[0])
      result(null, res[0])
    }
    else result({kind: "not_found"}, null)
  })
}

Notes.getAllNotesFromUser = (id, result) => {
  sql.query(`SELECT * FROM Notes WHERE userID = ${id}`, (err, res) => {
    if(err) {
      console.log("error: ", err)
      result(err, null)
    }
    if (res.length){
      console.log("found note_data: ", res)
      result(null, res)
    }
    else result({kind: "not_found"}, null)
  })
}

Notes.updateTitle = (newTitle, id, result) =>{
  sql.query(`UPDATE Notes SET title_name= ${newTitle} WHERE notesID=${id}}`)
  if (err){
    console.log("error: ", err)
    result(err, null)
  }
  console.log("Created notes: ", {...newNotes})
  result(null, {...newNotes})
}

module.exports = Notes