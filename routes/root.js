const express = require('express')
const app = express()
const Router = express.Router()
const path = require('path') 

Router.get('^/$|index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})





Router.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', '404Error.html'))
})

module.exports = Router