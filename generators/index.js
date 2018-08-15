const fs = require('fs')
const path = require('path')
// const screenGenerator = require('./screen/index.js')
const componentGenerator = require('./component/index.js')
const containerGenerator = require('./container/index.js')
const modelGenerator = require('./model/index.js')

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
module.exports = function generate(plop) {
  // create your generators here
  // plop.setGenerator('screen', screenGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('container', containerGenerator)
  plop.setGenerator('model', modelGenerator)
  plop.addHelper('directory', (comp) => {
    console.log(comp)
    try {
      fs.accessSync(path.join(__dirname, `../../app/containers/${comp}`), fs.F_OK)
      return `containers/${comp}`
    } catch (e) {
      return `components/${comp}`
    }
  })
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'))
  plop.addHelper('extractClassName', (text) => capitalizeFirstLetter(text.split('/').pop()))
}
