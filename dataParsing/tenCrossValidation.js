const datasetModel = require("../models/dataset");
const jazzMusiciansModel = require('../models/jazzMusicians')
const zacharyModel = require('../models/zachary')
const footballModel = require('../models/football')
const euroroadModel = require('../models/euroroad')
const hamsterHouseholdModel = require('../models/hamsterHousehold')
const arenasEmailModel = require('../models/arenasEmail')
const USAirModel = require('../models/USAir')
require('../config/mongodbConnection')
const _ = require('lodash')
const CN = require('../algorithm/CN')
const AA = require('../algorithm/AA')
const RA = require('../algorithm/RA')
const CH = require('../algorithm/CH')
const PA = require('../algorithm/PA')
const HDI = require('../algorithm/HDI')
const HPI = require('../algorithm/HPI')
const SI = require('../algorithm/SI')
const SOL = require('../algorithm/SOL')
const ERD = require('../algorithm/ERD')
const LERD = require('../algorithm/LERD')
const Preprocessing = require('../indicator/preprocessing')
const AUC = require('../indicator/AUC')
const Precision = require('../indicator/Precision')

const tenCrossValidation = async (datasetName, algorithm, m, n) => {
    const data = await eval(datasetName + 'Model').find({})
    const datasetInfo = await datasetModel.find({datasetName: datasetName})
    const vertexCount = datasetInfo[0].vertexCount
    const edgeCount = datasetInfo[0].edgeCount
    const connections = datasetInfo[0].connection
    const category = Array.from(Array(10), () => new Array(0))
    const tempCategoryCount = new Array(10).fill(0)
    const categoryCount = Math.floor(edgeCount / 10) + 1
    for (let i = 0; i < edgeCount; i++) {
        while (true) {
            const randNum = Math.floor(Math.random() * 10)
            if (tempCategoryCount[randNum] < categoryCount) {
                category[randNum].push(connections[i])
                tempCategoryCount[randNum]++
                break
            }
        }
    }
    const templateDataArray = Array.from(Array(vertexCount), () => [])
    for (let i = 0; i < data.length; i++) {
        data[i].edge.forEach(d => {
            templateDataArray[i].push(d)
        })
    }
    let sumAUC = 0
    let sumPrecision = 0
    for (let i = 0; i < 10; i++) {
        const dataArray = _.cloneDeep(templateDataArray)
        category[i].forEach(d => {
            _.pull(dataArray[d[0] - 1], d[1])
            _.pull(dataArray[d[1] - 1], d[0])
        })
        const similarityMatrix = eval(algorithm)(data, dataArray, m, n)
        const {testScore, nonExistScore} = Preprocessing(similarityMatrix, dataArray, category[i])
        const tempAUCScore = AUC(testScore, nonExistScore)
        const tempPrecisionScore = Precision(testScore, nonExistScore)
        sumAUC += tempAUCScore
        sumPrecision += tempPrecisionScore
    }
    const AUCScore = sumAUC / 10
    const precisionScore = sumPrecision / 10
    return {
        AUCScore: AUCScore,
        precisionScore: precisionScore
    }
}

module.exports = tenCrossValidation