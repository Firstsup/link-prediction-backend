const _ = require('lodash')

const LERTR = (data, dataArray, a = 1, b = 0.1) => {
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
                            v2 += (dataArray[d2 - 1].length - 2) / dataArray[d2 - 1].length
                        } else {
                            v3++
                        }
                    }
                })
                sum += (2 + v1 + neighbors.length) / (v2 + v3 + neighbors.length)
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
                        if (!CN2.includes([neighborsA[k], neighborsB[l]] && !CN2.includes([neighborsB[l], neighborsA[k]]))) {
                            CN2.push([neighborsA[k], neighborsB[l]])
                        }
                    }
                }
            }
            CN2.forEach(d1 => {
                const n1 = d1[0]
                const n2 = d1[1]
                let v5 = 0
                let v6 = 0
                const i1 = []
                dataArray[n1 - 1].forEach(d2 => {
                    if (intersection.includes(d2)) {
                        i1.push(d2)
                    } else {
                        v5++
                    }
                })
                const i2 = []
                dataArray[n2 - 1].forEach(d2 => {
                    if (intersection.includes(d2)) {
                        i2.push(d2)
                    } else {
                        v6++
                    }
                })
                let v1 = 0
                let v2 = 0
                let v3 = 0
                let v4 = 0
                i1.forEach(d2 => {
                    v1 += 1 / dataArray[n1 - 1].length * (2 / dataArray[d2 - 1].length)
                })
                i2.forEach(d2 => {
                    v2 += 1 / dataArray[n2 - 1].length * (2 / dataArray[d2 - 1].length)
                })
                i1.forEach(d2 => {
                    v3 += 1 / dataArray[n1 - 1].length * ((dataArray[d2 - 1].length - 2) / dataArray[d2 - 1].length)
                })
                i2.forEach(d2 => {
                    v4 += 1 / dataArray[n2 - 1].length * ((dataArray[d2 - 1].length - 2) / dataArray[d2 - 1].length)
                })
                sum += a * (1 / dataArray[n1 - 1].length + 1 / dataArray[n2 - 1].length + 2 / (dataArray[n1 - 1].length * dataArray[n2 - 1].length) + b * v1 + b * v2) / (b * v3 + b * v4 + v5 / dataArray[n1 - 1].length + v6 / dataArray[n2 - 1].length - 2 / (dataArray[n1 - 1].length * dataArray[n2 - 1].length) + 1)
            })
            similarityMatrix[i][j] = sum
        }
    }
    return similarityMatrix
}

module.exports = LERTR