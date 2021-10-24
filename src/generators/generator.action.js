const path = require('path')
const getDirectoryNames = require('../utils/getDirectoryNames')
const { RESOURCE_TYPE } = require('../constants/type.resource')
// Constants
let MODELS = []

try {
  MODELS = getDirectoryNames(path.join(__dirname, '../../../src/models'))
} catch (err) {
  console.log('Since no Models have been create, you can not create a Remote Procedural Call (Action)')
}

module.exports = {
  description: 'Creates a Remote Procedure Call (Action) Controller Methods and Sub-Router for API Endpoints',
  prompts: [
    {
      type: 'list',
      name: 'model',
      message: 'Select the model you would like to add an Action: ',
      choices: MODELS,
    },
    {
      type: 'list',
      name: 'type',
      message: 'Select the whether it is an Action on the Collection or an individual Resource: ',
      choices: Object.keys(RESOURCE_TYPE),
    },
    {
      type: 'input',
      name: 'actionName',
      message: 'Name the action: ',
    },
  ],
  actions: [],
}
