const util = require('../utils/util')
const datasetModel = require("../models/dataset");

module.exports = async (req, res) => {
    try {
        const data = await datasetModel.find({})
        if (!data) {
            util.responseClient(res, 500, 0, '数据库出错', {})
            console.log('e:', '数据库出错')
        } else {
            util.responseClient(res, 200, 1, '成功', {
                statistics: data
            })
        }
    } catch (e) {
        console.log('e:', e)
    }
}