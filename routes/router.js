const express = require('express')
const router = express.Router()

router.get('/api/getGraph', require('./getGraph'))
router.get('/api/getMatrix', require('./getMatrix'))
router.get('/api/getStatistics', require('./getStatistics'))
router.get('/api/getAUCPrecision', require('./getAUCPrecision'))
router.get('/api/getAlgorithmResult', require('./getAlgorithmResult'))
router.get('/api/getLERDResult', require('./getLERDResult'))
router.get('/api/getLERDAUCPrecisionOnly', require('./getLERDAUCPrecisionOnly'))

module.exports = router