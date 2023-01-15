const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')



router.get('/coins', controller.getCoin)


module.exports = router   