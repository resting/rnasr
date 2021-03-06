# React native assembleRelease 

A helper for building `react-native` `aab`, `apk` and rename the release accordingly.

### What it does
Adds the `applicationId`, `versionName` and `versionCode ` declared in `app/build.gradle` to the built `apk`.
With version 1.2.0, 
- datetime is also added to filename.
- `bundleRelease` is now the default. `app:assembleRelease` is now under `-o` flag.


### Features
- Does `./gradlew assembleRelease` in project folder.
- Rename packaged `apk` with `applicationId`, `versionName` and `versionCode` suffix.
- Open finder to `apk` 

#### Example of `apk` filename
```bash
./android/app/build/outputs/apk/release/app-release-${appId}-${appVer}-b${appBuild}-${_datetime}.apk
```

### Install globally
```bash
$ npm install -g @resting/rnasr
```
Or see [without install](#without-install)

### Usage
```bash
$ projectfolder > rnasr
```

### Without install
```bash
$ projectfolder > npx @resting/rnasr
```

