module.exports = (app) => {
  const images = require("../controllers/images.controllers.js")
  var router = require("express").Router()

  router.post("/image", images.createImage)

  router.get("/image-list", images.listImages)

  router.delete("/delete-image", images.deleteImage)

  app.use("/", router)
}