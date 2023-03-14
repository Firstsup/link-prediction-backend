const Precision = (testScore, nonExistScore, L = 100) => {
    testScore.sort((a, b) => b - a)
    nonExistScore.sort((a, b) => b - a)
    let pointer1 = 0
    let pointer2 = 0
    let N = 0
    let L0 = 0
    while (L0 < L) {
        if (testScore[pointer1] >= nonExistScore[pointer2]) {
            N++
            L0++
            pointer1++
        } else {
            L0++
            pointer2++
        }
    }
    return N / L
}

module.exports = Precision