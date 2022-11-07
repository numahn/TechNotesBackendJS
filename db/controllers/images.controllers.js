const Images = require("../models/images.model.js")
const uuid = require("uuid")

exports.createImage = (req, res) => {
  if(!req.body){
    res.status(400).send({
      message: "Content cannot be empty."
    })
  }
  const images = new Images({
    imageID: uuid.v4(),
    userID: req.body.userID,
    imgURL: req.body.imgURL
  })
  Images.create(images, (err,data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the image."
      })
    res.send({data, success: true})
  })
}

exports.listImages = (req, res) => {
  if(!req.body){
    res.status(400).send({
      message: "Content cannot be empty."
    }) 
  }
  Images.getAllImagesFromUser(req.body.userID, (err, images) => {
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
    console.log(images)
    res.send({images, success: true})
  })
}

exports.deleteImage = (req, res) => {
  if(!req.body){
    res.status(400).send({
      message: "Content cannot be empty."
    }) 
  }
  Images.delete(req.body.imageID, (err, result) =>{
    if(err){
      res.status(500).send({
        message: "Error deleting image"
      })
    }
    console.log(result)
    res.send({result, success: true})
  })
}