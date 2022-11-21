const fs = require('fs')

const readDataset = (datasetName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`../Dataset/${datasetName}`, 'utf8', (err, data) => {
            resolve(data)
        })
    })
}

exports.readDataset = readDataset;