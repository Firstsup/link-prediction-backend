const util = require('../utils/util')
const LERTRResultModel = require("../models/LERTRResult");

module.exports = async (req, res) => {
    const datasetName = req.query.datasetName
    const data = await LERTRResultModel.find({datasetName: datasetName})
    try {
        util.responseClient(res, 200, 1, '成功', {
            score: data[0].result
        })
    } catch (e) {
        console.log('e:', e)
    }
}