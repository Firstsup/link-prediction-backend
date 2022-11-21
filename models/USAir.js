const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const USAir = new Schema({
    vertex: {type: Number, require: true},
    edge: {type: Array(Number), require: true},
    degree: {type: Number, require: true},
})

module.exports = mongoose.model('USAir', USAir, 'USAir')