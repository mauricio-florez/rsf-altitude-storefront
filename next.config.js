require('dotenv').config()

const webpack = require('webpack')
const npm = require('npm-commands')
const { withLayer0, withServiceWorker } = require('@layer0/next/config')
const withReactStorefront = require('react-storefront/plugins/withReactStorefront')

const _preLayer0Export = withReactStorefront({
  target: 'serverless',
  connector: 'altitude-commercetools-connector',
  webpack: config => {
    config.plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    )
    return config
  }
})

// Build "altitude-designsystem" packages
npm().cwd('localPackages/altitude-designsystem/').run('packages:build')

module.exports = () => withLayer0(
    withServiceWorker({
      layer0SourceMaps: true,
      ..._preLayer0Export
    })
  )
