function addFiles(destPath, templatePath, includeTests = false) {
  const requiredActions = [
    addRootRouter(destPath, templatePath),
    addVersionRouter(destPath, templatePath),
    addConfigRouterIndex(destPath, templatePath),
  ]

  return includeTests ? [...requiredActions, addConfigRouterTest(destPath, templatePath)] : requiredActions
}

function addRootRouter(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/routes/index.ts`,
    templateFile: `${templatePath}/router/root.router.hbs`,
    skipIfExists: true,
  }
}

function addVersionRouter(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/routes/{{ version }}/index.ts`,
    templateFile: `${templatePath}/router/version.router.hbs`,
    skipIfExists: true,
  }
}

function addConfigRouterIndex(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/routes/{{ version }}/{{ pascalCase model }}/index.ts`,
    templateFile: `${templatePath}/router/model.router.hbs`,
    skipIfExists: true,
  }
}

function addConfigRouterTest(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/tests/routes/{{ pascalCase model }}/{{ pascalCase model }}.router.test.ts`,
    templateFile: `${templatePath}/router/router.test.hbs`,
    skipIfExists: true,
  }
}

module.exports = {
  addFiles,
  addRootRouter,
  addVersionRouter,
  addConfigRouterIndex,
  addConfigRouterTest,
}
