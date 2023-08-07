const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


require("./db/routes/user.routes.js")(app)
require("./db/routes/notes.routes.js")(app)

const PORT = process.env.PORT || 3306
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`)
})  