const {readDataset} = require('./readDataset')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const writeCSV = async (datasetName) => {
    const data = await readDataset(datasetName)
    const arr = data.split('\n')
    const csvHeader = []
    const csvData = []
    csvHeader.push({id: 'id_1', name: 'id_1'})
    csvHeader.push({id: 'id_2', name: 'id_2'})
    const csvWriter = createCsvWriter({
        path: `D://${datasetName}_edges.csv`,
        header: csvHeader,
    })
    arr.forEach(d => {
        const edge = d.split(' ')
        if (edge.length === 2) {
            csvData.push({
                'id_1': parseInt(edge[0]) - 1 + '',
                'id_2': parseInt(edge[1]) - 1 + ''
            })
        }
    })
    csvWriter.writeRecords(csvData).then(() => {
        console.log(`${datasetName} success`)
    })
}

writeCSV('hamsterster')
