const _ = require('lodash')

const jazzMusiciansModel = require('../models/jazzMusicians')
const zacharyModel = require('../models/zachary')
const footballModel = require('../models/football')
const euroroadModel = require('../models/euroroads')
const hamsterHouseholdModel = require('../models/hamsterHousehold')
const arenasEmailModel = require('../models/arenasEmail')
const USAirModel = require('../models/USAir')
const DBpediaModel = require('../models/DBpedia')
const physiciansModel = require('../models/physicians')
const yeastModel = require('../models/yeast')
const netscienceModel = require('../models/netscience')
const datasetModel = require('../models/dataset')
const LERTRResultModel = require('../models/LERTRResult')
const LERTR = require('../algorithm/LERTR')
const tenCrossValidation = require('../dataParsing/tenCrossValidation')
require('../config/mongodbConnection')

const writeLERTRResult = async (datasetName) => {
    const a = [0.1, 0.2, 0.5, 0.8, 1, 2, 5, 8, 10]
    const b = [0.01, 0.02, 0.05, 0.08, 0.1, 0.2, 0.5, 0.8, 1]
    const score = []
    for (let i = 0; i < a.length; i++) {
        console.log(`a ${a[i]}`)
        const scoreLine = []
        for (let j = 0; j < b.length; j++) {
            console.log(`b ${b[j]}`)
            let tempScore = 0
            for (let k = 0; k < 1000; k++) {
                tempScore += (await tenCrossValidation(datasetName, 'LERTR', a[i], b[j])).AUCScore
            }
            scoreLine.push(tempScore / 1000)
        }
        score.push(scoreLine)
    }
    try {
        await LERTRResultModel.create({
            datasetName: datasetName,
            result: score
        })
    } catch (e) {
        console.log('e:', e)
    }
}

writeLERTRResult('football')