const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('We are on home')
})

require("./db/routes/user.routes.js")(app)
require("./db/routes/notes.routes.js")(app)
require("./db/routes/images.routes.js")(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`)
})