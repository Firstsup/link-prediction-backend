const tenCrossValidation = require('./tenCrossValidation')

const main = async () => {
    console.log(await tenCrossValidation('football', 'CH'))
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