require('../config/mongodbConnection')
const _ = require('lodash')
const zacharyModel = require('../models/zachary')
const footballModel = require('../models/football')
const DBpediaModel = require('../models/DBpedia')
const physiciansModel = require('../models/physicians')
const euroroadsModel = require('../models/euroroads')
const jazzMusiciansModel = require('../models/jazzMusicians')
const yeastModel = require('../models/yeast')
const netscienceModel = require('../models/netscience')
const hamsterHouseholdModel = require('../models/hamsterHousehold')

const degreeDistribution = async (datasetName) => {
    const data = await eval(datasetName + 'Model').find({})
    const map = new Map
    data.forEach(d => {
        if (map.has(d.degree)) {
            map.set(d.degree, map.get(d.degree) + 1)
        } else {
            map.set(d.degree, 1)
        }
    })
    const arrayObj = Array.from(map)
    arrayObj.sort((a, b) => a[0] - b[0])
    arrayObj.forEach(d => {
        d[1] = d[1] / data.length
    })
    console.log(arrayObj)
}

degreeDistribution('netscience')