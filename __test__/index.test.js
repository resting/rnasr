const fs = require('fs')
const readline = require('readline')
const extractBuildGradle = require('../lib/extractBuildGradle')


test('should get appId, appVer and build', () => {
  const rl = readline.createInterface({
    input: fs.createReadStream('./__test__/mock.build.gradle')
  })

  extractBuildGradle({
    rl,
    onSuccess: ({appId, appVer, appBuild}) => {
      expect(appId).toBe('com.example.app')
      expect(appVer).toBe('1.0.1')
      expect(appBuild).toBe('1')
    },
    onFail: () => {
    }
  })
})

test('should call onFail', () => {
  const rl = readline.createInterface({
    input: fs.createReadStream('./__test__/mock2.build.gradle')
  })
  extractBuildGradle({
    rl,
    onSuccess: () => {
    },
    onFail: () => {
      const testFail = jest.fn()
      testFail()
      expect(testFail).toHaveBeenCalled()
    }
  })
})


