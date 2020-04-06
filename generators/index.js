const fs = require('fs')
const path = require('path')
// const screenGenerator = require('./screen/index.js')
const componentGenerator = require('./component/index.js')
const containerGenerator = require('./container/index.js')
const screenGenerator = require('./screen/index.js')
const modelGenerator = require('./model/index.js')
const serviceGenerator = require('./service')

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
function checkScreenOnName(string) {
  const ConvertToClassName = capitalizeFirstLetter(string)
  const screenText = ConvertToClassName.slice(-6)
  if (screenText === 'Screen') {
    return ConvertToClassName
  }
  return `${ConvertToClassName}Screen`
}
module.exports = function generate(plop) {
  // create your generators here
  // plop.setGenerator('screen', screenGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('container', containerGenerator)
  plop.setGenerator('screen', screenGenerator)
  plop.setGenerator('service', serviceGenerator)
  plop.setGenerator('model', modelGenerator)
  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(path.join(__dirname, `../../app/containers/${comp}`), fs.F_OK)
      return `containers/${comp}`
    } catch (e) {
      return `components/${comp}`
    }
  })
  plop.addHelper('screeOnName', (text) => checkScreenOnName(text))
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'))
  plop.addHelper('extractClassName', (text) => capitalizeFirstLetter(text.split('/').pop()))
}
