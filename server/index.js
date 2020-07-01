const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require("passport")

const db = require('./db')
const bookRouter = require('./routes/book-routes')

const users = require("./routes/user-routes");

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World! ')
})

app.use('/api', bookRouter)

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api", users);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))