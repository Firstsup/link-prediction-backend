const util = require('../utils/util')
const LERDResultModel = require("../models/LERDResult");

module.exports = async (req, res) => {
    const datasetName = req.query.datasetName
    const data = await LERDResultModel.find({datasetName: datasetName})
    try {
        util.responseClient(res, 200, 1, '成功', {
            score: data[0].result
        })
    } catch (e) {
        console.log('e:', e)
    }
}