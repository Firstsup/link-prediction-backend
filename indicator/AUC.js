const AUC = (testScore, nonExistScore) => {
    let count = 0
    for (let i = 0; i < testScore.length; i++) {
        for (let j = 0; j < nonExistScore.length; j++) {
            if (testScore[i] > nonExistScore[j]) {
                count++
            } else if (testScore[i] === nonExistScore[j]) {
                count += 0.5
            }
        }
    }
    count /= (testScore.length * nonExistScore.length)
    return count
}

module.exports = AUC