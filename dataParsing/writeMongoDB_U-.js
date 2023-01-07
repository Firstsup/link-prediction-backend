const _ = require('lodash')

const jazzMusiciansModel = require('../models/jazzMusicians')
const zacharyModel = require('../models/zachary')
const footballModel = require('../models/football')
const euroroadsModel = require('../models/euroroads')
const hamsterHouseholdModel = require('../models/hamsterHousehold')
const arenasEmailModel = require('../models/arenasEmail')
const USAirModel = require('../models/USAir')
const DBpediaModel = require('../models/DBpedia')
const physiciansModel = require('../models/physicians')
const yeastModel = require('../models/yeast')
const netscienceModel = require('../models/netscience')
const hamstersterModel = require('../models/hamsterster')
const datasetModel = require('../models/dataset')
const {readDataset} = require('./readDataset')
require('../config/mongodbConnection')

const writeMongoDB = async (datasetName) => {
    const data = await readDataset(datasetName)
    const arr = data.split('\n')
    const array = []
    const connections = []
    let vertexCount = 0
    let edgeCount = 0
    arr.forEach(d => {
        const connection = d.split(' ').map(d => Number(d))
        connections.push(connection)
        if (connection.length === 2) {
            edgeCount++
            if (_.isUndefined(array[connection[0]])) {
                array[connection[0]] = [connection[1]]
                vertexCount++
            } else {
                array[connection[0]].push(connection[1])
            }
            if (_.isUndefined(array[connection[1]])) {
                array[connection[1]] = [connection[0]]
                vertexCount++
            } else {
                array[connection[1]].push(connection[0])
            }
        }
    })
    for (let i = 0; i < array.length; i++) {
        if (!_.isUndefined(array[i])) {
            try {
                await eval(datasetName + 'Model').create({
                    vertex: i,
                    edge: array[i],
                    degree: array[i].length,
                })
            } catch (e) {
                console.log('e:', e)
            }
        }
    }
    try {
        await datasetModel.create({
            datasetName: datasetName,
            vertexCount: vertexCount,
            edgeCount: edgeCount,
            connection: connections,
        })
    } catch (e) {
        console.log('e:', e)
    }
}

writeMongoDB('hamsterster')