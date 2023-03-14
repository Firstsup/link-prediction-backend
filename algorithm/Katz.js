const _ = require('lodash')
const math = require('mathjs')

const Katz = (data, dataArray) => {
    const vertexCount = dataArray.length
    const alpha = 0.01
    const adjacency = Array.from(Array(vertexCount), () => new Array(vertexCount))
    for (let i = 0; i < dataArray.length; i++) {
        for (let j = 0; j < dataArray[i].length; j++) {
            adjacency[i][dataArray[i][j] - 1] = 1
        }
    }
    for (let i = 0; i < adjacency.length; i++) {
        for (let j = 0; j < adjacency.length; j++) {
            if (adjacency[i][j] !== 1) {
                adjacency[i][j] = 0
            }
        }
    }
    const I = Array.from(Array(vertexCount), () => new Array(vertexCount))
    for (let i = 0; i < I.length; i++) {
        for (let j = 0; j < I.length; j++) {
            if (i === j) {
                I[i][j] = 1
            } else {
                I[i][j] = 0
            }
        }
    }
    return math.add(math.inv(math.add(I, math.multiply(adjacency, -alpha))), math.multiply(I, -1))
}

module.exports = Katz