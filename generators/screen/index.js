/**
 * Component Generator
 */

/* eslint strict: ['off'] */

'use strict'

const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'Add new screen page',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'HomeScreen',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true
      }
      return 'The name is required'
    },
  }],
  actions: () => {
    // Generate index.js
    const actions = [{
      type: 'add',
      path: '../src/screen/{{ screeOnName name }}/index.js',
      templateFile: './screen/class.js.hbs',
      abortOnFail: true,
    }]

    return actions
  },
}
