const _ = require('lodash')

const ERTR = (data, dataArray) => {
    const vertexCount = dataArray.length
    const similarityMatrix = Array.from(Array(vertexCount), () => new Array(vertexCount))
    for (let i = 0; i < vertexCount; i++) {
        for (let j = i + 1; j < vertexCount; j++) {
            const intersection = _.intersection(dataArray[i], dataArray[j])
            let sum = 0
            intersection.forEach(d1 => {
                let v1 = 0
                let v2 = 0
                let v3 = 0
                const neighbors = dataArray[d1 - 1]
                neighbors.forEach(d2 => {
                    if (d2 !== i + 1 && d2 !== j + 1) {
                        if (intersection.includes(d2)) {
                            v1 += 2 / dataArray[d2 - 1].length
                            v2 += (dataArray[d2 - 1].length - 3) / dataArray[d2 - 1].length
                        } else {
                            v3++
                        }
                    }
                })
                sum += (2 + v1) / (v2 + v3 + neighbors.length)
            })
            similarityMatrix[i][j] = sum
        }
    }
    return similarityMatrix
}

module.exports = ERTR