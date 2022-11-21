const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const dataset = new Schema({
    datasetName: {type: String, require: true},
    vertexCount: {type: Number, require: true},
    edgeCount: {type: Number, require: true},
    connection: {type: Array(Array(Number)), require: true},
})

module.exports = mongoose.model('dataset', dataset, 'dataset')