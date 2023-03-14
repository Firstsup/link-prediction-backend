const _ = require('lodash')
const math = require('mathjs')

const LP = (data, dataArray) => {
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
    const adjacency2 = math.multiply(adjacency, adjacency)
    const adjacency3 = math.multiply(adjacency2, adjacency)
    return math.add(adjacency2, math.multiply(adjacency3, 0.5))
}

module.exports = LP