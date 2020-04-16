#!/usr/bin/env node

const fs = require('fs')
const readline = require('readline')
const {exec} = require('child_process')
const meow = require('meow')
const extractBuildGradle = require('./lib/extractBuildGradle')

const usage = `
  Usage
    $ projectfolder > rnasr

  Options
  --version,    -v      Output current version
  --overwrite,  -o      Eg: rnasr -o './gradlew assembleRelease'
`
const cli = meow(usage, {
  flags: {
    version: {
      type: 'boolean',
      default: false,
      alias: 'v'
    },
    overwrite: {
      type: 'string',
      default: '',
      alias: 'o'
    }
  }
})

const rl = readline.createInterface({
  input: fs.createReadStream('./android/app/build.gradle')
})

extractBuildGradle({
  rl,
  onSuccess: ({appId, appVer, appBuild}) => {
    console.log(`Building app-release-${appId}-${appVer}-b${appBuild}.apk...`)
    let cmd = 'cd android && ./gradlew assembleRelease && open app/build/outputs/apk/release'

    cmd = cli.flags.overwrite !== '' ? `cd android && ${cli.flags.overwrite} && open app/build/outputs/apk/release` : cmd
    console.log(cmd)
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return
      }
      if (stderr) {
        console.log(stderr)
        return
      }
      console.log(stdout)
      fs.renameSync('./android/app/build/outputs/apk/release/app-release.apk', `./android/app/build/outputs/apk/release/app-release-${appId}-${appVer}-b${appBuild}.apk`)
      exec('open ./android/app/build/outputs/apk/release')
    })
  },
  onFail: () => {
    console.log('Failed')
    cli.showHelp()
  }
})


