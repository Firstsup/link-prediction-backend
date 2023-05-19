const _ = require('lodash')
const math = require('mathjs')

const HEM = (data, dataArray, m, n, alpha, k) => {
    const vertexCount = dataArray.length
    const similarityMatrix = Array.from(Array(vertexCount), () => new Array(vertexCount))
    const adjacencyMatrix = Array.from(Array(vertexCount), () => new Array(vertexCount).fill(0))
    for (let i = 0; i < dataArray.length; i++) {
        for (let j = 0; j < dataArray[i].length; j++) {
            adjacencyMatrix[i][dataArray[i][j] - 1] = 1
        }
    }
    let adjacencyMatrixK = adjacencyMatrix
    for (let i = 0; i < k - 1; i++) {
        adjacencyMatrixK = math.multiply(adjacencyMatrixK, adjacencyMatrix)
    }
    const adjacencyMatrixKMore1 = math.multiply(adjacencyMatrixK, adjacencyMatrix)
    for (let i = 0; i < vertexCount; i++) {
        for (let j = i + 1; j < vertexCount; j++) {
            const p1 = Math.pow(1 / Math.sqrt(data[i].degree * data[j].degree), alpha)
            const p2 = Math.pow(Math.max(data[i].degree, data[j].degree) / Math.min(data[i].degree, data[j].degree), 1 - alpha)
            const p3 = adjacencyMatrixK[i][j] + adjacencyMatrixKMore1[i][j]
            similarityMatrix[i][j] = p1 * p2 * p3
        }
    }
    return similarityMatrix
}

module.exports = HEM