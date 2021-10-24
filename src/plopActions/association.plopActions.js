const ASSOCIATION_ACTION = ['Read']
const MODEL_VIRTUAL_TYPES = ['get']

function addFiles(destPath, templatePath, excludeTests = false) {
  const requiredFiles = [
    addAssociationsIndexFile(destPath, templatePath),
    ...ASSOCIATION_ACTION.map((file) => addControllerFile(destPath, templatePath, file)),
    ...ASSOCIATION_ACTION.map((file) => addModelUseCaseFile(destPath, templatePath, file)),
    ...MODEL_VIRTUAL_TYPES.map((virtualType) => addModelVirtualFile(destPath, templatePath, virtualType)),
    addRouterFile(destPath, templatePath),
  ]

  if (excludeTests) {
    return requiredFiles
  }

  return [
    ...requiredFiles,
    ...ASSOCIATION_ACTION.map((file) => addControllerTest(destPath, templatePath, file)),
    ...ASSOCIATION_ACTION.map((file) => addModelUseCaseTestFile(destPath, templatePath, file)),
    ...MODEL_VIRTUAL_TYPES.map((virtualType) => addModelVirtualTestFile(destPath, templatePath, virtualType)),
    addRouterTest(destPath, templatePath),
  ]
}

function addAssociationsIndexFile(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/controllers/{{ pascalCase model }}/associations/index.ts`,
    templateFile: `${templatePath}/controller/association/index.hbs`,
    skipIfExists: true,
  }
}

function addControllerFile(destPath, templatePath, file) {
  return {
    type: 'add',
    path: `${destPath}/controllers/{{ pascalCase model }}/associations/{{ pascalCase model}}.{{ pascalCase associationName }}.${file}.ts`,
    templateFile: `${templatePath}/controller/association/association.${file}.hbs`,
    skipIfExists: true,
  }
}

function addControllerTest(destPath, templatePath, file) {
  return {
    type: 'add',
    path: `${destPath}/tests/controllers/{{ pascalCase model }}/association/{{ pascalCase model }}.{{ pascalCase associationName }}.${file}.test.ts`,
    templateFile: `${templatePath}/controller/association/association.${file}.test.hbs`,
    skipIfExists: true,
  }
}

function addModelUseCaseFile(destPath, templatePath, file) {
  return {
    type: 'add',
    path: `${destPath}/usecases/{{ pascalCase model }}/Association{{ pascalCase associationName }}${file}.ts`,
    templateFile: `${templatePath}/usecases/association.${file}.hbs`,
    skipIfExists: true,
  }
}

function addModelUseCaseTestFile(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/tests/usecases/{{ pascalCase model }}/Association{{ pascalCase associationName }}Read.ts`,
    templateFile: `${templatePath}/usecases/association.Read.test.hbs`,
    skipIfExists: true,
  }
}

function addModelVirtualFile(destPath, templatePath, virtualType) {
  return {
    type: 'add',
    path: `${destPath}/models/{{ pascalCase model }}/virtuals/${virtualType}.{{ camelCase associationName }}.js`,
    templateFile: `${templatePath}/model/virtuals/${virtualType}.association.hbs`,
    skipIfExists: true,
  }
}

function addModelVirtualTestFile(destPath, templatePath, virtualType) {
  return {
    type: 'add',
    path: `${destPath}/tests/models/{{ pascalCase model }}/virtuals/${virtualType}.{{ camelCase associationName }}.test.js`,
    templateFile: `${templatePath}/model/virtuals/${virtualType}.association.test.hbs`,
    skipIfExists: true,
  }
}

function addRouterFile(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/routes/v3/{{ pascalCase model }}/association.router.ts`,
    templateFile: `${templatePath}/router/association.router.hbs`,
    skipIfExists: true,
  }
}

function addRouterTest(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/tests/routes/{{ pascalCase model }}/association.router.test.ts`,
    templateFile: `${templatePath}/router/association.router.test.hbs`,
    skipIfExists: true,
  }
}

module.exports = {
  addFiles,
  addAssociationsIndexFile,
  addControllerFile,
  addControllerTest,
  addModelUseCaseFile,
  addModelUseCaseTestFile,
  addModelVirtualFile,
  addModelVirtualTestFile,
  addRouterFile,
  addRouterTest,
}
