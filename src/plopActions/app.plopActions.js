function addFiles(destPath, templatePath, includeTests = false) {
  const requiredFiles = [
    addConfig(destPath, templatePath),
    addApp(destPath, templatePath),
    addServer(destPath, templatePath),
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

module.exports = {
  addFiles,
  addConfig,
  addApp,
  addServer,
}
