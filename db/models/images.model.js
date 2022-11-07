const sql = require("./db.js")

const Images = function(images){
  this.imageID = images.imageID
  this.userID = images.userID
  this.imgURL = images.imgURL
}

Images.create = (newImage, result) => {
  sql.query("INSERT INTO Images SET ?", newImage, (err,res) => {
    if (err){
      console.log("error: ", err)
      result(err, null)
    }
    console.log("Created image: ", {...newImage})
    result(null, {...newImage})
  })
}

Images.getAllImagesFromUser = (userid, result) => {
  sql.query(`SELECT * FROM Images WHERE userID = ${userid}`, (err, res) => {
    if(err) {
      console.log("error: ", err)
      result(err, null)
    }
    if (res.length){
      console.log("found images: ", res)
      result(null, res)
    }
    else result({kind: "not_found"}, null)
  })
}

Images.delete = (imageID, result) => {
  sql.query(`DELETE FROM Images WHERE imageID = '${imageID}'`, (err, res) => {
    if(err) {
      console.log("error: ", err)
      result(err, null)
    }
    result(null, res)
  })
}

module.exports = Images