const _ = require('lodash')

const CH = (data, dataArray) => {
    const vertexCount = dataArray.length
    const similarityMatrix = Array.from(Array(vertexCount), () => new Array(vertexCount))
    for (let i = 0; i < vertexCount; i++) {
        for (let j = i + 1; j < vertexCount; j++) {
            const intersection = _.intersection(dataArray[i], dataArray[j])
            let sum = 0
            intersection.forEach(d1 => {
                let ki = 0
                let ke = 0
                const neighbors = dataArray[d1 - 1]
                neighbors.forEach(d2 => {
                    if (d2 !== i + 1 && d2 !== j + 1) {
                        if (intersection.includes(d2)) {
                            ki++
                        } else {
                            ke++
                        }
                    }
                })
                sum += (1 + ki) / (1 + ke)
            })
            similarityMatrix[i][j] = sum
        }
    }
    return similarityMatrix
}

module.exports = CH