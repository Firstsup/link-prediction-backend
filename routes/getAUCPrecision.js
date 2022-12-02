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
    try {
        const algorithms = ['CN', 'AA', 'RA', 'PA', 'HDI', 'HPI', 'SI', 'SOL', 'CH', 'ERD', 'LERD']
        const data = await eval(datasetName + 'Model').find({})
        if (!data) {
            util.responseClient(res, 500, 0, '数据库出错', {})
            console.log('e:', '数据库出错')
        } else {
            const score = []
            for (const d of algorithms) {
                score.push(await tenCrossValidation(datasetName, d))
            }
            util.responseClient(res, 200, 1, '成功', {
                score: score
            })
        }
    } catch (e) {
        console.log('e:', e)
    }
}