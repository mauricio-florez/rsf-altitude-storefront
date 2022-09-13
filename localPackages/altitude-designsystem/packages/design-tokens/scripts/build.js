const fs = require('fs')
const styleDictionaryPackage = require('style-dictionary')

const brand = process.env.BRAND || 'vallier'
const buildDirectoryPath = 'build/'
const sharedFilesOptions = {
  filter: { attributes: { category: "component" } },
  options: { showFileHeader: false }
}

const cleanBuildFolder = (path) => {
  if (fs.existsSync(path)) {
    fs.rmSync(path, { recursive: true }, (error) => {
      if (error) throw new Error(error)
    })
  }
}

const getStyleDictionaryConfig = (brand) => {
  return {
    source: [
      './src/tiers/core/*.json',
      `./src/tiers/component/${brand}/**/*.json`
    ],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: buildDirectoryPath,
        files: [{
          destination: 'index.scss',
          format: 'scss/variables',
          ...sharedFilesOptions
        }]
      },
      js: {
        transformGroup: 'js',
        buildPath: buildDirectoryPath,
        files: [{
          destination: 'index.js',
          format: 'javascript/module',
          ...sharedFilesOptions
        }]
      }
    }
  }
}

cleanBuildFolder(buildDirectoryPath)

styleDictionaryPackage.extend(getStyleDictionaryConfig(brand)).buildAllPlatforms()
