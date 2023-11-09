require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose')
const connectDB = require('./config/connectDB')
const path = require('path')
const logEvent = require('./middleware/logEvent')


// PORT //
const PORT = process.env.PORT || 3500

// DB Connect //
connectDB()

// Event Logging //
app.use(logEvent)

// JSON //
app.use(express.json())

// CORS //
app.use(cors(corsOptions))

// Static Files //
app.use(express.static('public'))


// Routes //
app.use('/', require('./routes/root'))

// API //
app.use('/users', require('./routes/api/users'))


// Error - 404 //
app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ error: "404 Not Found"})
  } else {
    res.type('txt').send("404 Not Found")
  }
})


mongoose.connection.once('open', () => {
  console.log('Connected To Database')
  app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})
})