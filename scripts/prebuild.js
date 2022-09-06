require('dotenv').config()

const npm = require('npm-commands')

;(() =>
  // Build the "altitude-designsystem" packages
  npm().cwd('localPackages/altitude-designsystem').run('packages:build')
)()
