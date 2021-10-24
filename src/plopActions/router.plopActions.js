const VERSION = 'v1'

function addFiles(destPath, templatePath, includeTests = false) {
  const requiredActions = [addConfigRouterIndex(destPath, templatePath)]

  return includeTests ? [...requiredActions, addConfigRouterTest(destPath, templatePath)] : requiredActions
}

function addConfigRouterIndex(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/routes/${VERSION}/{{ pascalCase model }}/index.ts`,
    templateFile: `${templatePath}/router/index.hbs`,
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
  addConfigRouterIndex,
  addConfigRouterTest,
}
