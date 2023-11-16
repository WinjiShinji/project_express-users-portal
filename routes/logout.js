const express = require('express')
const router = express.Router()
const userLogout = require('../controllers/userLogout')

router.post('/', userLogout)

module.exports = router