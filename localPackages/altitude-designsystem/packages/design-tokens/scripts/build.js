const fs = require('fs')
const path = require('path')

const styleDictionaryPackage = require('style-dictionary')

require('dotenv').config()

const brand = process.env.BRAND
const buildDirectoryPath = path.resolve(__dirname, '../build')

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
      web: {
        transformGroup: 'js',
        buildPath: `${buildDirectoryPath}/web/`,
        files: [{
          destination: 'index.esm.js',
          format: 'javascript/es6',
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
