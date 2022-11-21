const _ = require('lodash')

const AA = (data, dataArray) => {
    const vertexCount = dataArray.length
    const similarityMatrix = Array.from(Array(vertexCount), () => new Array(vertexCount))
    for (let i = 0; i < vertexCount; i++) {
        for (let j = i + 1; j < vertexCount; j++) {
            const intersection = _.intersection(dataArray[i], dataArray[j])
            let sum = 0
            intersection.forEach(d => {
                sum += 1 / Math.log(data[d - 1].degree)
            })
            similarityMatrix[i][j] = sum
        }
    }
    return similarityMatrix
}

module.exports = AA