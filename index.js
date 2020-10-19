#!/usr/bin/env node

const fs = require("fs");
const readline = require("readline");
const { exec } = require("child_process");
const meow = require("meow");
const dateFns = require("date-fns");
const extractBuildGradle = require("./lib/extractBuildGradle");

const usage = `
  Usage
    $ projectfolder > rnasr //./gradlew bundleRelease

  Options
  --apk         -a      ./gradlew app:assembleRelease
  --overwrite,  -o      Eg: rnasr -o 'assembleRelease' for \`./gradlew assembleRelease\`
  --version,    -v      Output current version
  --help,       -h      Show this help
`;

const cli = meow(usage, {
  flags: {
    version: {
      type: "boolean",
      default: false,
      alias: "v"
    },
    overwrite: {
      type: "string",
      default: "",
      alias: "o"
    },
    apk: {
      type: "boolean",
      alias: "a"
    }
  }
});

const rl = readline.createInterface({
  input: fs.createReadStream("./android/app/build.gradle")
});

extractBuildGradle({
  rl,
  onSuccess: ({ appId, appVer, appBuild }) => {
    const _datetime = dateFns.format(new Date(), "yyyyMMdd-HHmm");

    if (cli.flags.apk) {
      console.log(
        `Building app-release-${appId}-${appVer}-b${appBuild}-${_datetime}.apk...`
      );
    } else {
      console.log(
        `Building app-release-${appId}-${appVer}-b${appBuild}-${_datetime}.aab...`
      );
    }
    let cmd = "cd android && ./gradlew bundleRelease";

    cmd = cli.flags.apk ? `cd android && ./gradlew app:assembleRelease` : cmd;

    cmd =
      cli.flags.overwrite !== "" ? `cd android && ${cli.flags.overwrite}` : cmd;

    console.log(cmd);

    exec(cmd, null, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      console.log(stdout);
      if (cli.flags.apk) {
        try {
          fs.renameSync(
            "./android/app/build/outputs/apk/release/app-release.apk",
            `./android/app/build/outputs/apk/release/app-release-${appId}-${appVer}-b${appBuild}-${_datetime}.apk`
          );
          exec("open ./android/app/build/outputs/apk/release");
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          fs.renameSync(
            "./android/app/build/outputs/bundle/release/app-release.aab",
            `./android/app/build/outputs/bundle/release/app-release-${appId}-${appVer}-b${appBuild}-${_datetime}.aab`
          );
          exec("open ./android/app/build/outputs/bundle/release");
        } catch (e) {
          console.log(e);
        }
      }
    });
  },
  onFail: () => {
    console.log("Failed");
    cli.showHelp();
  }
});
