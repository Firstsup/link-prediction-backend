const util = require('../utils/util')
const datasetModel = require("../models/dataset");
const jazzMusiciansModel = require('../models/jazzMusicians')
const zacharyModel = require('../models/zachary')
const footballModel = require('../models/football')
const euroroadModel = require('../models/euroroad')
const hamsterHouseholdModel = require('../models/hamsterHousehold')
const arenasEmailModel = require('../models/arenasEmail')
const USAirModel = require('../models/USAir')

module.exports = async (req, res) => {
    const datasetName = req.query.datasetName
    try {
        const data = await eval(datasetName + 'Model').find({})
        if (!data) {
            util.responseClient(res, 500, 0, '数据库出错', {})
            console.log('e:', '数据库出错')
        } else {
            util.responseClient(res, 200, 1, '成功', {
                graph: data
            })
        }
    } catch (e) {
        console.log('e:', e)
    }
}