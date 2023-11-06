const express = require('express')
const app = express()
const logEvent = require('./middleware/logEvent')

// PORT //
const PORT = process.env.PORT || 3500

// Event Logging //
app.use(logEvent)

// JSON //
app.use(express.json())

// CORS //
// @TODO: setup cors options

// Static Files //
app.use(express.static('public'))

// Route Handler //
app.use(require('./routes/root'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
