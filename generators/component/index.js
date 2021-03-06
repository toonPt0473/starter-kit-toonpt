/**
 * Component Generator
 */

/* eslint strict: ['off'] */

'use strict'

const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'Add component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true
      }

      return 'The name is required'
    },
  }],
  actions: () => {
    const actions = [{
      type: 'add',
      path: '../src/components/{{ extractClassName name }}/index.js',
      templateFile: './component/class.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../src/components/{{ extractClassName name }}/{{ extractClassName name }}.module.css',
      templateFile: './component/css.css.hbs',
      abortOnFail: true,
    }]
    return actions
  },
}
