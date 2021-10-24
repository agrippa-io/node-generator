const inquirerTablePrompt = require('inquirer-table-prompt')
const getDirectoryNames = require('./src/utils/getDirectoryNames')

const ExpressREST = require('./src/generators/generator.mvc')
const Association = require('./src/generators/generator.association')
const RpcAction = require('./src/generators/generator.action')
const UsecaseModel = require('./src/generators/generator.usecase.model')
const UsecaseMongoose = require('./src/generators/generator.usecase.mongoose')

module.exports = (plop) => {
  // Add Plugins
  plop.setPrompt('table', inquirerTablePrompt)
  // GENERATORS
  plop.setGenerator('Express REST', ExpressREST)
  registerModelGenerators(plop)
}

function registerModelGenerators(plop) {
  try {
    const MODELS = getDirectoryNames(path.join(__dirname, '../../src/models'))

    if (MODELS.length) {
      plop.setGenerator('Association', Association)
      plop.setGenerator('Action', RpcAction)
      plop.setGenerator('UseCase - Model', UsecaseModel)
      plop.setGenerator('UseCase - Mongoose', UsecaseMongoose)
    }
  } catch (err) {
    console.log('Since no Models have been create, you can not create: ')
    console.log(' - Association')
    console.log(' - Remote Procedural Call (Action)')
  }
}
