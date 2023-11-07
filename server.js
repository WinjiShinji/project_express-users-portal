require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose')
const connectDB = require('./config/connectDB')
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


mongoose.connection.once('open', () => {
  app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})
  console.log('Connected To Database')
})