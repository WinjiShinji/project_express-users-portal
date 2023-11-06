const express = require('express')
const Router = express.Router()
const path = require('path') 
const logEvent = require('../middleware/logEvent')

Router.get('^/$|index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

Router.get('/login|login(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'login.html'))
})

Router.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', '404Error.html'))
})

module.exports = Router