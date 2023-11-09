const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  roles: {
    User: {
      type: Number,
      default: 5000
    },
    SecureUser: {
      type: Number,
      // 5200
    },
    Admin: {
      type: Number
      // 5400
    }
  },
  refreshToken: {
    type: String
  }
})

module.exports = mongoose.model('User', userSchema)