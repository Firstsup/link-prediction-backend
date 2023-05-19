const tenCrossValidation = require('./tenCrossValidation')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const main = async (dataset) => {
    const algorithms = ['HEM']
    const a = [0.1, 0.2, 0.5, 0.8, 1, 2, 5, 8, 10]
    const b = [0.01, 0.02, 0.05, 0.08, 0.1, 0.2, 0.5, 0.8, 1]
    const alpha = [0, 0.25, 0.5, 0.75, 1]
    const k = [2, 4, 8]
    for (const d of algorithms) {
        if (d === 'LERTR') {
            const csvData = []
            const csvHeader = [
                {id: 'a', name: 'a'},
                {id: 'b', name: 'b'},
                {id: 'AUC', name: 'AUC'},
                {id: 'Precision', name: 'Precision'}
            ]
            const csvWriter = createCsvWriter({
                path: `D://${dataset}-LERTR.csv`,
                header: csvHeader,
            })
            let maxAUC = 0
            let maxPrecision = 0
            let maxAUCA
            let maxAUCB
            let maxPrecisionA
            let maxPrecisionB
            for (const aa of a) {
                for (const bb of b) {
                    let auc = 0
                    let precision = 0
                    const times = 1
                    for (let i = 0; i < times; i++) {
                        auc += (await tenCrossValidation(dataset, 'LERTR', aa, bb)).AUCScore
                        precision += (await tenCrossValidation(dataset, 'LERTR', aa, bb)).precisionScore
                    }
                    console.log(`${dataset} ${d}(a=${aa},b=${bb}): AUC: ${auc / times} precision: ${precision / times}`)
                    if (auc / times > maxAUC) {
                        maxAUC = auc / times
                        maxAUCA = aa
                        maxAUCB = bb
                    }
                    if (precision / times > maxPrecision) {
                        maxPrecision = precision / times
                        maxPrecisionA = aa
                        maxPrecisionB = bb
                    }
                }
            }
            console.log(`${dataset} maxAUC: ${maxAUC}, a=${maxAUCA}, b=${maxAUCB}  maxPrecision: ${maxPrecision}, a=${maxPrecisionA}, b=${maxPrecisionB}`)
            csvData.push({
                a: maxAUCA,
                b: maxAUCB,
                AUC: maxAUC
            })
            csvData.push({
                a: maxPrecisionA,
                b: maxPrecisionB,
                Precision: maxPrecision
            })
            csvWriter.writeRecords(csvData).then(() => {
                console.log(`${dataset} success`)
            })
        } else if (d === 'HEM') {
            let maxAUC = 0
            let maxPrecision = 0
            let maxAUCAlpha
            let maxAUCK
            let maxPrecisionAlpha
            let maxPrecisionK
            for (const a of alpha) {
                for (const b of k) {
                    let auc = 0
                    let precision = 0
                    const times = 1
                    for (let i = 0; i < times; i++) {
                        auc += (await tenCrossValidation(dataset, 'LERTR', 1, 0.1, 100, 0.9, a, b)).AUCScore
                        precision += (await tenCrossValidation(dataset, 'LERTR', 1, 0.1, 100, 0.9, a, b)).precisionScore
                    }
                    console.log(`${dataset} ${d}(alpha=${a},k=${b}): AUC: ${auc / times} precision: ${precision / times}`)
                    if (auc / times > maxAUC) {
                        maxAUC = auc / times
                        maxAUCAlpha = a
                        maxAUCK = b
                    }
                    if (precision / times > maxPrecision) {
                        maxPrecision = precision / times
                        maxPrecisionAlpha = a
                        maxPrecisionK = b
                    }
                }
            }
            console.log(`${dataset} maxAUC: ${maxAUC}, alpha=${maxAUCAlpha}, k=${maxAUCK}  maxPrecision: ${maxPrecision}, alpha=${maxPrecisionAlpha}, k=${maxPrecisionK}`)
        } else {
            let auc = 0
            let precision = 0
            const times = 10
            for (let i = 0; i < times; i++) {
                auc += (await tenCrossValidation(dataset, d)).AUCScore
                precision += (await tenCrossValidation(dataset, d)).precisionScore
            }
            console.log(`${dataset} ${d}: AUC: ${auc / times} precision: ${precision / times}`)
        }
    }
}

main('football')