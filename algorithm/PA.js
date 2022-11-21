const _ = require('lodash')

const PA = (data, dataArray) => {
    const vertexCount = dataArray.length
    const similarityMatrix = Array.from(Array(vertexCount), () => new Array(vertexCount))
    for (let i = 0; i < vertexCount; i++) {
        for (let j = i + 1; j < vertexCount; j++) {
            similarityMatrix[i][j] = dataArray[i].length * dataArray[j].length
        }
    }
    return similarityMatrix
}

module.exports = PA