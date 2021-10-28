const { FILE_MODEL_IMPLEMENTATION } = require('../constants/file.model.implementation.mongoose')
const { FILE_MODEL_TEST } = require('../constants/file.model.test.mongoose')
const { FILE_MODEL_INTERFACE } = require('../constants/file.model.interface.mongoose')

function addFiles(destPath, templatePath, includeTests = false) {
  const requiredFiles = [
    addModelConstants(destPath, templatePath),
    ...FILE_MODEL_IMPLEMENTATION.map((file) => addModelFile(destPath, templatePath, file)),
    ...FILE_MODEL_INTERFACE.map((file) => addModelInterfaceFile(destPath, templatePath, file)),
  ]

  return includeTests
    ? [...requiredFiles, ...FILE_MODEL_TEST.map((file) => addModelTest(destPath, templatePath, file))]
    : requiredFiles
}

function addModelConstants(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/constants/models.ts`,
    templateFile: `${templatePath}/constants/models.hbs`,
    skipIfExists: true,
  }
}

function addModelFile(destPath, templatePath, file) {
  return {
    type: 'add',
    path: `${destPath}/models/{{ pascalCase model }}/${file}.ts`,
    templateFile: `${templatePath}/model/${file}.hbs`,
    skipIfExists: true,
  }
}

function addModelInterfaceFile(destPath, templatePath, file) {
  return {
    type: 'add',
    path: `${destPath}/models/{{ pascalCase model }}/interfaces/${file}.ts`,
    templateFile: `${templatePath}/model/interfaces/${file}.hbs`,
    skipIfExists: true,
  }
}

function addModelTest(destPath, templatePath, file) {
  return {
    type: 'add',
    path: `${destPath}/tests/models/{{ pascalCase model }}/${file}.test.ts`,
    templateFile: `${templatePath}/model/${file}.test.hbs`,
    skipIfExists: true,
  }
}

module.exports = {
  addFiles,
  addModelFile,
  addModelInterfaceFile,
  addModelTest,
}
