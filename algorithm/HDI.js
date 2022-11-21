const _ = require('lodash')

const HDI = (data, dataArray) => {
    const vertexCount = dataArray.length
    const similarityMatrix = Array.from(Array(vertexCount), () => new Array(vertexCount))
    for (let i = 0; i < vertexCount; i++) {
        for (let j = i + 1; j < vertexCount; j++) {
            similarityMatrix[i][j] = (_.intersection(dataArray[i], dataArray[j]).length) / Math.max(data[i].degree, data[j].degree)
        }
    }
    return similarityMatrix
}

module.exports = HDI