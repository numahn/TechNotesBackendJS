const sql = require("./db.js")

const Notes = function(notes){
  this.userID = notes.userID
  this.notesID = notes.notesID
  this.title = notes.title
  this.content = notes.content
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
//Maybe not needed???
// Notes.getNote = (id, result) => {
//   sql.query(`SELECT * FROM Notes WHERE notesID = ${id}`, (err, res) => {
//     if(err) {
//       console.log("error: ", err)
//       result(err, null)
//     }
//     if (res.length){
//       console.log("found note_data: ", res[0])
//       result(null, res[0])
//     }
//     else result({kind: "not_found"}, null)
//   })
// }

Notes.getAllNotesFromUser = (userid, result) => {
  sql.query(`SELECT * FROM Notes WHERE userID = '${userid}'`, (err, res) => {
    if(err) {
      console.log("error: ", err)
      result(err, null)
    }
    else if (res.length){
      console.log("found data: ", res)
      result(null, res)
    }
    else result({kind: "not_found"}, null)
  })
}

Notes.updateNote = (info, result) =>{
  sql.query(`UPDATE Notes SET title= '${info.title}', content='${info.content}' WHERE notesID='${info.notesID}'`, (err, res)=> {
  if (err){
    console.log("error: ", err)
    result(err, null)
  }
})
  console.log("Created notes: ", {...info})
  result(null, {...info})
}

Notes.delete = (notesID, result) => {
  sql.query(`DELETE FROM Notes WHERE notesID = '${notesID}'`, (err, res) => {
    if(err) {
      console.log("error: ", err)
      result(err, null)
    }
    result(null, res)
  })
}

module.exports = Notes