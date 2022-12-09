const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const LERDResult = new Schema({
    datasetName: {type: String, require: true},
    result: {type: Array, require: true},
})

module.exports = mongoose.model('LERDResult', LERDResult, 'LERDResult')