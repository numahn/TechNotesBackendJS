const sql = require("./db.js")

const List = function(list){
  this.id = list.id
  this.date_created = list.date_created
  this.title = list.title
  this.type = list.type
  this.content = list.content
}
