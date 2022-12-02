const express = require('express')
const router = express.Router()

router.get('/api/getGraph', require('./getGraph'))
router.get('/api/getMatrix', require('./getMatrix'))
router.get('/api/getStatistics', require('./getStatistics'))
router.get('/api/getAUCPrecision', require('./getAUCPrecision'))

module.exports = router