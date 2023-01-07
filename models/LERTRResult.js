const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const LERTRResult = new Schema({
    datasetName: {type: String, require: true},
    result: {type: Array, require: true},
})

module.exports = mongoose.model('LERTRResult', LERTRResult, 'LERTRResult')