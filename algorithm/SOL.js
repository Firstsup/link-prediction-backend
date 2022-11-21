const _ = require('lodash')

const SOL = (data, dataArray) => {
    const vertexCount = dataArray.length
    const similarityMatrix = Array.from(Array(vertexCount), () => new Array(vertexCount))
    for (let i = 0; i < vertexCount; i++) {
        for (let j = i + 1; j < vertexCount; j++) {
            similarityMatrix[i][j] = 2 * (_.intersection(dataArray[i], dataArray[j]).length) / (data[i].degree + data[j].degree)
        }
    }
    return similarityMatrix
}

module.exports = SOL