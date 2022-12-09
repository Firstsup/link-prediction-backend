const util = require('../utils/util')
const datasetModel = require("../models/dataset");
const jazzMusiciansModel = require('../models/jazzMusicians')
const zacharyModel = require('../models/zachary')
const footballModel = require('../models/football')
const euroroadModel = require('../models/euroroad')
const hamsterHouseholdModel = require('../models/hamsterHousehold')
const arenasEmailModel = require('../models/arenasEmail')
const USAirModel = require('../models/USAir')
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
const tenCrossValidation = require('../dataParsing/tenCrossValidation')

module.exports = async (req, res) => {
    const datasetName = req.query.datasetName
    const node1 = req.query.node1
    const node2 = req.query.node2
    const a = req.query.a
    const b = req.query.b
    try {
        const data = await eval(datasetName + 'Model').find({})
        const dataArray = []
        data.forEach(d => {
            dataArray.push(d.edge)
        })
        const result = []
        const algorithms = ['CN', 'AA', 'RA', 'PA', 'HDI', 'HPI', 'SI', 'SOL', 'CH', 'ERD', 'LERD']
        algorithms.forEach(d => {
            const matrix = eval(d)(data, dataArray, a, b)
            const score = (parseInt(node1) < parseInt(node2)) ? matrix[node1 - 1][node2 - 1] : matrix[node2 - 1][node1 - 1]
            const matrixScoresArr = []
            for (let i = 0; i < matrix.length; i++) {
                for (let j = i + 1; j < matrix.length; j++) {
                    matrixScoresArr.push(matrix[i][j])
                }
            }
            const sortedMatrixScoresArr = matrixScoresArr.sort((a, b) => b - a)
            result.push(sortedMatrixScoresArr.indexOf(score) + 1)
        })
        if (!data) {
            util.responseClient(res, 500, 0, '数据库出错', {})
            console.log('e:', '数据库出错')
        } else {
            util.responseClient(res, 200, 1, '成功', {
                result: result,
                nodesCount: data.length
            })
        }
    } catch (e) {
        console.log('e:', e)
    }
}