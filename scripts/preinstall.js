require('dotenv').config()

const npm = require('npm-commands')

;(() =>
  // Install and bootstrap the "altitude-designsystem" dependencies and packages
  npm().cwd('localPackages/altitude-designsystem').run('packages:install')
)()
