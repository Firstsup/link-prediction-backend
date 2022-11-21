const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const hamsterHousehold = new Schema({
    vertex: {type: Number, require: true},
    edge: {type: Array(Number), require: true},
    degree: {type: Number, require: true},
})

module.exports = mongoose.model('hamsterHousehold', hamsterHousehold, 'hamsterHousehold')