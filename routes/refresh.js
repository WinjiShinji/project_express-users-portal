const express = require('express')
const router = express.Router()
const userRefresh = require('../controllers/userRefresh')

router.post('/', userRefresh)

module.exports = router