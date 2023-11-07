const allowedList = require('./allowedList')

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedList.indexOf(origin) !== -1 || !origin) { // !origin - dev fix
      callback(null, true)
    } else {
      callback(new Error('not allowed by CORS'))
    }
  }
}

module.exports = corsOptions