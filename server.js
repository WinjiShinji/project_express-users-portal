const express = require('express')
const app = express()

// PORT //
const PORT = process.env.PORT || 3500


// JSON //
app.use(express.json())

// Static Files //
app.use(express.static('public'))

// Route Handler //
app.use(require('./routes/root'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
