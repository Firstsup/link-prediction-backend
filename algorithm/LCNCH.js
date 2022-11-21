const _ = require('lodash')

const LCNCH = (data, dataArray, m = 0.08, n = 0.1) => {
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
            const neighborsA = []
            dataArray[i].forEach(d => {
                if (d !== j + 1) {
                    neighborsA.push(d)
                }
            })
            const neighborsB = []
            dataArray[j].forEach(d => {
                if (d !== i + 1) {
                    neighborsB.push(d)
                }
            })
            const CN2 = []
            for (let k = 0; k < neighborsA.length; k++) {
                for (let l = 0; l < neighborsB.length; l++) {
                    if (dataArray[neighborsA[k] - 1].includes(neighborsB[l])) {
                        !CN2.includes(neighborsA[k]) && CN2.push(neighborsA[k])
                        !CN2.includes(neighborsB[l]) && CN2.push(neighborsB[l])
                    }
                }
            }
            CN2.forEach(d1 => {
                let ki1 = 0
                let ki2 = 0
                let ke = 0
                const neighbors = dataArray[d1 - 1]
                for (const d2 of neighbors) {
                    if (d2 !== i + 1 && d2 !== j + 1) {
                        if (intersection.includes(d2)) {
                            ki1++
                            continue
                        } else if (CN2.includes(d2)) {
                            ki2++
                            continue
                        }
                        ke++
                    }
                }
                sum += m * ((1 + ki1 + n * ki2) / (1 + ke))
            })
            similarityMatrix[i][j] = sum
        }
    }
    return similarityMatrix
}

module.exports = LCNCH