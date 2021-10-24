const path = require('path')
const getDirectoryNames = require('../utils/getDirectoryNames')
const MongooseActions = require('../plopActions/usecase.mongoose.plopActions')
// Constants
const { PATH_TEMPLATES } = require('../constants/path.templates')
const { PATH_SRC } = require('../constants/path.src')
let MODELS = []

try {
  MODELS = getDirectoryNames(path.join(__dirname, '../../../models'))
} catch (err) {
  console.log('Since no Models have been create, you can not create a Mongoose UseCase')
}

module.exports = {
  description: 'Creates a Mongoose CRUD Usecases',
  prompts: [
    {
      type: 'list',
      name: 'model',
      message: 'Select Model: ',
      choices: MODELS,
    },
  ],
  actions: MongooseActions.addMongooseCrudOperations(PATH_SRC, PATH_TEMPLATES),
}
