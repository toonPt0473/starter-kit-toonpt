/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs')
const path = require('path')
// const pageScreens = fs.readdirSync(path.join(__dirname, '../../src/screens'));
const pageComponents = fs.readdirSync(path.join(__dirname, '../../src/components'))
const pageContainers = fs.readdirSync(path.join(__dirname, '../../src/containers'))
const pageModels = fs.readdirSync(path.join(__dirname, '../../src/models'))
const components = pageComponents.concat(pageContainers.concat(pageModels))

function componentExists(comp) {
  return components.indexOf(comp) >= 0
}

module.exports = componentExists
