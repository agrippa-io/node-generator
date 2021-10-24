const isEmpty = require('lodash/isEmpty')

function addMongooseCrudOperations(destPath, templatePath, methodMap, includeTests = false) {
  const actions = []
  if (isEmpty(methodMap)) {
    return actions
  }

  Object.keys(methodMap).forEach((method) => {
    const resourceTypes = methodMap[method]

    resourceTypes.forEach((resourceType) => {
      actions.push(addMongooseOperation(destPath, templatePath, method, resourceType))
    })
  })

  return actions
}

function addMongooseOperation(destPath, templatePath, method, resourceType) {
  return {
    type: 'add',
    path: `${destPath}/usecases/{{pascalCase model}}/${method}.${resourceType}.mongoose.ts`,
    templateFile: `${templatePath}/usecases/${method}/${resourceType}.mongoose.hbs`,
    skipIfExists: true,
  }
}

module.exports = {
  addMongooseCrudOperations,
  addMongooseOperation,
}
