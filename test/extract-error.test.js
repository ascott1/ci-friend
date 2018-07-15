const extractError = require('../lib/extract-error')

const log = `travis_time:end:0001aa3c:start=1531654964884041407,finish=1531654966791786483,duration=1907745076
[0Ktravis_fold:end:install.npm
[0Ktravis_time:start:302568a8
[0K$ npm test

> bot-test@1.0.0 test /home/travis/build/ascott1/bot-test
> echo "Error: no test specified" && exit 1

Error: no test specified
[37;40mnpm[0m [0m[31;40mERR![0m[35m[0m Test failed.  See above for more details.
[0m
travis_time:end:302568a8:start=1531654966796818286,finish=1531654967069417428,duration=272599142
[0K
[31;1mThe command "npm test" exited with 1.[0m

Done. Your build exited with 1.`

const expectedResult = `> bot-test@1.0.0 test /home/travis/build/ascott1/bot-test
> echo "Error: no test specified" && exit 1

Error: no test specified`

test('It returns the contents of the error', () => {
  expect(extractError(log)).toMatch(expectedResult)
})
