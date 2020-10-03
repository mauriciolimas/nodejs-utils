const fs = require('fs')
const { Parser, transforms: { unwind } } = require('json2csv')
const objectPropertiesResolver = require('./objectPropertiesResolver')

// Import file
const data = JSON.parse(fs.readFileSync('./carro.json').toString()).samples
console.log('Data ', data.toString())
const { properties, transforms: t } = objectPropertiesResolver(data)
const fields = properties

// const fields = metadata.filter(item => item.indexOf('[]') < 0)
// const fields = metadata.map(item => item.replace('[]', ''))
// const transf = metadata.filter(item => item.indexOf('[]') > 0).map(item => item.replace('[]', ''))
// const fields = metadata
// const transf = ['tipos', 'tipos.cores']
// console.log(fields, transf)

const transforms = [unwind({ paths: t })]

const config = {
  fields,
  transforms
}
const parser = new Parser(config)

const csv = parser.parse(data)

console.log(csv)

fs.writeFileSync('./results.csv', csv)

console.log('Done!')