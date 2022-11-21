const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const residencehall = new Schema({
    vertex: {type: Number, require: true},
    edge: {type: Array(Number), require: true},
    weight: {type: Array(Number), require: false},
    degree: {type: Number, require: true},
})

module.exports = mongoose.model('residenceHall', residencehall, 'residenceHall')