/**
 * @author Mauricio Lima
 * @param {Array<Object>} obj 
 * @returns { JSON {
 *  properties: string[],
 *  transforms: string[]
 * }}
   * @example { properties: ['key1', 'key2'], transforms: ['key1.sub'] }
 */
module.exports = function objectPropertiesResolver(obj) {
  const properties = []
  const transforms = []
  const EXCLUDE_PROPERTY = '0'

  function resolveProperties(obj, parent) {

    for (const property in obj) {

      if (obj.hasOwnProperty(property)) {

        if (property === EXCLUDE_PROPERTY) {
          resolveProperties(obj[property], parent)
          return
        }

        try {
          if (Array.isArray(obj[property])) {
            if (typeof obj[property][0] !== 'object') {
              properties.push(`${parent.join('.')}.${property}`)
              transforms.push(parent)
              transforms.push(`${parent.join('.')}.${property}`)
              continue
            }
          }
        } catch (error) {
          console.log(error.message)
          continue
        }

        if (typeof obj[property] === 'object') {

          if (parent) {
            resolveProperties(obj[property], [...parent, property])
          } else {
            resolveProperties(obj[property], [property])
          }

        } else {

          if (parent) {
            properties.push(`${parent.join('.')}.${property}`)
          } else {
            properties.push(property)
          }

        }
      }
    }
  }
  resolveProperties(obj)
  return { properties, transforms }

}