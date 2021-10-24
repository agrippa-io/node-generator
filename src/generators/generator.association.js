const path = require('path')
const getDirectoryNames = require('../utils/getDirectoryNames')
// Actions
const AssociationActions = require('../plopActions/association.plopActions')
// Constants
const { PATH_TEMPLATES } = require('../constants/path.templates')
const { PATH_SRC } = require('../constants/path.src')
const { RESOURCE_TYPE } = require('../constants/type.resource')
let MODELS = []

try {
  MODELS = getDirectoryNames(path.join(__dirname, '../../../src/models'))
} catch (err) {
  console.log('Since no Models have been create, you can not create an Association')
}

module.exports = {
  description: 'Creates a Association Router, Controller, Usecases, and Tests for creating REST Associations',
  prompts: [
    {
      type: 'list',
      name: 'model',
      message: 'Select the model you would like to add an Association: ',
      choices: MODELS,
    },
    // {
    //   type: "list",
    //   name: "associationType",
    //   message: "Select the Association Type: ",
    //   choices: TYPE_ASSOCIATION
    // },
    {
      type: 'input',
      name: 'associationName',
      message: 'Name the association (PascalCase): ',
    },
    {
      type: 'list',
      name: 'associationModel',
      message: 'Select the Model Type for the Association: ',
      choices: MODELS,
    },
  ],
  actions: AssociationActions.addFiles(PATH_SRC, PATH_TEMPLATES),
}
