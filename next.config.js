const { withLayer0, withServiceWorker } = require('@layer0/next/config')

const webpack = require('webpack')
const withReactStorefront = require('react-storefront/plugins/withReactStorefront')

require('dotenv').config()

const _preLayer0Export = withReactStorefront({
  target: 'serverless',
  connector: 'altitude-commercetools-connector',
  webpack: config => {
    config.plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    )
    config.module.rules.push({
      test: /\.(ts)x?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    })
    return config
  }
})

module.exports = () => {
  return withLayer0(
    withServiceWorker({
      layer0SourceMaps: true,
      ..._preLayer0Export
    })
  )
}
