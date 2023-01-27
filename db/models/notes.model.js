const sql = require("./db.js")

const Notes = function(notes){
  this.userID = notes.userID
  this.notesID = notes.notesID
  this.title = notes.title
  this.content = notes.content
}

Notes.create = (newNotes, result) =>{
  sql.query("INSERT INTO Notes SET ?", newNotes, (err, res) => {
    if (err){
      console.log("error: ", err)
      result(err.message, null)
    }
    console.log("Created notes: ", {newNotes})
    result(null, {...newNotes})
  })
}

Notes.getAllNotesFromUser = (userID, result) => {
  sql.query(`SELECT * FROM Notes WHERE userID = '${userID}'`, (err, res) =>{
    if (err){
      console.log("error: ", err)
      result(err.message, null)
    }
    else if (res.length){
      console.log("Found data: ", res)
      result(null, res)
    }
   
    else result({kind: "not_found"}, null)
  })
}
//Maybe change later?
Notes.updateNote = (info, result) => {
  sql.query(`UPDATE Notes SET title ='${info.title}', content = '${info.content}' WHERE notesID = '${info.notesID}'`, (err, res)=> {
    if (err){
      console.log("error: ", err)
      result(err, null)
    }
  })
  console.log("Updated notes: ", {...info})
  result(null, {...info})
}

Notes.delete = (notesID, result) => {
  sql.query(`DELETE FROM Notes WHERE notesID= '${notesID}'`, (err, res) =>{
    if (err){
      console.log("error: ", err)
      result(err, null)
    }
    result(null, res)
  })
}

module.exports = Notes