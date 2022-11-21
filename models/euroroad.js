const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const euroroad = new Schema({
    vertex: {type: Number, require: true},
    edge: {type: Array(Number), require: true},
    degree: {type: Number, require: true},
})

module.exports = mongoose.model('euroroad', euroroad, 'euroroad')