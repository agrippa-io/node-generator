const { readdirSync } = require('fs')

const getDirectoryNames = (source) => {
  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
}

module.exports = getDirectoryNames
