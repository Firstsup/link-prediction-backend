const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const zachary = new Schema({
    vertex: {type: Number, require: true},
    edge: {type: Array(Number), require: true},
    degree: {type: Number, require: true},
})

module.exports = mongoose.model('zachary', zachary, 'zachary')