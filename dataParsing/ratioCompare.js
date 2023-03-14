const tenCrossValidation = require('./tenCrossValidation')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const ratioCompare = async () => {
    const datasets = ['hamsterster']
    const algorithms = ['CN', 'RA', 'PA', 'CH', 'Katz', 'LERTR']
    const a = [0.1, 0.2, 0.5, 0.8, 1, 2, 5, 8, 10]
    const b = [0.01, 0.02, 0.05, 0.08, 0.1, 0.2, 0.5, 0.8, 1]
    const ratios = [0.5, 0.6, 0.7, 0.8, 0.9]
    for (const dataset of datasets) {
        const csvHeader = []
        const csvData = []
        ratios.forEach(d => {
            csvHeader.push({id: d, name: d})
        })
        const csvWriter = createCsvWriter({
            path: `D://${dataset}-Ratio-LERTR.csv`,
            header: csvHeader,
        })
        for (const algorithm of algorithms) {
            console.log(`algorithm ${algorithm}`)
            if (algorithm !== 'LERTR') {
                const algorithmData = {}
                for (let i = 0; i < ratios.length; i++) {
                    console.log(`ratio ${ratios[i]}`)
                    let AUC = 0
                    const times = 1
                    for (let j = 0; j < times; j++) {
                        AUC += (await tenCrossValidation(dataset, algorithm, 0, 0, 100, ratios[i])).AUCScore
                    }
                    // console.log(`${dataset} ${algorithm} L=${L[i]} precision: ${precision / 10}`)
                    algorithmData[ratios[i]] = AUC / times
                }
                csvData.push(algorithmData)
            } else {
                const algorithmData = {}
                for (let i = 0; i < ratios.length; i++) {
                    console.log(`ratio ${ratios[i]}`)
                    let AUC = 0
                    const times = 1
                    let maxAUC = 0
                    for (let j = 0; j < times; j++) {
                        for (const aa of a) {
                            for (const bb of b) {
                                const AUCScore = (await tenCrossValidation(dataset, algorithm, aa, bb, 100, ratios[i])).AUCScore
                                maxAUC = AUCScore > maxAUC ? AUCScore : maxAUC
                            }
                        }
                        AUC += maxAUC
                    }
                    // console.log(`${dataset} ${algorithm} L=${L[i]} precision: ${precision / 10}`)
                    algorithmData[ratios[i]] = AUC / times
                }
                csvData.push(algorithmData)
            }
        }
        csvWriter.writeRecords(csvData).then(() => {
            console.log(`${dataset} success`)
        })
    }
}

ratioCompare()