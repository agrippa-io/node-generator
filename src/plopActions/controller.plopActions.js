function addFiles(destPath, templatePath, methodMap, includeTests = false) {
  return [
    addConfigControllerIndex(destPath, templatePath),
    ...addConfigControllerMethods(destPath, templatePath, methodMap, includeTests),
  ]
}

function addConfigControllerIndex(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/controllers/{{ pascalCase model }}/index.ts`,
    templateFile: `${templatePath}/controller/controller.index.hbs`,
    skipIfExists: true,
  }
}

function addConfigControllerMethods(destPath, templatePath, methodMap, includedTests = false) {
  const addConfigs = []

  Object.keys(methodMap).forEach((method) => {
    const resourceTypes = methodMap[method] || []
    resourceTypes.forEach((resourceType) => {
      addConfigs.push(addConfigControllerMethod(destPath, templatePath, method, resourceType))
      includedTests && addConfigs.push(addConfigControllerMethodTest(destPath, templatePath, method, resourceType))
    })
  })
  return addConfigs
}

function addConfigControllerMethod(destPath, templatePath, method, resourceType) {
  return {
    type: 'add',
    path: `${destPath}/controllers/{{ pascalCase model }}/${method}.${resourceType}.ts`,
    templateFile: `${templatePath}/controller/${method}/${resourceType}.hbs`,
    skipIfExists: true,
  }
}

function addConfigControllerMethodTest(destPath, templatePath, method, resourceType) {
  return {
    type: 'add',
    path: `${destPath}/tests/controllers/{{ pascalCase model }}/${method}.${resourceType}.test.ts`,
    templateFile: `${templatePath}/controller/${method}/${resourceType}.test.hbs`,
    skipIfExists: true,
  }
}

module.exports = {
  addFiles,
  addConfigControllerIndex,
  addConfigControllerMethods,
  addConfigControllerMethod,
  addConfigControllerMethodTest,
}
