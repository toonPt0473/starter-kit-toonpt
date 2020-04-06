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
    default: 'User',
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
      path: '../src/service/{{ name }}.js',
      templateFile: './service/service.js.hbs',
      abortOnFail: true,
    }]

    return actions
  },
}
