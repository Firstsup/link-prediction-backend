const tenCrossValidation = require('./tenCrossValidation')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const LCompare = async () => {
    const datasets = ['hamsterster']
    const algorithms = ['CN', 'RA', 'PA', 'CH', 'Katz', 'LERTR']
    const a = [0.1, 0.2, 0.5, 0.8, 1, 2, 5, 8, 10]
    const b = [0.01, 0.02, 0.05, 0.08, 0.1, 0.2, 0.5, 0.8, 1]
    const L = [20, 40, 60, 80, 100, 120, 140, 160]
    for (const dataset of datasets) {
        const csvHeader = []
        const csvData = []
        L.forEach(d => {
            csvHeader.push({id: d, name: d})
        })
        const csvWriter = createCsvWriter({
            path: `D://${dataset}-L-LERTR.csv`,
            header: csvHeader,
        })
        for (const algorithm of algorithms) {
            console.log(`algorithm ${algorithm}`)
            if (algorithm !== 'LERTR') {
                const algorithmData = {}
                for (let i = 0; i < L.length; i++) {
                    console.log(`L ${L[i]}`)
                    let precision = 0
                    const times = 1
                    for (let j = 0; j < times; j++) {
                        precision += (await tenCrossValidation(dataset, algorithm, 0, 0, L[i])).precisionScore
                    }
                    algorithmData[L[i]] = precision / times
                }
                csvData.push(algorithmData)
            } else {
                const algorithmData = {}
                for (let i = 0; i < L.length; i++) {
                    console.log(`L ${L[i]}`)
                    let precision = 0
                    const times = 1
                    let maxPrecision = 0
                    for (let j = 0; j < times; j++) {
                        for (const aa of a) {
                            for (const bb of b) {
                                console.log(`${aa}, ${bb}`)
                                const precisionScore = (await tenCrossValidation(dataset, algorithm, aa, bb, L[i])).precisionScore
                                maxPrecision = precisionScore > maxPrecision ? precisionScore : maxPrecision
                            }
                        }
                        precision += maxPrecision
                    }
                    // console.log(`${dataset} ${algorithm} L=${L[i]} precision: ${precision / 10}`)
                    algorithmData[L[i]] = precision / times
                }
                csvData.push(algorithmData)
            }
        }
        csvWriter.writeRecords(csvData).then(() => {
            console.log(`${dataset} success`)
        })
    }
}

LCompare()