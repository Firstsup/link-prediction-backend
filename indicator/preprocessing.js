const Preprocessing = (similarityMatrix, dataArray, test) => {
    const testScore = []
    const nonExistScore = []
    test.forEach(d => {
        if (d[0] < d[1]) {
            testScore.push(similarityMatrix[d[0] - 1][d[1] - 1])
            similarityMatrix[d[0] - 1][d[1] - 1] = -1
        } else {
            testScore.push(similarityMatrix[d[1] - 1][d[0] - 1])
            similarityMatrix[d[1] - 1][d[0] - 1] = -1
        }
    })
    for (let i = 0; i < dataArray.length; i++) {
        dataArray[i].forEach(d => {
            if (i + 1 < d) {
                similarityMatrix[i][d - 1] = -1
            } else {
                similarityMatrix[d - 1][i] = -1
            }
        })
    }
    for (let i = 0; i < similarityMatrix.length; i++) {
        for (let j = i + 1; j < similarityMatrix.length; j++) {
            if (similarityMatrix[i][j] !== -1) {
                nonExistScore.push(similarityMatrix[i][j])
            }
        }
    }
    return {
        testScore,
        nonExistScore
    }
}

module.exports = Preprocessing