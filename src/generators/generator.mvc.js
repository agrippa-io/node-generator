const isEmpty = require('lodash/isEmpty')
const { promptRouteMethods } = require('../prompts/promptRouteMethods')

const { PATH_TEMPLATES } = require('../constants/path.templates')
const { PATH_SRC } = require('../constants/path.src')
const { RESOURCE_TYPE } = require('../constants/type.resource')
const { SELECTION_METHOD } = require('../constants/selection.method')
const { METHOD_BY_INDEX } = require('../constants/selection.methodByIndex')

const ControllerActions = require('../plopActions/controller.plopActions')
const ModelActions = require('../plopActions/model.plopActions')
const RouterActions = require('../plopActions/router.plopActions')
const MongooseUseCase = require('../plopActions/usecase.mongoose.plopActions')

module.exports = {
  description:
    'Creates a fully functional REST API Endpoint, including the Mongoose Model, Express Router and Controller',
  prompts: [
    {
      type: 'input',
      name: 'model',
      message: 'Enter model name (singular form, Pascal Case): ',
    },
    promptRouteMethods,
    {
      type: 'list',
      name: 'testConfiguration',
      message: 'Select Test Configuration:',
      default: 0,
      choices: ['Exclude Tests', 'Include Tests'],
    },
  ],
  actions,
}

function actions(data) {
  const { selectedMethods, testConfiguration } = data

  const includeTests = testConfiguration === 'Include Tests'

  const methodMap = createMethodNamesFromSelection(selectedMethods)

  const requiredActions = [...ModelActions.addFiles(PATH_SRC, PATH_TEMPLATES, includeTests)]

  if (isEmpty(methodMap)) {
    return requiredActions
  }

  return [
    ...requiredActions,
    ...MongooseUseCase.addMongooseCrudOperations(PATH_SRC, PATH_TEMPLATES, methodMap, includeTests),
    ...ControllerActions.addFiles(PATH_SRC, PATH_TEMPLATES, methodMap, includeTests),
    ...RouterActions.addFiles(PATH_SRC, PATH_TEMPLATES, includeTests),
  ]
}

function createMethodNamesFromSelection(selectedMethods) {
  return selectedMethods.reduce((methodMap, selection, index) => {
    if (!selection) {
      return methodMap
    }

    const method = METHOD_BY_INDEX[index]

    switch (selection) {
      case SELECTION_METHOD.LIST_AND_RESOURCE:
        methodMap[method] = [RESOURCE_TYPE.LIST, RESOURCE_TYPE.RESOURCE]
        break
      case SELECTION_METHOD.LIST:
        methodMap[method] = [RESOURCE_TYPE.LIST]
        break
      case SELECTION_METHOD.RESOURCE:
        methodMap[method] = [RESOURCE_TYPE.RESOURCE]
        break
      default:
        methodMap[method] = []
    }

    return methodMap
  }, {})
}
