const express = require('express')
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const logEvent = require('./middleware/logEvent')

// PORT //
const PORT = process.env.PORT || 3500

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
