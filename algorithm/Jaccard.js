const _ = require('lodash')

const Jaccard = (data, dataArray) => {
    const vertexCount = dataArray.length
    const similarityMatrix = Array.from(Array(vertexCount), () => new Array(vertexCount))
    for (let i = 0; i < vertexCount; i++) {
        for (let j = i + 1; j < vertexCount; j++) {
            similarityMatrix[i][j] = _.intersection(dataArray[i], dataArray[j]).length / _.union(dataArray[i], dataArray[j]).length
        }
    }
    return similarityMatrix
}

module.exports = Jaccard