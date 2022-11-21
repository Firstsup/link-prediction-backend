const Precision = (testScore, nonExistScore) => {
    testScore.sort((a, b) => b - a)
    nonExistScore.sort((a, b) => b - a)
    let pointer1 = 0
    let pointer2 = 0
    let N = 0
    let L = 0
    while (L <= 100) {
        if (testScore[pointer1] >= nonExistScore[pointer2]) {
            N++
            L++
            pointer1++
        } else {
            L++
            pointer2++
        }
    }
    return N / (L - 1)
}

module.exports = Precision