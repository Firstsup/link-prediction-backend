const tenCrossValidation = require('./tenCrossValidation')

const main = async () => {
    const datasets = ['football', 'zachary']
    const a = [0.01, 0.02, 0.05, 0.08, 0.1, 0.2, 0.5, 0.8, 1]
    const b = [0, 0.01, 0.02, 0.05, 0.08, 0.1, 0.2, 0.5, 0.8, 1]
    for (const d of datasets) {
        console.log(d)
        let auc = 0
        auc = 0
        for (let i = 0; i < 10; i++) {
            auc += (await tenCrossValidation(d, 'ERD')).AUCScore
        }
        console.log(auc / 10)
        auc = 0
        for (let i = 0; i < 10; i++) {
            auc += (await tenCrossValidation(d, 'CH')).AUCScore
        }
        console.log(auc / 10)
        for (const aa of a) {
            for (const bb of b) {
                auc = 0
                console.log(`${aa}, ${bb}`)
                for (let i = 0; i < 10; i++) {
                    auc += (await tenCrossValidation(d, 'LERD', aa, bb)).AUCScore
                }
                console.log(auc / 10)
            }
        }
        console.log('  ')
    }
    // console.log(await tenCrossValidation('football', 'CH1'))
    // console.log(await tenCrossValidation('football', 'CH2'))
    // console.log(await tenCrossValidation('football', 'CH3'))
    // console.log(await tenCrossValidation('football', 'CH'))
    // console.log(await tenCrossValidation('zachary', 'CH1'))
    // console.log(await tenCrossValidation('zachary', 'CH2'))
    // console.log(await tenCrossValidation('zachary', 'CH3'))
    // console.log(await tenCrossValidation('zachary', 'CH'))
    // console.log()
    // const paramsA = [0.001, 0.002, 0.005, 0.008, 0.01, 0.02, 0.05, 0.08, 0.1, 0.2, 0.5, 0.8]
    // const paramsB = [0, 0.001, 0.002, 0.005, 0.008, 0.01, 0.02, 0.05, 0.08, 0.1, 0.2, 0.5, 0.8]
    // let maxA
    // let maxB
    // let maxScore = {AUCScore: 0, precision: 0}
    // for (const d1 of paramsA) {
    //     for (const d2 of paramsB) {
    //         console.log(`A: ${d1}, B: ${d2}`)
    //         const score = await tenCrossValidation('football', 'LCNCH', d1, d2)
    //         console.log(score)
    //         if (maxScore.AUCScore < score.AUCScore) {
    //             maxA = d1
    //             maxB = d2
    //             maxScore = score
    //         }
    //         console.log()
    //     }
    // }
    // console.log('max:')
    // console.log(`A: ${maxA}, B: ${maxB}`)
    // console.log(maxScore)
}

main()