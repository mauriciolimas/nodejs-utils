const objectPropertiesResolver = require('./properties-resolver')
const { Parser, transforms: { unwind } } = require('json2csv')
const fs = require('fs')

const data = JSON.parse(fs.readFileSync('./examples/carro.json').toString()).samples
const { properties, transforms: t } = objectPropertiesResolver(data)
const fields = properties

const transforms = [unwind({ paths: t })]

const config = { fields, transforms }

const parser = new Parser(config)
const csv = parser.parse(data)
fs.writeFileSync('./results.csv', csv)

console.log('Done!')