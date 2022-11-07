const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


require("./db/routes/user.routes.js")(app)
require("./db/routes/notes.routes.js")(app)
require("./db/routes/images.routes.js")(app)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`)
})