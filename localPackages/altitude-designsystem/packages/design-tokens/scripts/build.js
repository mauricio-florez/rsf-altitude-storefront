const fs = require('fs')
const styleDictionaryPackage = require('style-dictionary')

const brand = process.env.BRAND
const buildDirectoryPath = 'build/'

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
      `./src/tiers/brand/${brand}/**/*.json`,
      './src/tiers/component/*.json'
    ],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: buildDirectoryPath,
        files: [{
          destination: 'index.scss',
          format: 'scss/variables',
          options: {
            showFileHeader: false
          }
        }]
      },
      js: {
        transformGroup: 'js',
        buildPath: buildDirectoryPath,
        files: [{
          destination: 'index.js',
          format: 'javascript/module',
          options: {
            showFileHeader: false
          }
        }]
      }
    }
  }
}

cleanBuildFolder(buildDirectoryPath)

styleDictionaryPackage.extend(getStyleDictionaryConfig(brand)).buildAllPlatforms()
