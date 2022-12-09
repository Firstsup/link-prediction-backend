const tenCrossValidation = require('./tenCrossValidation')

const main = async () => {
    // const datasets = ['football', 'zachary']
    // const a = [0.01, 0.02, 0.05, 0.08, 0.1, 0.2, 0.5, 0.8, 1]
    // const b = [0, 0.01, 0.02, 0.05, 0.08, 0.1, 0.2, 0.5, 0.8, 1]
    // for (const d of datasets) {
    //     console.log(d)
    //     let auc = 0
    //     auc = 0
    //     for (let i = 0; i < 10; i++) {
    //         auc += (await tenCrossValidation(d, 'ERD')).AUCScore
    //     }
    //     console.log(auc / 10)
    //     auc = 0
    //     for (let i = 0; i < 10; i++) {
    //         auc += (await tenCrossValidation(d, 'CH')).AUCScore
    //     }
    //     console.log(auc / 10)
    //     for (const aa of a) {
    //         for (const bb of b) {
    //             auc = 0
    //             console.log(`${aa}, ${bb}`)
    //             for (let i = 0; i < 10; i++) {
    //                 auc += (await tenCrossValidation(d, 'LERD', aa, bb)).AUCScore
    //             }
    //             console.log(auc / 10)
    //         }
    //     }
    //     console.log('  ')
    // }
    tenCrossValidation('zachary', 'LERD', 50, 0.01)
}

main()