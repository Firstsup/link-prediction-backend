const _ = require('lodash')

const SI = (data, dataArray) => {
    const vertexCount = dataArray.length
    const similarityMatrix = Array.from(Array(vertexCount), () => new Array(vertexCount))
    for (let i = 0; i < vertexCount; i++) {
        for (let j = i + 1; j < vertexCount; j++) {
            similarityMatrix[i][j] = (_.intersection(dataArray[i], dataArray[j]).length) / Math.sqrt(data[i].degree * data[j].degree)
        }
    }
    return similarityMatrix
}

module.exports = SI