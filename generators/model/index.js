/**
 * Component Generator
 */

/* eslint strict: ['off'] */

'use strict'

const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'Add model',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'model',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true
      }

      return 'The name is required'
    },
  }],
  actions: () => {
    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: '../src/models/{{name}}/index.js',
      templateFile: './model/class.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../src/models/{{name}}/query.js',
      templateFile: './model/query.js.hbs',
      abortOnFail: true,
    }, {
      type: 'modify',
      path: '../src/models/index.js',
      pattern: /($)/gi,
      template: 'export { {{name}} } from \'./{{name}}\'\n',
    },
    ]

    return actions
  },
}
