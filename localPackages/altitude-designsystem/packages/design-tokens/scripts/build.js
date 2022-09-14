const fs = require('fs')
const styleDictionaryPackage = require('style-dictionary')

const brand = process.env.BRAND || 'vallier'
const buildDirectoryPath = 'build/'
const sharedFilesOptions = {
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
      './src/tiers/core/**/*.json',
      `./src/tiers/component/${brand}/**/*.json`
    ],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: buildDirectoryPath,
        files: [{
          destination: 'css/component.scss',
          format: 'scss/variables',
          filter: {
            attributes: {
              category: 'component'
            }
          },
          ...sharedFilesOptions
        },
        {
          destination: 'css/core.scss',
          format: 'scss/variables',
          filter: {
            attributes: {
              category: 'core'
            }
          },
          ...sharedFilesOptions
        }]
      },
      js: {
        transformGroup: 'js',
        buildPath: buildDirectoryPath,
        files: [{
          destination: 'js/component.js',
          format: 'javascript/module',
          filter: {
            attributes: {
              category: 'component'
            }
          },
          ...sharedFilesOptions
        },
        {
          destination: 'js/core.js',
          format: 'javascript/module',
          filter: {
            attributes: {
              category: 'core'
            }
          },
          ...sharedFilesOptions
        }]
      }
    }
  }
}

cleanBuildFolder(buildDirectoryPath)

styleDictionaryPackage.extend(getStyleDictionaryConfig(brand)).buildAllPlatforms()
