# React native assembleRelease 

A helper for building `react-native` `apk` and rename the release accordingly.

### What it does
Adds the `applicationId` and `versionCode ` declared in `app/build.gradle` to the built `apk`.

### Features
- Does `./gradlew assembleRelease` in project folder.
- Rename packaged `apk` with `applicationId` and `versionName` suffix.
- Open finder to `apk` 

#### Example of `apk` filename
```bash
./android/app/build/outputs/apk/release/app-release-${appId}-${appVer}.apk
```

### Install globally
```bash
$ npm install -g rnasr
```
Or see [without install](#without-install)

### Usage
```bash
$ projectfolder > rnasr
```

### Without install
```bash
$ projectfolder > npx rnasr
```

