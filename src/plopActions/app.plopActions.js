function addFiles(destPath, templatePath, includeTests = false) {
  const requiredFiles = [
    addConfig(destPath, templatePath),
    addApp(destPath, templatePath),
    addServer(destPath, templatePath),
    addTsConfig(destPath, templatePath),
    addDockerfile(destPath, templatePath),
    addNvmRC(destPath, templatePath),
  ]

  return requiredFiles
}

function addConfig(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/config/SystemConfig.ts`,
    templateFile: `${templatePath}/config/SystemConfig.hbs`,
    skipIfExists: true,
  }
}

function addApp(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/app.ts`,
    templateFile: `${templatePath}/app.hbs`,
    skipIfExists: true,
  }
}

function addServer(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/server.ts`,
    templateFile: `${templatePath}/server.hbs`,
    skipIfExists: true,
  }
}

function addTsConfig(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/tsconfig.json`,
    templateFile: `${templatePath}/tsconfig.json.hbs`,
    skipIfExists: true,
  }
}

function addDockerfile(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/Dockerfile`,
    templateFile: `${templatePath}/Dockerfile.hbs`,
    skipIfExists: true,
  }
}

function addNvmRC(destPath, templatePath) {
  return {
    type: 'add',
    path: `${destPath}/.nvmrc`,
    templateFile: `${templatePath}/nvmrc.hbs`,
    skipIfExists: true,
  }
}

module.exports = {
  addFiles,
  addConfig,
  addApp,
  addServer,
  addTsConfig,
  addDockerfile,
}
