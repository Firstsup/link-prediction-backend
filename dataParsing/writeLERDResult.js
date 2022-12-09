const _ = require('lodash')

const jazzMusiciansModel = require('../models/jazzMusicians')
const zacharyModel = require('../models/zachary')
const footballModel = require('../models/football')
const euroroadModel = require('../models/euroroad')
const hamsterHouseholdModel = require('../models/hamsterHousehold')
const arenasEmailModel = require('../models/arenasEmail')
const USAirModel = require('../models/USAir')
const datasetModel = require('../models/dataset')
const LERDResultModel = require('../models/LERDResult')
const LERD = require('../algorithm/LERD')
const tenCrossValidation = require('../dataParsing/tenCrossValidation')
require('../config/mongodbConnection')

const writeLERDResult = async (datasetName) => {
    const a = [1, 5, 8, 10, 50, 80, 100, 500, 800]
    const b = [0.001, 0.005, 0.008, 0.01, 0.05, 0.08, 0.1, 0.5, 0.8, 1]
    const score = []
    for (let i = 0; i < a.length; i++) {
        console.log(a[i])
        const scoreLine = []
        for (let j = 0; j < b.length; j++) {
            console.log(b[j])
            let tempScore = 0
            for (let k = 0; k < 1000; k++) {
                tempScore += (await tenCrossValidation(datasetName, 'LERD', a[i], b[j])).AUCScore
            }
            scoreLine.push(tempScore / 1000)
        }
        score.push(scoreLine)
    }
    try {
        await LERDResultModel.create({
            datasetName: datasetName,
            result: score
        })
    } catch (e) {
        console.log('e:', e)
    }
}

writeLERDResult('football')