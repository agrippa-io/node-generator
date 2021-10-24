const path = require('path')
const getDirectoryNames = require('../utils/getDirectoryNames')
// Constants
const { PATH_TEMPLATES } = require('../constants/path.templates')
const { PATH_SRC } = require('../constants/path.src')
let MODELS = []

try {
  MODELS = getDirectoryNames(path.join(__dirname, '../../../src/models'))
} catch (err) {
  console.log('Since no Models have been create, you can not create a UseCase')
}

module.exports = {
  description: 'Creates a Model UseCase',
  prompts: [
    {
      type: 'list',
      name: 'model',
      message: 'Select the model you would like to add a UseCase: ',
      choices: MODELS,
    },
    {
      type: 'input',
      name: 'name',
      message: 'Name the UseCase: ',
    },
  ],
  actions: [addUsecaseImplementation()],
}

function addUsecaseImplementation() {
  return {
    type: 'add',
    path: `${PATH_SRC}/usecases/{{pascalCase model}}/{{pascalCase name}}.ts`,
    templateFile: `${PATH_TEMPLATES}/usecases/model.implementation.hbs`,
  }
}
