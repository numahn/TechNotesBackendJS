const sql = require("./db.js")

const Notes = function(notes){
  this.id = notes.id
  this.date_created = notes.date_created
  this.note_title = notes.note_title
  this.note_content = notes.note_content
}

