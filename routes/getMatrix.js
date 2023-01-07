const util = require('../utils/util')
const datasetModel = require("../models/dataset");
const jazzMusiciansModel = require('../models/jazzMusicians')
const zacharyModel = require('../models/zachary')
const footballModel = require('../models/football')
const euroroadModel = require('../models/euroroads')
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
const ERTR = require('../algorithm/ERTR')
const LERTR = require('../algorithm/LERTR')

module.exports = async (req, res) => {
    const datasetName = req.query.datasetName
    const algorithmName = req.query.algorithmName
    const a = req.query.a
    const b = req.query.b
    try {
        const data = await eval(datasetName + 'Model').find({})
        const dataArray = []
        data.forEach(d => {
            dataArray.push(d.edge)
        })
        const matrix = eval(algorithmName)(data, dataArray, a, b)
        if (!data) {
            util.responseClient(res, 500, 0, '数据库出错', {})
            console.log('e:', '数据库出错')
        } else {
            util.responseClient(res, 200, 1, '成功', {
                matrix: matrix
            })
        }
    } catch (e) {
        console.log('e:', e)
    }
}