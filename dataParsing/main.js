const tenCrossValidation = require('./tenCrossValidation')

const main = async (dataset) => {
    const algorithms = ['CN', 'AA', 'RA', 'PA', 'HDI', 'HPI', 'SI', 'SOL', 'CH', 'ERTR', 'LERTR']
    const a = [1, 5, 8, 10, 50, 80, 100, 500, 800]
    const b = [0.001, 0.005, 0.008, 0.01, 0.05, 0.08, 0.1, 0.5, 0.8, 1]
    for (const d of algorithms) {
        if (d === 'LERTR') {
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
                    for (let i = 0; i < 1; i++) {
                        auc += (await tenCrossValidation(dataset, 'LERTR', aa, bb)).AUCScore
                        precision += (await tenCrossValidation(dataset, 'LERTR', aa, bb)).precisionScore
                    }
                    console.log(`${dataset} ${d}(a=${aa},b=${bb}): AUC: ${auc} precision: ${precision}`)
                    if (auc > maxAUC) {
                        maxAUC = auc
                        maxAUCA = aa
                        maxAUCB = bb
                    }
                    if (precision > maxPrecision) {
                        maxPrecision = precision
                        maxPrecisionA = aa
                        maxPrecisionB = bb
                    }
                }
            }
            console.log(`${dataset} maxAUC: ${maxAUC}, a=${maxAUCA}, b=${maxAUCB}  maxPrecision: ${maxPrecision}, a=${maxPrecisionA}, b=${maxPrecisionB}`)
        } else {
            let auc = 0
            let precision = 0
            for (let i = 0; i < 1; i++) {
                auc += (await tenCrossValidation(dataset, d)).AUCScore
                precision += (await tenCrossValidation(dataset, d)).precisionScore
            }
            console.log(`${dataset} ${d}: AUC: ${auc} precision: ${precision}`)
        }
    }
}

main('jazzMusicians')
main('yeast')
main('netscience')